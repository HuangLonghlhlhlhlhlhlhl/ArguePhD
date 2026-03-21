// 后端 API 配置
// 开发环境：如果你在真机上调试，请把 localhost 换成你电脑的局域网 IP (如 192.168.1.5)
const BASE_URL = 'http://localhost:3000'; 

export const API_ENDPOINTS = {
  generate: `${BASE_URL}/api/generate`,
  posts: `${BASE_URL}/api/posts`,
  ocr: `${BASE_URL}/api/ocr`, // 新增截图识别接口
};

export default BASE_URL;
