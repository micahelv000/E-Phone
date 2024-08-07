const express = require('express');
const { getYouTubeVideo } = require('../controllers/videoController');

const router = express.Router();

router.get('/youtube-video', getYouTubeVideo);

module.exports = router;