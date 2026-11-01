# 素材库与绘制规范

所有素材都是纸雕风格：平涂的柔和颜色，每一片纸有轻微投影和一圈浅色切边，叠起来有层次。角色默认侧身朝右站在设计框底边上。

## 内置素材目录

宽高比 = 宽 / 高，用来计算元素宽度（`宽 = h × 宽高比`）。

### 角色

| art | 宽高比 | args |
|---|---|---|
| `hareStand` 站着的兔子 | 0.94 | `shock`（瞪眼惊讶）`happy`（眯眼笑）`sleep` `color` `scarf`（围巾颜色，`null` 不要围巾） |
| `hareRun` 奔跑的兔子 | 1.50 | `f: 0/1` 两帧，`color` `scarf` |
| `hareSleep` 睡觉的兔子 | 1.80 | `color` `carrot: false` `scarf` |
| `tortoise` 乌龟 | 1.50 | `f: 0/1` 两帧，`band`（头带，`true` 或颜色）`medal` `sleep` `skin` `shell` |
| `squirrel` 松鼠 | 0.86 | `color` `eyes` |
| `bird` 圆圆小鸟 | 1.07 | `color` `f`（翅膀上扬）`eyes` |
| `owl` 猫头鹰 | 0.80 | `color` `glasses` `eyes: 'sleep'` |
| `frog` 青蛙 | 1.17 | `color` |
| `hedgehog` 刺猬 | 1.50 | |
| `cat` `fox` `dog` `bear` `mouse` `pig` `sheep` `wolf` `panda` | 站 1.33 · 坐 0.87 · 睡 1.80 | `pose: 'stand' / 'sit' / 'sleep'`，站姿有 `f: 0/1` 两帧，`eyes`，以及覆盖颜色 `body` `belly` `head` `earCol` |
| `critter` 自定义四足动物 | 同上 | `kind` 以外再给 `body` `belly` `ear`（pointy/round/mouse/floppy/pig）`snout`（cat/fox/dog/bear/mouse/pig/sheep）`tail`（cat/fox/dog/mouse/pig/nub）`stripe` `spot` `sock` `patch` `wool` |
| `person` Q 版人物 | 0.56 | `skin` `hair` `hairStyle: 'short'/'bun'/'long'` `shirt` `pants` `dress` `hat: 'straw'/'cap'/'scholar'` `hatColor` `beard`（`true` 或颜色）`wave`（举手）`f: 0/1` 两帧 `eyes` |

`eyes` 可选 `'sleep'`（闭眼弧线）`'shock'`（大眼）`'happy'`（笑眯眼），不写是普通圆眼。

### 场景与道具

| art | 宽高比 | args |
|---|---|---|
| `tree` 圆冠大树 | 0.61 | `g`（三档绿色数组）`trunk` `fruit`（`true` 或颜色） |
| `pine` 松树 | 0.47 | `g` `trunk` `snow` |
| `bush` 灌木 | 1.96 | `g` `berries` |
| `hills` 层叠山丘 | 2.18 | `colors` `seed` |
| `grass` 草丛条 | 10 | `g` `seed` |
| `flowers` 花边条 | 11.3 | `g` `pal` `seed` |
| `cloud` 云 | 2.14 | `color` |
| `sun` 太阳 | 1 | |
| `moon` 月牙 | 1 | |
| `star` 星星 | 1 | `color` |
| `stump` 树桩 | 1.74 | |
| `sign` 木牌 | 0.75 | `text` `color` |
| `fence` 白篱笆 | 4.4 | |
| `bridge` 石拱桥 | 2.66 | |
| `arch` 终点拱门 | 1 | `text` `color` |
| `ribbon` 彩带 | 7.86 | `color` |
| `podium` 领奖台 | 1.83 | `text` |
| `mushrooms` 蘑菇 | 1.4 | |
| `carrot` 胡萝卜 | 0.91 | |
| `carrotPatch` 菜地 | 2 | |
| `house` 小房子 | 1.07 | `wall` `roof` `door` |
| `rock` 石头 | 1.75 | `color` |
| `pond` 水塘 | 4 | `color` |
| `lantern` 灯笼 | 0.71 | `color` |
| `flag` 旗子（锚点 `ax: .125`） | 0.67 | `color`（不写是黑白格赛旗） |

### 效果

| art | 宽高比 | args |
|---|---|---|
| `bubble` 对话气泡 | 1.89 | `text`（2 到 7 个字最好）`tail`（尾巴位置 0 到 1） |
| `burst` 爆炸星 | 1.27 | `text` `color` |
| `glyph` 单个大字 | 1 | `text`（`Z` `!` `?` `♪`）`color` `size` |
| `snore` 鼾泡 | 1 | |
| `dust` 尘土团 | 1.5 | |
| `heart` 爱心 | 1 | `color` |
| `note` 音符 | 0.8 | `color` |

## 自己画新角色

素材库里没有、又不能生图时，在 `book.js` 里注册新素材：

```js
ART.crow = (o = {}) => ({ dw: 120, dh: 100, draw(c) {
  // 设计框 120 × 100，底边 y=100 是地面，角色朝右
  const col = o.color || '#3b3f52';
  P(c, shade(col, -.15), c => poly(c, [[20, 50], [2, 40], [6, 62]]));          // 尾巴（最远的先画）
  L(c, '#d9a03a', 2, c => { c.moveTo(52, 80); c.lineTo(50, 98); c.moveTo(64, 80); c.lineTo(66, 98); }); // 腿
  P(c, col, c => ell(c, 56, 58, 34, 24));                                         // 身体
  P(c, shade(col, -.1), c => ell(c, 46, 58, 22, 12, -.3), { blur: 2 });           // 翅膀
  P(c, col, c => circ(c, 88, 38, 18));                                            // 头
  F(c, '#f2b84b', c => poly(c, [[102, 34], [118, 40], [102, 46]]));              // 嘴
  eyeDot(c, 94, 34, 3.4, o.eyes);                                                 // 眼睛
  blush(c, 90, 46, 3.5);
} });
```

然后在 items 里写 `{ art: 'crow', args: { eyes: 'happy' }, ... }`。

### 可用的绘图函数

- `P(c, 颜色, c => 路径, { blur, oy, edge, lw, shadow })`：一片纸。自带投影和浅色切边。角色的大块面都用它。
- `F(c, 颜色, c => 路径)`：平涂，无投影。用于眼睛、斑点、高光、腮红。
- `L(c, 颜色, 线宽, c => 路径)`：线条。用于嘴、胡须、腿、茎。
- 路径：`circ(c, x, y, r)` `ell(c, x, y, rx, ry, 旋转)` `rr(c, x, y, w, h, 圆角)` `poly(c, [[x, y], ...])` `star(c, x, y, 外径, 内径, 角数)`，也可以直接用 `c.moveTo / bezierCurveTo` 等原生方法。
- 细节：`eyeDot(c, x, y, r, mode)` `blush(c, x, y, r)` `label(c, 文字, x, y, 字号, 颜色)` `carrot(c, x, y, 旋转, 缩放)`。
- 颜色：`shade('#hex', -.15)` 变暗，`shade('#hex', .2)` 变亮。
- 组合：在自己的 `draw` 里调用别的素材，例如先画一圈鬃毛，再 `ART.cat({ body: '#e8b04a' }).draw(c)` 得到狮子（四足站姿的头在 (124, 46)，半径 24）。

### 风格规则

1. 从远到近画：远侧的腿和耳朵（用 `shade(色, -.12)` 压暗）→ 尾巴 → 身体 → 近侧的腿 → 头 → 五官。
2. 一个角色主色两到三种，再加一个肚皮浅色。饱和度中等偏柔，避免纯黑描边，深色只用在眼睛和鼻子。
3. 眼睛小而圆，带一个白色高光点；加腮红，表情就可爱了。
4. 形状用圆、椭圆、圆角矩形拼，轮廓简单，缩小到屏幕上一百多像素时依然认得出。
5. 设计框四周留 4% 左右的空白，投影才不会被裁掉。
6. 动起来需要的姿势做成参数（`f: 0/1` 两帧迈腿，`eyes: 'sleep'` 睡觉），比画两个独立素材更省事。
7. 白色或很浅的角色给 `P` 加 `{ edge: 'rgba(150,118,92,.5)' }`，否则切边会融进背景。

画完先单独放一幕看效果，不满意就调整比例和颜色，不要在一张画上叠太多细节。
