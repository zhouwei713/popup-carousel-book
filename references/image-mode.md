# 生图模式

当前环境能生成图片时，用生图模型画主角和素材库里没有的角色，其余场景道具继续用内置素材。这样主角更精致，整本书风格仍然统一，文件也不会太大。

## 1. 列出要生成的素材

一般 4 到 12 张。每个角色的每个姿势是一张图，例如“乌鸦站着”“乌鸦叼着石子”“乌鸦喝到水开心”。需要迈腿换帧的角色，生两张只有腿部不同的图，或者干脆用 `walk` 的颠簸代替换帧（不写 `frames` 也能走）。

## 2. 提示词模板

所有图片共用同一段风格描述，只换主体部分，保证一本书风格一致：

```
A {角色和姿势描述}, side view facing right, full body, centered.
Layered paper-cut craft illustration: flat soft pastel colors, each shape cut from thick
matte paper with a thin light edge and a subtle drop shadow between layers, simple rounded
shapes, cute children's picture book character, small round eyes with a white highlight,
rosy cheeks. No text, no ground, no scenery, no frame.
Solid flat chroma green background (#00FF00), evenly lit, nothing else in the picture.
```

- 支持透明背景的接口（例如参数 `background: transparent`），直接要透明背景，把最后一句换成 `Transparent background.`。
- 角色本身是绿色的（青蛙、乌龟），背景改成纯品红 `#FF00FF`。
- 同一角色的多个姿势，在主体描述里重复相同的外观细节（颜色、配饰），例如 `a black crow with a small orange scarf`。
- 正方形 1024 × 1024 就够了。

## 3. 抠图和压缩

```bash
python3 scripts/cutout.py raw/crow_stand.png images/crow_stand.png
```

脚本会从四角取背景色，把与边缘连通的背景去掉（角色内部的白色和绿色会保留），清理边缘绿边，裁掉空白，缩到最长边 900 像素。已经是透明背景的图只做裁剪和缩放。需要 Pillow（`pip install pillow`）。

抠完逐张看一眼：边缘还有绿色就加大 `--tol`（例如 70），角色被抠缺了就减小 `--tol`。每张图最好在 300 KB 以内，整本书的图片加起来不超过 6 MB。

## 4. 在配置里使用

文件名（不含扩展名）就是素材名，前面加 `img:`：

```js
{ id: 'crow', art: 'img:crow_stand', d: 2.2, x: -.3, h: .8 },
{ id: 'crow2', art: 'img:crow_drink', d: 2.2, x: -.3, h: .8, op: 0 },
...
action: [{ t: .3, type: 'swap', target: 'crow', with: 'crow2' }]
```

- 图片角色和代码角色用法完全一样，可以 `walk`、`hop`、`swap`、`flip`。
- 换姿势用 `swap` 切换两个元素；需要逐帧动画时用 `frames` 不方便，改用两个元素交替 `show/hide` 或直接靠 `walk` 的颠簸。
- 封面拱窗的 `items` 也可以用 `img:`。

构建时加上图片目录：

```bash
python3 scripts/build.py book.js 书名.html --images images/
```

图片以 base64 内嵌进 HTML，成品依然是单个文件。

## 5. 失败时退回代码模式

生图失败、额度用完或者效果明显不统一时，不要卡住：把对应角色换成素材库里最接近的（或按 `art.md` 现场画），继续完成，交付时说明哪些角色用了代码绘制。
