# 背景音乐

每一幕都有自己的背景音乐。翻页时上一首淡出、下一首淡入，按钮可以在动作进行到某个时刻切换曲子。底栏有单独的音乐开关，和音效开关互不影响。浏览器要求用户先点一下页面才能出声，所以音乐从读者第一次点击开始播放。

默认用浏览器现场合成，不需要任何音频文件，也没有版权问题。每一幕的旋律按幕的序号生成，各不相同，循环播放。

## 情绪曲风

| mood | 听感 | 适合的画面 |
|---|---|---|
| `gentle` | 温柔，铃音加柔和的铺底 | 封面、开场、清晨、温馨的家 |
| `playful` | 轻快跳跃，拨弦加轻打点 | 角色斗嘴、玩耍、白天的森林 |
| `adventure` | 带点冒险感的多利亚调式，有鼓点 | 出发、赶路、比赛开始 |
| `sneaky` | 小调拨弦短音，蹑手蹑脚 | 偷偷溜过、悬念、试探 |
| `sleepy` | 三拍子八音盒摇篮曲 | 睡觉、午后发呆 |
| `sad` | 慢速小调钢琴 | 被欺负、分别、哭泣 |
| `magic` | 利底亚调式，琶音加闪光 | 变身、仙女、魔法出现 |
| `waltz` | 三拍子圆舞曲，“嘭恰恰”低音 | 舞会、庆典、旋转 |
| `tense` | 快速小调固定低音 | 倒计时、追赶、危险 |
| `triumph` | 大调铜管加鼓，凯旋 | 冲线、获胜、大结局 |
| `night` | 慢速八音盒加铺底，安静 | 夜晚、月光、星空 |
| `festive` | 明亮热闹，有鼓点 | 节日、集市、欢呼 |

## 配置写法

```js
const BOOK = {
  coverMusic: 'gentle',      // 合上书时（封面）的音乐，默认 gentle
  musicVolume: .6,           // 整体音乐音量 0 到 1，默认 .6
  // music: false,           // 整本书关掉背景音乐（读者也可以用底栏开关）
  scenes: [
    { title: '王宫舞会', music: { mood: 'waltz', bpm: 112, density: .3 }, ... ,
      action: [
        { t: 0, type: 'music', mood: { mood: 'waltz', bpm: 150, density: .75 } },  // 按下按钮立刻换成热闹版
      ] },
    { title: '水晶鞋', music: 'sneaky', ... ,
      action: [
        { t: 1.6, type: 'music', mood: 'triumph' },   // 鞋子穿上那一刻切到凯旋曲
      ] },
  ],
};
```

- `music` 写字符串就是曲风名；写对象可以微调：`bpm`（速度）、`density`（旋律密度 0 到 1）、`root`（主音的 MIDI 音高，60 是中央 C）、`seed`（换一个数字就换一段旋律）、`gain`（这首的相对音量）。
- 没写 `music` 的幕按配色自动选：morning、afternoon、spring、autumn 用 gentle，day 和 beach 用 playful，noon 用 sleepy，festive 用 festive，dusk、night、snow 用 night。
- 动作里的 `music` 步骤只在按钮按下后生效。读者翻走再翻回来，音乐保持动作后的版本，和画面停留的结局对得上；点“再来一次”会回到入场音乐。
- 同一首曲子的“入场版”和“高潮版”用相同的曲风、只改 `bpm` 和 `density`，听起来像乐队换了一档，过渡最自然。

## 设计思路

每一幕定两个音乐点就够了：

1. **入场音乐**：翻到这一页时的情绪，对应这一幕的开头状态。
2. **转折点**（可选）：按钮动作里最关键的那一刻，比如变身、冲线、真相揭晓，用 `type: 'music'` 切换。时间点和画面高潮对齐，同一时刻配一个 `sound` 音效效果更好。

整本书的情绪要有起伏，不要每一幕都很热闹。常见的走法是温柔开场，中段有悬念或低谷，结尾凯旋或回到温柔。

## 用自己的音乐文件

用户提供了音乐，或者当前环境能调用音乐生成模型（工具列表里有 music generation、text-to-music 之类，或配置了对应 API），可以用真实音频替代合成音乐：

1. 准备 30 到 60 秒、首尾能无缝衔接的循环片段，mp3 或 ogg，码率 64 到 96 kbps，每首控制在 1 MB 左右。
2. 放进一个文件夹，文件名就是曲名，例如 `music/ball.mp3`。
3. 配置里写 `music: 'file:ball'`，动作里写 `{ t: 0, type: 'music', file: 'ball_climax' }`。
4. 构建时加上 `--music music/`。

生成音乐时的提示词可以这样写：`30-second seamless loop, gentle children's picture book music, waltz in 3/4, music box and soft strings, no vocals`。只用有权使用的音乐，不要放受版权保护的歌曲。
