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

// --- Personas Database ---
const personas = {
  empress: { name: "【甄嬛模式】", style: "高冷、优雅、阴阳怪气" },
  nerd: { name: "【理科模式】", style: "逻辑缜密、数据说话、降智打击" },
  worker: { name: "【打工人模式】", style: "看透世俗、摆烂反击、利益至上" },
  savage: { name: "【毒舌模式】", style: "火力全开、不带脏字、快准狠" }
};

// --- Mock Data ---
let mockPosts = [
  { id: 1, author: '秃头小宝贝', avatar: 'face-man', content: '（来自后端）老板问我为什么迟到，我说我梦见在加班，不小心睡过了。', upvotes: 12580, time: '2小时前' },
  { id: 2, author: '打工魂', avatar: 'face-woman', content: '（来自后端）老板在群里说：大家要把公司当家。我回：好的爸爸，那零花钱什么时候发？', upvotes: 9852, time: '3小时前' }
];

// --- Routes ---

app.get('/', (req, res) => {
  res.send('Roast Assistant Ultra-Backend is running! 🚀 Image AI Ready.');
});

// Mock OCR Endpoint for Screenshot Recognition
app.post('/api/ocr', (req, res) => {
  const { imageUri } = req.body;
  console.log(`收到图片请求: ${imageUri ? '已上传' : '无数据'}`);

  // Simulate OCR Analysis Delay
  setTimeout(() => {
    // Random mock chat contexts
    const scenarios = [
      "老板说：‘小黄，今晚那个报告如果不发给我，明天你就别来上班了。’",
      "前任发来：‘其实我还是觉得你人挺好的，就是我们性格不太合。’",
      "杠精评论：‘虽然你写得很有道理，但我还是觉得你逻辑有问题，纯属浪费时间。’",
      "妈妈发来：‘隔壁王阿姨家儿子都买房了，你打算什么时候带人回来？’"
    ];
    const randomIndex = Math.floor(Math.random() * scenarios.length);
    const mockText = scenarios[randomIndex];

    res.json({
      success: true,
      text: mockText,
      analysis: "🛡️ 监测到对方正在进行‘道德绑架’或‘职场压榨’，建议开启‘毒舌模式’或‘打工人模式’进行反击。",
      confidence: 0.98
    });
  }, 2000);
});

// Advanced Generation Endpoint
app.post('/api/generate', (req, res) => {
  const { text, intensity, persona, mode } = req.body;
  console.log(`执行任务 [${mode}] | 人格: ${persona} | 强度: ${intensity} | 内容: ${text}`);

  setTimeout(() => {
    if (mode === 'protect') {
      const result = {
        title: "🛡️ 心态防火墙已激活",
        content: `针对对方说的“${text}”，我的深度分析是：对方之所以这么说，是因为他自己内心极其匮乏，通过贬低你来寻找存在感。这在心理学上叫‘投射效应’。`,
        analysis: `🔍 对方痛点：无能狂怒\n💡 建议：保持微笑，就是对他这种低级攻击最大的降维打击。`,
        isProtect: true
      };
      return res.json(result);
    }

    const pName = personas[persona]?.name || "【通用模式】";
    const intensityLabel = intensity >= 100 ? "🔥 爆破" : (intensity >= 60 ? "⚡ 犀利" : "💡 优雅");

    const results = {
      highTier: { 
        content: `（${pName} · ${intensityLabel}）其实关于“${text}”，我觉得与其在言语上争个高下，不如多读几本书提升一下您的认知局限，毕竟认知差距是可以通过阅读弥补的。`, 
        reason: "💡 理由：降维打击，从认知深度直接摧毁对方的逻辑基础。" 
      },
      midTier: { 
        content: `（${pName}）啊对对对，既然你这么懂，那笔给你，你来写？既然您这么有远见，怎么还没上天呢？`, 
        reason: "💡 理由：霸气侧漏，用极度敷衍的态度消磨对方斗志。" 
      },
      lowTier: { 
        content: `（${pName}）闭嘴吧你！就你话多，听见你说话我这尴尬感都快从屏幕溢出来了。`, 
        reason: "💡 理由：情绪压制，简单直接但有效。" 
      }
    };
    res.json(results);
  }, 1500);
});

// Community Endpoints
app.get('/api/posts', (req, res) => {
  res.json(mockPosts);
});

app.post('/api/posts', (req, res) => {
  const { author, content, avatar } = req.body;
  const newPost = { id: Date.now().toString(), author: author || '匿名英雄', avatar: avatar || 'account', content, upvotes: 0, time: '刚刚' };
  mockPosts.unshift(newPost);
  res.status(201).json(newPost);
});

app.listen(PORT, () => {
  console.log(`\n----------------------------------------`);
  console.log(`🚀 Roast Assistant Ultra-Backend Ready!`);
  console.log(`🔗 Listening on port ${PORT}`);
  console.log(`----------------------------------------\n`);
});
