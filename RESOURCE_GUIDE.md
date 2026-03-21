# 怼人助手 · 资源申请与配置清单 🛠️

如果你想让你的 App 真正具备“大脑”和“视力”，你需要去以下平台申请对应的 API 接口权限。

## 1. 脑力资源：大语言模型 (LLM)
用于生成各种人格的回怼文字。
*   **推荐：DeepSeek (深度求索)**
    *   **优点**：目前最便宜、中文理解力极强。
    *   **申请地址**：[https://platform.deepseek.com/](https://platform.deepseek.com/)
    *   **填入位置**：`server/index.js` 中的 API 调用部分。

## 2. 视觉资源：文字识别 (OCR)
用于“对线实验室”里的聊天截图提取文字。
*   **推荐：百度 AI 开放平台**
    *   **优点**：每天免费 200 次，对中文截图识别率极高。
    *   **申请地址**：[百度 OCR 控制台](https://console.bce.baidu.com/ai/#/ai/ocr/overview/resource/getFree)
    *   **所需参数**：`API Key` 和 `Secret Key`。
    *   **填入位置**：后端 `server/.env` 文件。

## 3. 听觉资源：语音合成 (TTS)
(预留功能) 让 AI 用各种阴阳怪气的语调把话读出来。
*   **推荐：火山引擎 (字节跳动)**
    *   **优点**：声音库极丰富，有很多搞怪声优。
    *   **申请地址**：[https://www.volcengine.com/product/tts](https://www.volcengine.com/product/tts)

## 4. 终端权限配置 (Frontend)
你的 App 已经在 `package.json` 中预装了以下权限插件，无需手动修改：
*   **`expo-image-picker`**：调取相册权限。
*   **`expo-clipboard`**：一键复制代码权限。
*   **`react-native-view-shot`**：截图保存权限。

---

> [!TIP]
> **填 Key 建议**：当你拿到这些 Key 之后，先不要直接贴在代码里，最好告诉我，我帮你把它们放进 `.env` 环境变量里，这样上传 Github 时不会泄露隐私。
