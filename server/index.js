const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// --- Mock Data ---
let mockPosts = [
  { id: 1, author: '秃头小宝贝', avatar: 'face-man', content: '（来自后端）老板问我为什么迟到，我说我梦见在加班，不小心睡过了。', upvotes: 12580, time: '2小时前' },
  { id: 2, author: '打工魂', avatar: 'face-woman', content: '（来自后端）老板在群里说：大家要把公司当家。我回：好的爸爸，那零花钱什么时候发？', upvotes: 9852, time: '3小时前' },
  { id: 3, author: '峡谷清道夫', avatar: 'robot', content: '（来自后端）队友说我打得菜，我回：“是啊，我这是下乡扶贫来了，没想到贫困户这么嚣张。”', upvotes: 7521, time: '5小时前' }
];

// --- Routes ---

// 1. Health check
app.get('/', (req, res) => {
  res.send('Roast Assistant Backend is running! 🔥');
});

// 2. Mock AI Generation Endpoint
app.post('/api/generate', (req, res) => {
  const { text } = req.body;
  console.log(`AI Task Received: ${text}`);

  // Mock AI thinking delay
  setTimeout(() => {
    const results = {
      highTier: { 
        content: `（后端AI生成）关于“${text}”，我的建议是：既然你这么有空，要不先去把大脑里的那点水排一排？或者多看点书，免得逻辑漏洞大过黑洞。`, 
        reason: "💡 理由：降维打击，从认知深度直接摧毁对方的逻辑基础。" 
      },
      midTier: { 
        content: `（后端AI生成）对对对，你说的都对，那既然你这么厉害，你咋不上天和太阳肩并肩呢？`, 
        reason: "💡 理由：霸气侧漏，用极度敷衍和嘲讽的态度直接终止对方的输出。" 
      },
      lowTier: { 
        content: `（后端AI生成）闭嘴吧你！就你话多，大早上的别在这刷存在感。`, 
        reason: "💡 理由：情绪宣泄，直截了当的厌恶，虽然没技术含量但在气势上不输。" 
      }
    };
    res.json(results);
  }, 1500);
});

// 3. Community Endpoints
app.get('/api/posts', (req, res) => {
  res.json(mockPosts);
});

app.post('/api/posts', (req, res) => {
  const { author, content, avatar } = req.body;
  const newPost = {
    id: Date.now().toString(),
    author: author || '匿名小助手',
    avatar: avatar || 'account',
    content,
    upvotes: 0,
    time: '刚刚'
  };
  mockPosts.unshift(newPost);
  res.status(201).json(newPost);
});

// Start Server
app.listen(PORT, () => {
  console.log(`\n----------------------------------------`);
  console.log(`🚀 Roast Assistant Server Ready!`);
  console.log(`🔗 Local:   http://localhost:${PORT}`);
  console.log(`🔗 Mock AI Endpoint: POST /api/generate`);
  console.log(`----------------------------------------\n`);
});
