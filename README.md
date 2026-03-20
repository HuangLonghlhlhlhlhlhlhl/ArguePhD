# 🥊 怼人助手 (Roast Assistant)

**一个专门拯救“张口结舌”与“赛后复盘遗憾”的随身反击武器库。**

[![React Native](https://img.shields.io/badge/React%20Native-0fb9b1?style=for-the-badge&logo=react&logoColor=white)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-1e272e?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)

---

## 🚀 核心超能力 (Features)

本应用抛弃了干硬的文本堆砌，全面升级了高可玩性的进阶玩法，主要包含以下六大神级模块：

1. 🤖 **AI 智能生成 (AI Interaction)**
   - 输入对方说的话，一键为您生成两种不同维度的回击方案。
   - 提供 **“上等回怼（优雅暴击）”** 与 **“中等回怼（直白回击）”** 的多重选择。

2. 🎭 **阴阳怪气翻译器 (Translator)**
   - 传说中的“高情商净化器”！输入粗鲁的咒骂语，自动帮你包装成风度翩翩却讽刺拉满的“阴阳怪气”长文，让你在职场与游戏群中全身而退且不留话柄。

3. 📸 **一键表情包 (Meme Generator)**
   - 看到神评论觉得光有文字不过瘾？没关系！一键将其渲染为带搞笑底图的表情包。
   - 支持系统原生的“一键分享”至微信或存入本地相册。

4. 🥊 **实战演练模式 (Combat Simulator)**
   - **国内首创吵架模拟器**。进入虚拟对线房间，面对 AI 不断发来的阴阳怪气，你需要快速敲出反击语句。
   - AI 根据您的反击威力给出即时评级（如：由青铜嘴炮进化到钻石毒舌）。

5. ☕️ **预设经典语录与段子大厅**
   - 收集各种真实高发场景的经典怼人话术（如职场甩锅、长辈催婚、游戏互喷等）。
   - 带有 UGC（用户原创内容）风格的段子大厅模块，尽览最强网络神评。

6. ❤️ **本地专属收藏夹**
   - 看到绝妙的句子？点个红心！本地持久化存储（AsyncStorage）让你的专属词库永不丢失，随时随地一键复制。

---

## 🛠 技术栈 (Tech Stack)

- **前端框架**：[React Native](https://reactnative.dev)
- **开发工具链**：[Expo](https://expo.dev) 
- **路由导航**：[React Navigation (Native Stack)](https://reactnavigation.org/)
- **UI 组件库**：[React Native Paper](https://callstack.github.io/react-native-paper/)
- **本地存储**：`@react-native-async-storage/async-storage`
- **截图分享**：`react-native-view-shot` & `expo-sharing`
- **剪贴板**：`expo-clipboard`

---

## 💻 如何在本地运行 (How to run locally)

如果您想把代码克隆到本地机器上自行测试与开发，请按照以下步骤操作：

**1. 克隆代码库并进入文件夹**
```bash
git clone https://github.com/您自己的仓库地址/ArguePhD.git
cd ArguePhD
```

**2. 安装所有依赖**
```bash
npm install
```

**3. 启动本地开发服务器**
```bash
npx expo start -c
```

随后，您可以使用手机下载 **Expo Go**，扫描电脑屏幕出现的二维码，就可以在您的真机上畅快体验所有的怼人功能了！

---

> *Note: 作为一个以学习和展示 React Native 交互能力而诞生的娱乐类 App，遇到烦心事多看看那些幽默机智的神回复，祝您现实生活中少跟人争吵，天天好心情！*
