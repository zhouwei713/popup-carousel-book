// 灰姑娘 · six scenes · code-drawn mode

/* ---------- custom art ---------- */
ART.lady = (o = {}) => ({ dw: 110, dh: 180, draw(c) {
  const skin = o.skin || '#f6d2b4', hair = o.hair || '#8a5a3a', dress = o.dress || '#9c9185', top = o.top || shade(dress, -.08);
  const a = o.arm === 'wave' ? -2.0 : o.arm === 'wand' ? -2.3 : o.arm === 'broom' ? -.6 : .15;
  const sx = 62, sy = 76, hx = sx - Math.sin(a) * 36, hy = sy + Math.cos(a) * 36;
  if (o.hood) P(c, o.hood, c => { circ(c, 53, 42, 29); poly(c, [[28, 58], [78, 58], [80, 96], [30, 96]]); });
  if (o.hairStyle === 'long') P(c, hair, c => rr(c, 31, 30, 30, 60, 14));
  const g = o.gown;
  P(c, dress, c => { c.moveTo(40, 90); c.quadraticCurveTo(g ? 8 : 22, 128, g ? 2 : 18, 176); c.lineTo(g ? 108 : 92, 176); c.quadraticCurveTo(g ? 100 : 86, 128, 70, 90); c.closePath(); }, { blur: 4 });
  if (g) {
    P(c, shade(dress, .2), c => { c.moveTo(42, 92); c.quadraticCurveTo(22, 120, 16, 150); c.quadraticCurveTo(55, 162, 94, 150); c.quadraticCurveTo(88, 120, 68, 92); c.closePath(); }, { blur: 2 });
    for (let x = 6; x <= 104; x += 12) F(c, shade(dress, .3), c => circ(c, x, 175, 6));
    [[30, 132], [58, 140], [80, 128], [46, 160], [74, 162], [52, 118]].forEach(([x, y]) => F(c, '#ffffff', c => star(c, x, y, 3.2, 1.2, 4)));
  }
  if (o.apron) { P(c, '#efe6d6', c => rr(c, 54, 98, 30, 58, 6), { blur: 2 }); F(c, shade(dress, -.18), c => { rr(c, 28, 140, 12, 10, 2); rr(c, 72, 162, 10, 8, 2); }); }
  P(c, top, c => rr(c, 40, 70, 30, 32, 10));
  if (g) F(c, shade(dress, .35), c => rr(c, 40, 70, 30, 7, 4));
  if (o.broom) { L(c, '#8a5a3a', 3.5, c => { c.moveTo(94, 62); c.lineTo(74, 166); }); P(c, '#d9b066', c => poly(c, [[66, 158], [82, 160], [94, 178], [50, 178]])); }
  P(c, skin, c => rr(c, 50, 56, 10, 16, 4), { edge: false });
  P(c, skin, c => circ(c, 55, 42, 22));
  P(c, hair, c => { c.moveTo(33, 46); c.bezierCurveTo(30, 14, 78, 10, 78, 38); c.quadraticCurveTo(62, 28, 50, 32); c.quadraticCurveTo(44, 42, 33, 46); c.closePath(); }, { blur: 2 });
  if (o.hairStyle === 'bun') P(c, hair, c => circ(c, 40, 18, 10));
  if (o.hairStyle === 'updo') P(c, hair, c => { circ(c, 46, 12, 13); circ(c, 58, 5, 9); });
  if (o.hood) L(c, shade(o.hood, .25), 5, c => c.arc(54, 42, 25, 1.02 * Math.PI, 1.98 * Math.PI));
  if (o.tiara) { P(c, '#f2c94e', c => poly(c, [[44, 24], [46, 14], [50, 20], [55, 9], [60, 20], [64, 14], [66, 24]]), { edge: '#fff4c8' }); F(c, '#e86a9a', c => circ(c, 55, 16, 2)); }
  if (o.mood === 'shock') eyeDot(c, 66, 41, 3, 'shock'); else eyeDot(c, 66, 41, 3, o.mood === 'happy' ? 'happy' : null);
  blush(c, 64, 51, 4);
  if (o.lips) F(c, o.lips, c => ell(c, 71, 54, 3, 1.6));
  else if (o.mood === 'sad') L(c, '#8a4a3a', 1.4, c => c.arc(70, 58, 4, 1.2 * Math.PI, 1.8 * Math.PI));
  else if (o.mood === 'shock') F(c, '#8a4a3a', c => ell(c, 70, 55, 2.4, 3.2));
  else L(c, '#8a4a3a', 1.4, c => c.arc(70, 51, 4, .2 * Math.PI, .75 * Math.PI));
  if (o.mood === 'snooty') L(c, '#5a3a2a', 1.2, c => { c.moveTo(60, 34); c.lineTo(70, 32); });
  P(c, shade(top, -.1), c => { c.translate(sx, sy); c.rotate(a); rr(c, -5, 0, 10, 36, 5); }, { blur: 2 });
  if (o.arm === 'wand') { L(c, '#d9b066', 2.5, c => { c.moveTo(hx, hy); c.lineTo(hx + 10, hy - 28); }); P(c, '#ffe27a', c => star(c, hx + 11, hy - 31, 8, 3.4, 5), { sc: 'rgba(255,230,120,.9)', blur: 8, oy: 0 }); }
  P(c, skin, c => circ(c, hx, hy, 5.5));
} });

ART.prince = (o = {}) => ({ dw: 100, dh: 180, draw(c) {
  P(c, '#b8433a', c => { c.moveTo(36, 76); c.quadraticCurveTo(16, 130, 12, 172); c.lineTo(48, 172); c.lineTo(54, 80); c.closePath(); });
  ART.person({ shirt: '#4a6fb5', pants: '#f2ece0', hair: '#5a3a22', ...o }).draw(c);
  L(c, '#f2c94e', 4, c => { c.moveTo(38, 80); c.lineTo(68, 120); });
  P(c, '#f2c94e', c => poly(c, [[38, 26], [40, 11], [46, 19], [52, 7], [58, 19], [64, 11], [66, 26]]), { edge: '#fff4c8' });
  F(c, '#e8604c', c => circ(c, 52, 16, 2.2));
} });

ART.pumpkin = () => ({ dw: 120, dh: 92, draw(c) {
  L(c, '#5fae4f', 2, c => { c.moveTo(66, 20); c.bezierCurveTo(82, 4, 100, 18, 90, 28); });
  P(c, '#e2701c', c => { ell(c, 30, 58, 26, 30); ell(c, 90, 58, 26, 30); });
  P(c, '#ef8a2c', c => { ell(c, 46, 58, 24, 32); ell(c, 74, 58, 24, 32); });
  P(c, '#f59c3e', c => ell(c, 60, 58, 20, 33));
  P(c, '#6b8f3a', c => rr(c, 56, 14, 8, 14, 3));
  P(c, '#5fae4f', c => ell(c, 44, 22, 10, 5, -.4));
} });

ART.coach = () => ({ dw: 200, dh: 172, draw(c) {
  const wheel = (x, y, r) => { P(c, '#f2c94e', c => circ(c, x, y, r)); F(c, '#fff4cc', c => circ(c, x, y, r * .72));
    L(c, '#d9a83a', 2, c => { for (let i = 0; i < 8; i++) { const q = i * Math.PI / 4; c.moveTo(x, y); c.lineTo(x + Math.cos(q) * r * .78, y + Math.sin(q) * r * .78); } }); F(c, '#d9a83a', c => circ(c, x, y, r * .18)); };
  L(c, '#f2c94e', 3, c => { c.moveTo(100, 34); c.bezierCurveTo(118, 18, 132, 30, 122, 40); c.moveTo(100, 34); c.bezierCurveTo(82, 18, 68, 30, 78, 40); });
  P(c, '#ea7e24', c => ell(c, 100, 90, 64, 56), { blur: 5 });
  P(c, '#f39338', c => ell(c, 100, 90, 44, 58));
  P(c, '#f8ad55', c => ell(c, 100, 90, 22, 58));
  P(c, '#fff2c6', c => { c.moveTo(80, 100); c.lineTo(80, 78); c.arc(100, 78, 20, Math.PI, 0); c.lineTo(120, 100); c.closePath(); }, { edge: '#f2c94e', lw: 3 });
  F(c, '#f3a6c4', c => { c.moveTo(80, 78); c.quadraticCurveTo(88, 90, 82, 100); c.lineTo(80, 100); c.closePath(); c.moveTo(120, 78); c.quadraticCurveTo(112, 90, 118, 100); c.lineTo(120, 100); c.closePath(); });
  P(c, '#f2c94e', c => rr(c, 34, 128, 132, 10, 5));
  P(c, '#f2c94e', c => star(c, 100, 30, 9, 3.8, 5), { sc: 'rgba(255,230,120,.8)', blur: 6, oy: 0 });
  wheel(50, 146, 24); wheel(150, 146, 24);
} });

ART.castle = (o = {}) => ({ dw: 200, dh: 220, draw(c) {
  const wall = o.wall || '#f4e6f0', roof = o.roof || '#7f8fd9', win = '#ffe59a';
  const tower = (x, w, top, rf) => {
    L(c, '#7a5a40', 1.5, c => { c.moveTo(x + w / 2, top - 44); c.lineTo(x + w / 2, top - 62); });
    P(c, '#e8604c', c => poly(c, [[x + w / 2, top - 62], [x + w / 2 + 14, top - 57], [x + w / 2, top - 52]]), { blur: 1 });
    P(c, wall, c => rr(c, x, top, w, 220 - top, 3), { blur: 4 });
    P(c, rf, c => poly(c, [[x - 6, top + 2], [x + w / 2, top - 46], [x + w + 6, top + 2]]), { blur: 3 });
    P(c, win, c => { c.moveTo(x + w / 2 - 6, top + 34); c.lineTo(x + w / 2 - 6, top + 22); c.arc(x + w / 2, top + 22, 6, Math.PI, 0); c.lineTo(x + w / 2 + 6, top + 34); c.closePath(); }, { blur: 1 });
  };
  tower(8, 40, 84, roof); tower(152, 40, 84, roof); tower(80, 40, 34, shade(roof, -.1));
  P(c, wall, c => rr(c, 30, 112, 140, 108, 3), { blur: 4 });
  for (let i = 0; i < 10; i++) F(c, wall, c => c.rect(31 + i * 14.4, 104, 8, 10));
  [[50, 140], [150, 140], [70, 176], [130, 176]].forEach(([x, y]) => P(c, win, c => { c.moveTo(x - 7, y + 14); c.lineTo(x - 7, y); c.arc(x, y, 7, Math.PI, 0); c.lineTo(x + 7, y + 14); c.closePath(); }, { blur: 1 }));
  P(c, '#9a6a4a', c => { c.moveTo(82, 220); c.lineTo(82, 184); c.arc(100, 184, 18, Math.PI, 0); c.lineTo(118, 220); c.closePath(); });
} });

ART.clocktower = () => ({ dw: 110, dh: 220, draw(c) {
  P(c, '#d9c4a8', c => rr(c, 20, 60, 70, 160, 4), { blur: 4 });
  L(c, 'rgba(160,130,100,.35)', 1, c => { for (let y = 130; y < 220; y += 12) { c.moveTo(20, y); c.lineTo(90, y); } });
  P(c, '#8f6aa8', c => poly(c, [[12, 64], [55, 8], [98, 64]]), { blur: 3 });
  P(c, '#f2c94e', c => circ(c, 55, 46, 6));
  P(c, '#fff8ea', c => circ(c, 55, 100, 26), { edge: '#c9a24e', lw: 3 });
  L(c, '#9a8a70', 1.5, c => { for (let i = 0; i < 12; i++) { const q = i * Math.PI / 6; c.moveTo(55 + Math.cos(q) * 20, 100 + Math.sin(q) * 20); c.lineTo(55 + Math.cos(q) * 23, 100 + Math.sin(q) * 23); } });
  L(c, INK, 3, c => { c.moveTo(55, 100); c.lineTo(55, 84); });
  L(c, INK, 2, c => { c.moveTo(55, 100); c.lineTo(56, 79); });
  F(c, '#c9a24e', c => circ(c, 55, 100, 3));
  P(c, '#ffe59a', c => { c.moveTo(47, 160); c.lineTo(47, 148); c.arc(55, 148, 8, Math.PI, 0); c.lineTo(63, 160); c.closePath(); }, { blur: 1 });
  P(c, '#8a5a3c', c => { c.moveTo(42, 220); c.lineTo(42, 190); c.arc(55, 190, 13, Math.PI, 0); c.lineTo(68, 220); c.closePath(); });
} });

ART.slipper = () => ({ dw: 70, dh: 40, draw(c) {
  P(c, 'rgba(196,232,250,.95)', c => { c.moveTo(6, 34); c.quadraticCurveTo(8, 18, 30, 20); c.quadraticCurveTo(46, 22, 52, 10); c.lineTo(62, 8); c.lineTo(62, 28); c.lineTo(58, 28); c.lineTo(58, 36); c.lineTo(10, 38); c.closePath(); }, { edge: '#ffffff', lw: 1.6, sc: 'rgba(80,140,200,.45)' });
  L(c, 'rgba(255,255,255,.9)', 1.6, c => { c.moveTo(16, 28); c.quadraticCurveTo(28, 24, 40, 26); });
  F(c, '#ffffff', c => star(c, 50, 18, 5, 1.6, 4));
} });

ART.fireplace = () => ({ dw: 160, dh: 140, draw(c) {
  P(c, '#b5654a', c => rr(c, 10, 20, 140, 120, 6), { blur: 4 });
  L(c, 'rgba(255,225,205,.35)', 1.2, c => { for (let y = 34; y < 140; y += 12) { c.moveTo(10, y); c.lineTo(150, y); } for (let y = 28, k = 0; y < 140; y += 12, k++) for (let x = 20 + (k % 2) * 12; x < 150; x += 24) { c.moveTo(x, y); c.lineTo(x, y + 6); } });
  P(c, '#e9d3b4', c => rr(c, 2, 12, 156, 16, 4));
  F(c, '#3a2420', c => { c.moveTo(40, 140); c.lineTo(40, 84); c.arc(80, 84, 40, Math.PI, 0); c.lineTo(120, 140); c.closePath(); });
  P(c, '#7a4e32', c => { rr(c, 50, 124, 60, 10, 4); rr(c, 56, 116, 48, 9, 4); });
  P(c, '#ff8f3a', c => { c.moveTo(56, 120); c.quadraticCurveTo(50, 96, 64, 84); c.quadraticCurveTo(64, 100, 72, 96); c.quadraticCurveTo(74, 76, 84, 66); c.quadraticCurveTo(88, 88, 96, 92); c.quadraticCurveTo(108, 100, 104, 120); c.closePath(); }, { sc: 'rgba(255,140,40,.8)', blur: 10, oy: 0, edge: false });
  F(c, '#ffd25a', c => { c.moveTo(66, 120); c.quadraticCurveTo(62, 104, 72, 96); c.quadraticCurveTo(76, 104, 82, 90); c.quadraticCurveTo(86, 104, 94, 108); c.quadraticCurveTo(98, 116, 94, 120); c.closePath(); });
  P(c, '#c9a24e', c => { rr(c, 22, 2, 8, 10, 2); rr(c, 130, 2, 8, 10, 2); });
  F(c, '#fff3c4', c => { ell(c, 26, 0, 2, 4); ell(c, 134, 0, 2, 4); });
} });

ART.stairs = () => ({ dw: 200, dh: 80, draw(c) {
  for (let i = 0; i < 4; i++) P(c, i % 2 ? '#efe6f6' : '#e2d6ee', c => rr(c, 6 + i * 14, 80 - (i + 1) * 19, 188 - i * 28, 19, 3), { blur: 3, oy: 1 });
} });

ART.tear = () => ({ dw: 30, dh: 40, draw(c) {
  P(c, '#8fd3f5', c => { c.moveTo(15, 4); c.quadraticCurveTo(2, 24, 8, 32); c.quadraticCurveTo(15, 40, 22, 32); c.quadraticCurveTo(28, 24, 15, 4); }, { edge: '#ffffff' });
} });

/* ---------- character presets ---------- */
const CIND_RAGS = { dress: '#a39686', apron: true, hair: '#b0763a', hairStyle: 'bun' };
const CIND_GOWN = { dress: '#e6b3d4', top: '#f2c9e2', gown: true, tiara: true, hair: '#b0763a', hairStyle: 'long', mood: 'happy' };
const SIS_A = { dress: '#7fbf6a', hair: '#2d2a28', hairStyle: 'updo', mood: 'snooty', lips: '#d0577f' };
const SIS_B = { dress: '#eba443', hair: '#b0432a', hairStyle: 'bun', mood: 'snooty', lips: '#d0577f' };
const MOM = { dress: '#5b3f6b', hair: '#6b6670', hairStyle: 'updo', mood: 'snooty', lips: '#a8344f' };
const GODMA = { dress: '#9b8fd6', hood: '#6a5acd', hair: '#ece8f2', arm: 'wand', mood: 'happy' };
const NIGHT_TINT = '#dcd8f4';

const BOOK = {
  title: '灰姑娘',
  subtitle: '佩罗童话 · 六幕旋转立体书',
  credit: '萝卜AI笔记',
  moral: ['心地善良的人', '终会被温柔以待'],
  intro: '灰姑娘的故事分成六幕立在纸上。翻开书，每一幕都可以点按钮，让南瓜变马车，让大钟敲响十二下。',
  accent: '#c9567f',
  cardIcon: { art: 'slipper' },
  cover: {
    color: '#5d4b8f', trim: '#efd28a', titleColor: '#fff3e6',
    sky: ['#3d3f86', '#f4c6d6'],
    items: [
      { art: 'star', x: .18, y: .1, w: .05 }, { art: 'star', x: .42, y: .06, w: .04 }, { art: 'star', x: .82, y: .3, w: .04 },
      { art: 'moon', x: .66, y: .08, w: .2 },
      { art: 'castle', x: .3, y: .18, w: .42 },
      { art: 'hills', args: { colors: ['#b58ac7', '#9b72b5', '#7f5aa0'], seed: 3 }, x: -.04, y: .48, w: 1.08 },
      { art: 'coach', x: .5, y: .5, w: .46 },
      { art: 'lady', args: CIND_GOWN, x: .16, y: .42, w: .26 },
      { art: 'flowers', args: { seed: 21, pal: ['#ffd1e3', '#fff1a8', '#ffffff', '#c9b8ff'] }, x: -.02, y: .89, w: 1.04 },
    ],
  },
  scenes: [
    {
      title: '灰扑扑的厨房', btn: '扫一扫', hint: '两个姐姐又在使唤她了。',
      palette: 'afternoon', sky: ['#c58a5c', '#f2d6ac'], hills: ['#a26a44', '#8c5a3a', '#764a30'], ground: '#c79d72', wash: '', decor: { clouds: 0 }, back: false, front: false,
      text: '从前有个姑娘，妈妈去世以后，继母带着两个姐姐住进了家里。她们把最脏最累的活全推给她，她整天在灶台边扫灰，身上总是灰扑扑的，大家就叫她灰姑娘。',
      items: [
        { art: 'fireplace', d: 1.5, x: -.22, h: .9 },
        { id: 'sisA', art: 'lady', args: SIS_A, flip: true, d: 1.85, x: .62, h: 1.05, idle: [{ type: 'sway', amp: .02, speed: 1.5 }] },
        { id: 'cind', art: 'lady', args: { ...CIND_RAGS, arm: 'broom', broom: true }, d: 2.2, x: .05, h: 1.05, idle: [{ type: 'breathe', amp: .015, speed: 2 }] },
        { id: 'sisB', art: 'lady', args: SIS_B, flip: true, d: 2.45, x: .88, h: 1.0 },
        { id: 'm1', art: 'mouse', args: { pose: 'sit' }, d: 2.55, x: -.55, h: .24, idle: [{ type: 'bob', amp: .01 }] },
        { id: 'm2', art: 'mouse', d: 2.65, x: -.95, h: .2 },
        { id: 'bubS', art: 'bubble', args: { text: '快去干活！', tail: .7 }, d: 1.9, x: .5, y: 1.12, h: .34, fade: true, tint: false },
        { id: 'bubC', art: 'bubble', args: { text: '扫完啦！', tail: .4 }, d: 2.25, x: -.05, y: 1.12, h: .32, fade: true, op: 0, tint: false },
      ],
      action: [
        { t: 0, dur: .3, type: 'fadeOut', target: 'bubS' },
        { t: 0, dur: 1.6, type: 'shake', target: 'cind', amp: .05, speed: 18 },
        { t: .1, dur: 1.4, type: 'trail', target: 'cind', every: .2, life: .9 },
        { t: .2, dur: 2, type: 'hop', target: ['m1', 'm2'], amp: .06, speed: 10 },
        { t: 1.7, dur: .35, type: 'popIn', target: 'bubC' },
        { t: 1.7, type: 'sound', preset: 'pop' },
      ],
    },
    {
      title: '去舞会的晚上', btn: '出发', hint: '只剩她一个人留在家里。', palette: 'afternoon',
      floor: { path: [1.95, 2.3] },
      text: '王宫要办一场盛大的舞会。继母和姐姐们穿上新裙子，坐着马车出了门，谁也没问灰姑娘想不想去。家里一下子安静了，灰姑娘坐在门口，忍不住掉下了眼泪。',
      items: [
        { art: 'house', d: 1.5, x: -.28, h: .95 },
        { art: 'pine', d: 1.6, x: .58, h: 1.15, sway: .01 },
        { id: 'mom', art: 'lady', args: MOM, d: 2.05, x: .05, h: 1.12 },
        { id: 'sisA', art: 'lady', args: SIS_A, d: 2.1, x: .42, h: 1.02 },
        { id: 'sisB', art: 'lady', args: SIS_B, d: 2.15, x: -.3, h: 1.02 },
        { id: 'bub', art: 'bubble', args: { text: '你就待在家里', tail: .4 }, d: 2.08, x: .12, y: 1.25, h: .34, fade: true, tint: false },
        { id: 'cind', art: 'lady', args: { ...CIND_RAGS, mood: 'sad' }, d: 2.5, x: -.85, h: 1.0 },
        { id: 'tear', art: 'tear', d: 2.53, x: -.66, y: .8, h: .1, fade: true, op: 0, tint: false, idle: [{ type: 'float', period: 1.4, dx: 0, dy: -.35, after: 'action' }] },
      ],
      action: [
        { t: 0, dur: .3, type: 'fadeOut', target: 'bub' },
        { t: .2, dur: 2.6, type: 'walk', target: 'mom', to: { x: .55, d: 1.62, sc: .62 } },
        { t: .35, dur: 2.5, type: 'walk', target: 'sisA', to: { x: .66, d: 1.66, sc: .62 } },
        { t: .5, dur: 2.4, type: 'walk', target: 'sisB', to: { x: .42, d: 1.7, sc: .62 } },
        { t: 2.7, dur: .4, type: 'fadeOut', target: ['mom', 'sisA', 'sisB'] },
        { t: 2.9, type: 'show', target: 'tear' },
        { t: 2.9, type: 'sound', notes: [523, 440, 392] },
      ],
    },
    {
      title: '仙女教母', btn: '变', hint: '南瓜和旧裙子都要变样啦。', palette: 'night', tint: NIGHT_TINT,
      text: '忽然一阵亮光，仙女教母出现了。“别哭，你也能去舞会。”她挥了挥魔杖，南瓜变成了金色马车，灰姑娘的旧裙子变成了闪闪发亮的礼服。“记住，十二点以前一定要回来。”',
      items: [
        { art: 'moon', d: 1.12, x: -.42, y: 1.65, h: .4, ay: .5, tint: false },
        { art: 'star', d: 1.25, x: .1, y: 2.0, h: .1, fade: true, ay: .5, tint: false, idle: [{ type: 'twinkle' }] },
        { art: 'star', d: 1.3, x: .45, y: 1.7, h: .1, fade: true, ay: .5, tint: false, idle: [{ type: 'twinkle' }] },
        { id: 'coach', art: 'coach', d: 1.75, x: .38, h: .95, op: 0, tint: false },
        { id: 'pump', art: 'pumpkin', d: 1.95, x: .42, h: .42 },
        { id: 'god', art: 'lady', args: GODMA, d: 2.2, x: -.62, h: 1.12, tint: false, idle: [{ type: 'bob', amp: .02, speed: 2 }] },
        { id: 'bub', art: 'bubble', args: { text: '别哭', tail: .4 }, d: 2.25, x: -.55, y: 1.25, h: .3, fade: true, tint: false },
        { id: 'cindR', art: 'lady', args: { ...CIND_RAGS, mood: 'sad' }, d: 2.35, x: -.02, h: 1.02 },
        { id: 'cindG', art: 'lady', args: CIND_GOWN, d: 2.35, x: -.02, h: 1.02, op: 0, tint: false },
        { id: 'm1', art: 'mouse', args: { pose: 'sit' }, d: 2.55, x: .6, h: .22 },
        { id: 'm2', art: 'mouse', args: { pose: 'sit' }, flip: true, d: 2.6, x: .85, h: .22 },
        { id: 'burst', art: 'burst', args: { text: '变！' }, d: 2.0, x: .3, y: .95, h: .55, ay: .5, fade: true, op: 0, tint: false },
      ],
      action: [
        { t: 0, dur: .3, type: 'fadeOut', target: 'bub' },
        { t: 0, dur: .9, type: 'wave', target: 'god', amp: .22, speed: 10 },
        { t: .8, dur: .35, type: 'popIn', target: 'burst' },
        { t: .8, type: 'sound', preset: 'chime' },
        { t: .95, type: 'swap', target: 'pump', with: 'coach' },
        { t: .95, type: 'confetti', at: { d: 1.9, x: .38, y: .7 }, colors: ['#ffe27a', '#ffffff', '#f2c9e2', '#c9b8ff'] },
        { t: 1.0, dur: 2, type: 'hop', target: ['m1', 'm2'], amp: .06, speed: 9 },
        { t: 1.6, type: 'swap', target: 'cindR', with: 'cindG' },
        { t: 1.6, dur: .5, type: 'jump', target: 'cindG', amp: .18 },
        { t: 1.6, type: 'sound', preset: 'chime' },
        { t: 2.6, dur: .5, type: 'fadeOut', target: 'burst' },
      ],
    },
    {
      title: '王宫舞会', btn: '跳支舞', hint: '音乐响起来了。', palette: 'night',
      sky: ['#4a3a7a', '#e3a9c8'], hills: ['#b58ac7', '#9b72b5', '#7f5aa0'], ground: '#d9c7ea', tint: '#f0e8fa', decor: { lanterns: true, stars: true, clouds: 0 },
      grass: ['#7fb86a', '#93c97c'], flowerG: '#7fb86a',
      text: '灰姑娘一走进舞厅，所有人都看呆了。王子走过来邀请她跳舞，他们跳了一支又一支，聊得特别开心。两个姐姐站在旁边，怎么也认不出这位漂亮的姑娘是谁。',
      items: [
        { art: 'castle', d: 1.4, x: 0, h: 1.45 },
        { id: 'cind', art: 'lady', args: CIND_GOWN, d: 2.15, x: -.42, h: 1.05 },
        { id: 'prince', art: 'prince', args: { wave: true }, flip: true, d: 2.15, x: .42, h: 1.15 },
        { id: 'sisA', art: 'lady', args: SIS_A, d: 2.55, x: -1.0, h: 1.0, idle: [{ type: 'sway', amp: .02, speed: 1.4 }] },
        { art: 'note', d: 2.2, x: -.1, y: .95, h: .18, fade: true, tint: false, idle: [{ type: 'float', period: 3, phase: 0, dx: .2, dy: .7 }] },
        { art: 'note', args: { color: '#c9567f' }, d: 2.2, x: -.1, y: .95, h: .18, fade: true, tint: false, idle: [{ type: 'float', period: 3, phase: .5, dx: .2, dy: .7 }] },
        { id: 'h1', art: 'heart', d: 2.25, x: -.05, y: 1.0, h: .18, fade: true, op: 0, tint: false, idle: [{ type: 'float', period: 2.2, phase: 0, dx: .1, dy: .6 }] },
        { id: 'h2', art: 'heart', args: { color: '#ff9ab8' }, d: 2.25, x: -.05, y: 1.0, h: .16, fade: true, op: 0, tint: false, idle: [{ type: 'float', period: 2.2, phase: .5, dx: -.1, dy: .6 }] },
      ],
      action: [
        { t: 0, dur: .8, type: 'to', target: 'cind', to: { x: -.2 } },
        { t: 0, dur: .8, type: 'to', target: 'prince', to: { x: .2 } },
        { t: .8, dur: 3, type: 'wave', target: ['cind', 'prince'], amp: .1, speed: 5 },
        { t: .8, dur: 3, type: 'hop', target: ['cind', 'prince'], amp: .04, speed: 5 },
        { t: 1.0, type: 'show', target: ['h1', 'h2'] },
        { t: 0, type: 'sound', notes: [659, 784, 880, 784, 659, 523] },
      ],
    },
    {
      title: '十二点的钟声', btn: '铛', hint: '魔法快要消失了。', palette: 'night', tint: NIGHT_TINT,
      text: '就在这时，大钟敲响了十二下。灰姑娘想起仙女的话，提起裙子就往外跑，慌乱中一只水晶鞋掉在了台阶上。王子追出来，只捡到了这只小小的鞋子。',
      items: [
        { art: 'moon', d: 1.12, x: .4, y: 1.7, h: .38, ay: .5, tint: false },
        { id: 'clock', art: 'clocktower', d: 1.5, x: -.42, h: 1.6 },
        { art: 'stairs', d: 1.85, x: .25, h: .45 },
        { id: 'dong', art: 'burst', args: { text: '铛！' }, d: 1.7, x: -.3, y: 1.3, h: .45, ay: .5, fade: true, op: 0, tint: false },
        { id: 'prince', art: 'prince', flip: true, d: 1.95, x: .75, y: .25, h: 1.0, op: 0 },
        { id: 'cind', art: 'lady', args: CIND_GOWN, flip: true, d: 2.2, x: .25, h: 1.05, tint: false },
        { id: 'slip', art: 'slipper', d: 2.18, x: .3, y: .02, h: .12, op: 0, tint: false },
        { id: 'spark', art: 'star', d: 2.2, x: .38, y: .2, h: .1, fade: true, op: 0, ay: .5, tint: false, idle: [{ type: 'twinkle', speed: 5 }] },
      ],
      action: [
        { t: 0, dur: .3, type: 'popIn', target: 'dong' },
        { t: 0, dur: 1.4, type: 'shake', target: 'clock', amp: .03, speed: 30 },
        { t: 0, type: 'sound', notes: [392, 392, 392, 392] },
        { t: .5, dur: 1.4, type: 'run', target: 'cind', to: { x: -.85, d: 2.6 }, bobAmp: .05 },
        { t: 1.9, dur: .3, type: 'fadeOut', target: 'cind' },
        { t: .8, type: 'show', target: 'slip' },
        { t: .8, dur: .3, type: 'popIn', target: 'spark' },
        { t: 1.4, dur: .3, type: 'fadeIn', target: 'prince' },
        { t: 1.4, dur: 1.3, type: 'walk', target: 'prince', to: { x: .45 } },
        { t: 2.2, dur: .5, type: 'fadeOut', target: 'dong' },
      ],
    },
    {
      title: '水晶鞋', btn: '试鞋', hint: '这只鞋到底是谁的？', palette: 'spring',
      text: '王子带着水晶鞋挨家挨户地找。两个姐姐使劲往里塞脚，怎么也穿不进去。轮到灰姑娘的时候，鞋子刚刚好。王子一眼就认出了她，后来他们幸福地生活在一起。',
      items: [
        { art: 'house', d: 1.5, x: -.3, h: .95 },
        { art: 'tree', args: { g: ['#5fa868', '#79c070', '#a3d987'], fruit: '#ff9ab8' }, d: 1.6, x: .45, h: 1.35, sway: .006 },
        { id: 'cindR', art: 'lady', args: CIND_RAGS, d: 2.2, x: -.4, h: 1.02 },
        { id: 'cindG', art: 'lady', args: CIND_GOWN, d: 2.2, x: -.4, h: 1.02, op: 0 },
        { id: 'prince', art: 'prince', args: { wave: true }, flip: true, d: 2.15, x: .42, h: 1.15 },
        { id: 'slip', art: 'slipper', d: 2.24, x: .15, y: .7, h: .12, tint: false },
        { id: 'sisA', art: 'lady', args: SIS_A, flip: true, d: 2.5, x: .98, h: 1.02 },
        { id: 'sisB', art: 'lady', args: SIS_B, d: 2.55, x: -1.0, h: 1.0 },
        { id: 'sisA2', art: 'lady', args: { ...SIS_A, mood: 'shock', lips: null }, flip: true, d: 2.5, x: .98, h: 1.02, op: 0 },
        { id: 'sisB2', art: 'lady', args: { ...SIS_B, mood: 'shock', lips: null }, d: 2.55, x: -1.0, h: 1.0, op: 0 },
        { id: 'm1', art: 'mouse', args: { pose: 'sit' }, d: 2.65, x: .3, h: .2 },
        { id: 'burst', art: 'burst', args: { text: '正好！' }, d: 2.3, x: -.32, y: 1.25, h: .5, ay: .5, fade: true, op: 0, tint: false },
        { id: 'h1', art: 'heart', d: 2.3, x: 0, y: .95, h: .2, fade: true, op: 0, tint: false, idle: [{ type: 'float', period: 2.2, phase: 0, dx: .1, dy: .6 }] },
        { id: 'h2', art: 'heart', args: { color: '#ff9ab8' }, d: 2.3, x: 0, y: .95, h: .17, fade: true, op: 0, tint: false, idle: [{ type: 'float', period: 2.2, phase: .5, dx: -.1, dy: .6 }] },
      ],
      action: [
        { t: .2, dur: 1.3, type: 'to', target: 'slip', to: { x: -.32, y: .02 } },
        { t: 1.6, type: 'swap', target: 'cindR', with: 'cindG' },
        { t: 1.6, type: 'swap', target: ['sisA', 'sisB'], with: ['sisA2', 'sisB2'] },
        { t: 1.6, dur: .35, type: 'popIn', target: 'burst' },
        { t: 1.6, type: 'confetti', at: { d: 2.2, x: -.3, y: .8 }, colors: ['#ffe27a', '#ffffff', '#f2c9e2', '#ff9ab8'] },
        { t: 1.6, type: 'sound', preset: 'chime' },
        { t: 1.6, dur: 1, type: 'shake', target: ['sisA2', 'sisB2'], amp: .03 },
        { t: 1.6, dur: 2, type: 'hop', target: 'm1', amp: .06, speed: 10 },
        { t: 1.8, type: 'show', target: ['h1', 'h2'] },
      ],
    },
  ],
};
