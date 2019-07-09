const { downloadYoutubeVideo } = require('./video/youtube')
const { uploadVod } = require('./vod')

// 下载YouTube视频至本地，上传视频至腾讯云
const dealYoutubeVideo = (src, id, index, vdata) => {
  return new Promise(resolve => {
    downloadYoutubeVideo(src, id)
      .then(youtube => {
        const options = {
          MediaFilePath: youtube.videoPath,
          CoverFilePath: youtube.imgPath
        }
        uploadVod(options)
          .then(({ err, data }) => {
            if (err) { throw err }
            vdata.src = data.MediaUrl
            vdata.cover = data.CoverUrl
            vdata.title = youtube.title
            resolve({
              index: index,
              data: vdata
            })
          })
      })
  })
}

module.exports = {
  dealYoutubeVideo
}
