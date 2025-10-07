import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import { execSync } from "child_process";
import nayan  from "nayan-media-downloaders"

const app = express();
app.use(cors());
app.use(express.static("public")); // for index.html

app.get("/alldown", async (req, res) => {
  const videoUrl = req.query.url;
  if (!videoUrl) return res.json({ error: "No URL provided." });

  try {


    const result = await nayan.alldown(videoUrl);
    if (!result || !result.data)
      return res.json({ error: "No downloadable video found." });

    res.json({
      url: result.data.high,
      quality: "HD",
      platform: result.platform || "Unknown"
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
