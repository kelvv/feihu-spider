const path = require('path')
const fs = require('fs')
const images = require('images')
const stream = require('stream')
const { fileExtName } = require('./url')
const { mkdirSync } = require('./fsutils')

// 下载图片至本地
const downloadImg = (c, href, id, index, data) => {
  return new Promise(resolve => {
    c.queue({
      uri: href,
      encoding: null,
      jQuery: false,
      callback: (error, res, done) => {
        if (error) {
          console.log(error)
        } else {
          const imgName = fileExtName(href)
          const filePath = path.join(__dirname, `../dist/${id}`)
          mkdirSync(filePath, () => {
            const writer = fs.createWriteStream(`${filePath}/${imgName}`)
            const bufferStream = new stream.PassThrough()
            writer.on('finish', () => {
              const image = images(`${filePath}/${imgName}`)
              data.width = image.width()
              data.height = image.height()
              resolve({
                index: index,
                data: data
              })
            })
            bufferStream.end(res.body)
            bufferStream.pipe(writer)
          })
        }
        done()
      }
    })
  })
}

module.exports = {
  downloadImg
}
