const axios = require('axios');

exports.getYouTubeVideo = async (req, res) => {
  const { phoneName } = req.query;
  const API_KEY = process.env.YOUTUBE_API_KEY;
  const query = `${phoneName} Review`;

  try {
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&key=${API_KEY}&type=video&maxResults=1`);
    const videoId = response.data.items[0].id.videoId;
    res.status(200).send({ videoUrl: `https://www.youtube.com/embed/${videoId}` });
  } catch (error) {
    res.status(500).send("Error fetching YouTube video");
  }
};