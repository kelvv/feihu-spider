const OpenCC = require('opencc')
const opencc = new OpenCC('t2s.json')

// 繁转简
const tw2Cn = (string) => {
  return opencc.convertSync(string)
}

// 获取图片宽度和高度
const findWidthAndHeight = (style) => {
  const widthAndHeightRegExp = /width\D*(\d*).*height\D*([\d\.]*)/ig
  const widthAndHeightArray = widthAndHeightRegExp.exec(style)
  return {
    width: (widthAndHeightArray && widthAndHeightArray[1]) || '',
    height: (widthAndHeightArray && widthAndHeightArray[2]) || ''
  }
}

module.exports = {
  tw2Cn,
  findWidthAndHeight
}
