// Optional visual check. Needs Node + Playwright (with a Chromium build).
// Usage: node check.mjs book.html outdir [--three /path/to/three.module.js] [--width 1280 --height 780]
// Saves cover.png, scene-N.png (resting) and scene-N-act.png (mid action), then prints layout warnings.
// --three lets you serve three.js from disk when the CDN is not reachable (npm i three@0.160.0).
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const [file, outDir = 'shots'] = args.filter((a, i) => !a.startsWith('--') && !(i > 0 && args[i - 1].startsWith('--')));
if (!file) { console.error('usage: node check.mjs book.html outdir [--three three.module.js]'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });
const three = opt('--three');
const width = +opt('--width', 1280), height = +opt('--height', 780);

const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const url = pathToFileURL(path.resolve(file)).href;
async function page(hash) {
  const p = await browser.newPage({ viewport: { width, height } });
  p.on('pageerror', e => console.log('PAGE ERROR', e.message));
  if (three) await p.route('**/three.module.js', r => r.fulfill({ path: three, contentType: 'application/javascript' }));
  await p.goto(url + '#shot' + (hash ? '&' + hash : ''));
  await p.waitForFunction(() => window.__BOOK_REPORT && (window.__BOOK_REPORT.ready || window.__BOOK_REPORT.error), null, { timeout: 60000 });
  return p;
}
const p0 = await page('cover');
await p0.waitForTimeout(1500);
await p0.screenshot({ path: path.join(outDir, 'cover.png') });
const report = await p0.evaluate(() => window.__BOOK_REPORT);
await p0.close();
if (report.error) { console.log('BOOT ERROR\n' + report.error); await browser.close(); process.exit(2); }
for (let i = 1; i <= report.scenes; i++) {
  const p = await page(`scene-${i}`);
  await p.waitForTimeout(2500);
  await p.screenshot({ path: path.join(outDir, `scene-${i}.png`) });
  await p.evaluate(n => { location.hash = `shot&scene-${n}-act`; }, i);
  await p.waitForTimeout(2600);
  await p.screenshot({ path: path.join(outDir, `scene-${i}-act.png`) });
  await p.close();
}
await browser.close();
console.log(`screenshots saved to ${outDir}`);
console.log(report.warnings.length ? 'warnings:\n- ' + report.warnings.join('\n- ') : 'no layout warnings');
