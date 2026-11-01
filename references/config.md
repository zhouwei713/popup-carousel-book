# book.js 配置说明

`book.js` 是一段普通 JavaScript，必须定义 `const BOOK = {...}`。它在引擎内部执行，可以直接使用引擎里的绘图函数和 `ART` 注册表（自定义角色见 `art.md`）。

## 顶层字段

| 字段 | 必填 | 说明 |
|---|---|---|
| `title` | 是 | 书名，封面大字、标签页标题 |
| `subtitle` | | 封面拱窗下方和左上角的小字，例如 `伊索寓言 · 六幕旋转立体书` |
| `credit` | | 署名，出现在封面底部、封底和页面右下角 |
| `moral` | | 封底文字，数组，一到两行 |
| `intro` | | 合上书时点“读故事”显示的简介 |
| `accent` | | 主色，用于按钮和卡片上的“第几幕”，默认 `#e5603f` |
| `cardIcon` | | 故事卡片右下角和封底的小图标，`{ art, args }` |
| `fonts` | | `{ title, body }`，Google Fonts 字体名。默认 `ZCOOL KuaiLe` 和 `ZCOOL XiaoWei`（中文）。英文书可用 `Fredoka` 和 `Lora` |
| `table` | | 桌面木纹底色，默认 `#8a5a3a` |
| `coverMusic` | | 封面背景音乐，默认 `gentle`，见 `music.md` |
| `musicVolume` | | 背景音乐音量 0 到 1，默认 .6 |
| `music` | | 写 `false` 关闭整本书的背景音乐 |
| `ui` | | 界面文字覆盖，键见下文 |
| `cover` | | 封面，见下文 |
| `scenes` | 是 | 4 到 8 幕 |

`ui` 可覆盖的键：`open` `close` `again` `cover` `coverHint` `readerClose` `loading` `coverReader` `prev` `next` `read` `sound` `music`，以及 `actLabel: (no, index, total) => string`。做英文书时全部换成英文。

### cover

```js
cover: {
  color: '#3f8a4f',          // 封面布面颜色
  trim: '#e9d39a',           // 烫金边框颜色
  titleColor: '#fff3d6',
  sky: ['#93d2ea', '#fff0d4'],// 拱窗里的天空渐变
  items: [                   // 拱窗里的插画，坐标是拱窗宽度的比例（0 到 1），y 从拱窗顶部算
    { art: 'sun', x: .62, y: .12, w: .23 },
    { art: 'hareRun', args: { f: 1 }, x: .44, y: .41, w: .48, flip: false },
  ],
}
```

拱窗是正方形加半圆顶，`w` 是素材宽度占拱窗宽度的比例。底部放一条 `flowers`（`y: .89, w: 1.04`），中间放 `hills`（`y: .39, w: 1.08`），再放一到两个主角，构图就完整了。

## scenes[i]

| 字段 | 说明 |
|---|---|
| `title` | 本幕标题 |
| `text` | 本幕故事，60 到 110 字 |
| `btn` | 按钮文字 |
| `hint` | 底栏小字提示 |
| `no` | 默认自动生成“第一幕”，可自定义 |
| `palette` | 配色预设，见下表 |
| `sky` `ground` `hills` `tint` `grass` `flowerG` `flowers` `wash` | 单独覆盖预设里的某一项 |
| `decor` | 书页装饰：`{ clouds: 3, stars: false, birds: false, bunting: false, snow: false, lanterns: false }` |
| `floor` | 地面图案：`{ path: [d0, d1], stream: x, finish: d, snow: true, color, pathColor }` |
| `back` | `false` 时不自动加远山 |
| `front` | `false` 时不自动加前景草丛和花边 |
| `music` | 这一幕的背景音乐：曲风名、`{ mood, bpm, density, root, seed }` 或 `file:文件名`，见 `music.md` |
| `melody` | 按钮音效的音符频率数组，默认自动生成 |
| `items` | 场景元素 |
| `action` | 按钮按下后的动作时间线 |

### 配色预设 palette

`morning` 清晨淡蓝 · `day` 晴天 · `noon` 正午暖黄 · `afternoon` 傍晚橙 · `festive` 节日粉蓝 · `spring` 春天粉绿 · `autumn` 秋天橙黄 · `snow` 雪地 · `beach` 海边 · `dusk` 黄昏紫（自动冷色滤镜和星星） · `night` 深夜（自动冷色滤镜和星星）

一本书里配色按剧情走，例如白天到黄昏，可以让读者感到时间在推进。

### floor 地面

地面是一块扇形，`d` 方向从书脊（0）到书页外缘（3.4），`x` 是左右。

- `path: [2.05, 2.6]` 在 d 2.05 到 2.6 之间画一条横穿的土路，角色走在 d 2.1 到 2.5 正好踩在路上。
- `stream: .48` 在 x = 0.48 处画一条从里往外流的小溪，配合 `bridge` 用。
- `finish: 1.95` 在 d 1.95 画一条黑白格终点线。

## items 元素

```js
{ id: 'hare', art: 'hareStand', args: { shock: true }, d: 2.22, x: .55, y: .26, h: 1.15,
  flip: false, ax: .5, ay: 0, rot: 0, sc: 1, op: 1, fade: false, tint: true, sway: 0,
  frames: [null, { f: 1 }], idle: [{ type: 'bob', amp: .05, speed: 3 }], follow: { id: 'tort', dx: .14, dy: .44 } }
```

| 字段 | 说明 |
|---|---|
| `id` | 动作里引用的名字，本幕内唯一。不参与动作的元素可以省略 |
| `art` | 素材名（见 `art.md`），或 `img:文件名`（生图模式） |
| `args` | 传给素材的参数 |
| `d` | 离书脊的距离，决定前后层次 |
| `x` | 左右位置，0 为中线，右为正 |
| `y` | 离地高度，站在树桩、领奖台上时用 |
| `h` | 元素高度，宽度按素材比例自动算 |
| `flip` | 左右镜像，角色默认朝右 |
| `ax` `ay` | 锚点，0 到 1。默认 `.5, 0` 即底边中点。旋转、缩放都围绕锚点。旗子 `ax: .125`（旗杆底部），太阳月亮 `ay: .5`（中心），彩带左半边 `ax: 0`、右半边 `ax: 1` |
| `rot` | 初始旋转（弧度，正值逆时针） |
| `sc` | 初始缩放 |
| `op` | 初始可见度。要在动作里才出现的元素设 `op: 0` |
| `fade` | `true` 用半透明材质，适合气泡、Zzz、光效；不投影 |
| `tint` | `false` 时不受夜景滤镜和 `tint` 动作影响 |
| `sway` | 纸片微微晃动的幅度，`.006` 到 `.012` |
| `frames` | 换帧用的参数列表。第一帧写 `null` 表示用 `args` 本身，后面写与 `args` 合并的差异，例如 `[null, { f: 1 }]` |
| `idle` | 常驻小动作，见下文 |
| `follow` | 跟随另一个元素：`{ id, dx, dy, dd }`，常用于跟着角色走的气泡 |
| `fit` | `false` 关闭自动缩小 |

### 楔形可用半宽

每一幕是一个楔形，`|x| + 元素半宽` 不能超过下表数值（单位同 `h`）。超出时引擎会自动缩小元素并警告。

| 幕数 | d=1.4 | 1.6 | 1.8 | 2.0 | 2.2 | 2.4 | 2.6 | 2.8 |
|---|---|---|---|---|---|---|---|---|
| 4 | 1.32 | 1.50 | 1.69 | 1.88 | 2.07 | 2.26 | 2.44 | 2.63 |
| 5 | 0.96 | 1.09 | 1.23 | 1.37 | 1.50 | 1.64 | 1.78 | 1.91 |
| 6 | 0.76 | 0.87 | 0.98 | 1.09 | 1.19 | 1.30 | 1.41 | 1.52 |
| 7 | 0.63 | 0.72 | 0.81 | 0.91 | 1.00 | 1.09 | 1.18 | 1.27 |
| 8 | 0.55 | 0.62 | 0.70 | 0.78 | 0.86 | 0.93 | 1.01 | 1.09 |

素材宽高比（宽 / 高）在 `art.md` 里，用 `h × 宽高比` 算出宽度。

### idle 常驻小动作

每项 `{ type, amp, speed, phase, until, after }`。`until: 'action'` 表示按钮按下后停止，`after: 'action'` 表示按下后才开始。

| type | 效果 | 常用参数 |
|---|---|---|
| `bob` | 上下轻跳 | `amp: .03, speed: 3` |
| `sway` | 左右摇摆（旋转） | `amp: .03, speed: 2` |
| `breathe` | 呼吸起伏（纵向缩放） | `amp: .025, speed: 2.2` |
| `drift` | 左右漂移 | `amp: .05, speed: .5` |
| `spin` | 持续旋转 | `speed: .25` |
| `twinkle` | 闪烁 | `speed: 2` |
| `float` | 循环飘起并淡出（Zzz、音符、爱心） | `period: 2.5, phase: 0, dx: .25, dy: .6` |
| `pulse` | 循环胀大再消失（鼾泡） | `period: 1.4` |

`float` 想要好几个错开飘，复制几个元素，`phase` 分别设 0、.33、.66。

## action 动作时间线

按钮按下时 `a = 0` 开始计时。每一步 `{ t, dur, type, target, ... }`，`t` 是开始时间（秒），`dur` 是持续时间，`target` 是一个 `id` 或 `id` 数组。所有步骤每一帧从元素初始状态重新叠加计算，所以多个步骤可以作用于同一个元素，按书写顺序叠加；步骤结束后的状态会一直保持。

| type | 效果 | 参数 |
|---|---|---|
| `to` | 属性补间到目标值 | `to: { x, y, d, rot, sc, sy, op }`, `ease` |
| `walk` | 移动并换帧，带轻微颠簸 | `to`, `step: .3`（换帧间隔）, `hump: { x0, x1, h, tilt }`（过桥拱起）, `ease`（默认 linear） |
| `run` | 快速移动并换帧，颠簸大 | 同上，默认 `step: .09`，`ease: 'in'` |
| `popIn` | 从 0 弹出（缩放回弹） | |
| `fadeIn` / `fadeOut` | 渐显 / 渐隐 | |
| `show` / `hide` | 立即显示 / 隐藏 | |
| `swap` | 隐藏 `target`，显示 `with`（换姿势，例如睡着的兔子换成跳起来的兔子） | `with: 'hareA'` |
| `hop` | 持续欢跳 | `amp: .1, speed: 8` |
| `jump` | 跳一下 | `amp: .3` |
| `wave` | 左右挥动（旋转来回） | `amp: .3, speed: 12` |
| `shake` | 左右抖动 | `amp: .03` |
| `squash` | 起跳前压扁 | `amp: .14` |
| `spin` | 转圈 | `turns: 1` |
| `frame` | 切换到某一帧 | `frame: 1` |
| `tint` | 颜色滤镜渐变，不写 target 时作用于整幕和地面 | `to: '#ffd0a0', amount: .7` |
| `trail` | 跟在目标后面冒尘土 | `every: .17, life: .9, art: 'dust', h: .24` |
| `confetti` | 一次性撒彩纸 | `at: { d, x, y }`, `colors`, `count` |
| `music` | 切换这一幕的背景音乐（一次性） | `mood: 'triumph'` 或 `mood: { mood, bpm, density }`，或 `file: '文件名'` |
| `sound` | 一次性音效 | `preset: 'pop' / 'chime' / 'boing' / 'whoosh' / 'snore'`，或 `notes: [523, 659]` |

`ease` 可选 `linear` `in` `out` `inOut`（默认） `back`（回弹） `bounce`。

### 动作设计小抄

- 一幕的动作控制在 2 到 5 秒，最后停在一个有画面感的结局姿势上。
- 角色说话：气泡 `op: 0` + `popIn`；原来的气泡 `fadeOut`。
- 角色跑远：`run` 到更小的 `d`（往书脊方向跑）并把 `sc` 缩小，结束时 `hide`，再配一个 `trail`。
- 时间流逝：太阳或月亮用 `to` 移动，再配一个整幕 `tint`。
- 庆祝：`confetti` + 围观角色 `hop` + `sound: 'pop'`。
- 睡醒：`swap` 睡姿到站姿，接 `jump`，再 `popIn` 一个感叹号 `glyph`。
- 物体断开或倒下：拆成两个元素，锚点设在固定端，用 `to: { rot }` 加 `ease: 'back'`。
