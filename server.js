const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));

const PORT = process.env.PORT || 3001;

// basit hafıza içi feed
const feed = [];

// basit içerik üretici
function generatePost(topic = "crypto") {
  const templates = [
    `Breaking: ${topic} ecosystem is heating up faster than expected.`,
    `New signal detected in ${topic}: rising activity, fresh builders, more attention.`,
    `${topic.toUpperCase()} watch: early momentum is building quietly.`,
    `AI summary: ${topic} is showing strong social and builder interest today.`,
    `Narrative update: ${topic} may become one of the most watched sectors soon.`,
    `Builder note: if you're early in ${topic}, distribution and community matter most.`,
  ];

  const randomText = templates[Math.floor(Math.random() * templates.length)];
  const now = new Date().toISOString();

  return {
    id: Date.now().toString(),
    topic,
    text: randomText,
    createdAt: now,
    source: "ai-generator",
    storage: {
      provider: "local-demo",
      uri: null
    }
  };
}

// health
app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "shelby-ai-social-feed",
    message: "API is running"
  });
});

// feed listele
app.get("/feed", (req, res) => {
  res.json({
    ok: true,
    count: feed.length,
    items: feed
  });
});

// AI post üret ve feed'e ekle
app.post("/generate", (req, res) => {
  try {
    const { topic } = req.body || {};
    const post = generatePost(topic || "crypto");
    feed.unshift(post);

    res.json({
      ok: true,
      message: "Post generated successfully",
      item: post
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});

// manuel upload benzeri endpoint
app.post("/upload", (req, res) => {
  try {
    const { text, topic, fileUrl } = req.body || {};

    if (!text) {
      return res.status(400).json({
        ok: false,
        error: "text is required"
      });
    }

    const item = {
      id: Date.now().toString(),
      topic: topic || "general",
      text,
      createdAt: new Date().toISOString(),
      source: "manual-upload",
      storage: {
        provider: "local-demo",
        uri: fileUrl || null
      }
    };

    feed.unshift(item);

    res.json({
      ok: true,
      message: "Content uploaded successfully",
      item
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      error: err.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Shelby feed API running on port ${PORT}`);
});
