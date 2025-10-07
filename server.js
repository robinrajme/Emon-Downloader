import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { execSync } from "child_process";

const app = express();
app.use(cors());
app.use(express.static("public")); // for index.html

app.get("/api/alldown", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.json({ error: "No URL provided." });

  try {
    // Auto-install library if missing
    try {
      execSync("npm install nayan-media-downloader@0.1.8 --force", { stdio: "ignore" });
    } catch {}

    const { ttdownloader } = await import("nayan-media-downloader");

    const result = await ttdownloader(videoUrl);
    if (!result || !result.video || !result.video[0])
      return res.json({ error: "No downloadable video found." });

    res.json({
      url: result.video[0].url,
      quality: result.video[0].quality || "HD",
      platform: result.platform || "Unknown"
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
