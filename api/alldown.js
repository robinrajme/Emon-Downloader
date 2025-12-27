import nayan from "nayan-media-downloaders";
import fetch from "node-fetch";

export default async function handler(req, res) {
  const videoUrl = req.query.url;
  if (!videoUrl)
    return res.status(400).json({ error: "No URL provided" });

  try {
    const result = await nayan.alldown(videoUrl);
    if (!result?.data?.high)
      return res.status(404).json({ error: "No video" });

    const videoRes = await fetch(result.data.high);

    res.setHeader(
      "Content-Disposition",
      'attachment; filename="EMon-BHai.mp4"'
    );
    res.setHeader("Content-Type", "video/mp4");

    videoRes.body.pipe(res);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
