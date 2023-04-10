import fetch from "node-fetch";

export default async function handler(req, res) {
  const { podcastId } = req.query;

  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?id=${podcastId}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
}
