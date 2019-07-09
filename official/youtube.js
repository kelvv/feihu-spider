const path = require('path')
const { downloadBestVideo, downloadThumbs } = require('../utils/video/youtube')
const distDir = path.join(__dirname, '../dist')
const url = 'https://www.youtube.com/watch?v=6dF8cEGf_Go'

downloadBestVideo(url, distDir)
downloadThumbs(url, distDir)
