const path = require('path')

const fileName = (url) => {
  return path.basename(url, path.extname(url))
}

const extName = (url) => {
  return path.extname(url).split('?')[0].trim()
}

const fileExtName = (url) => {
  return `${fileName(url)}${extName(url)}`
}

module.exports = {
  fileName,
  extName,
  fileExtName
}
