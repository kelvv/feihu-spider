const path = require('path')
const ytdl = require('youtube-dl')
const { mkdirSync } = require('../fsutils')
const distDir = path.join(__dirname, '../../dist')

/*
 * YouTube视频下载
 * mp4[height<=1080] mp4格式分辨率小于等于1080p
 * 支持的参数有mp4[height<=720] mp4[height<=480]
 */
const downloadBestVideo = (url, cwd) => {
  return new Promise(resolve => {
    ytdl.exec(url, ['-f', 'mp4[height<=1080]'], { cwd: cwd }, (error, output) => {
      if (error) { throw error }
      resolve(output)
    })
  })
}

// 下载视频封面
const downloadThumbs = (url, cwd) => {
  const options = {
    all: false,
    cwd: cwd
  }
  return new Promise(resolve => {
    ytdl.getThumbs(url, options, (error, files) => {
      if (error) { throw error }
      resolve(files)
    })
  })
}

// 获取视频信息 标题、作者、视频时长等信息
const getVideoInfo = (url) => {
  return new Promise(resolve => {
    ytdl.getInfo(url, [], (err, info) => {
      if (err) { throw err }
      resolve(info)
    })
  })
}

const downloadYoutubeVideo = (href, id) => {
  return new Promise(resolve => {
    const videoPromise = []
    const cwd = `${distDir}/${id}`
    mkdirSync(cwd, () => {
      videoPromise.push(downloadBestVideo(href, cwd))
      videoPromise.push(downloadThumbs(href, cwd))
      videoPromise.push(getVideoInfo(href))
      Promise.all(videoPromise)
        .then(data => {
          resolve({
            imgPath: `${cwd}/${data[1][0]}`, // 视频封面地址
            videoPath: `${cwd}/${data[0][2].split('Destination:')[1].trim()}`, // 视频地址
            title: data[2].title
          })
        })
    })
  })
}

module.exports = {
  downloadBestVideo,
  downloadThumbs,
  getVideoInfo,
  downloadYoutubeVideo
}
