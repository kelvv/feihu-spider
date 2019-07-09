const fs = require('fs')

// https://juejin.im/post/5ab32b20518825557f00d36c 异步创建文件夹
const mkdirSync = (dir, cb) => {
  let paths = dir.split('/')
  let index = 1
  const next = (index) => {
    if (index > paths.length) {
      return cb()
    }
    let newPath = paths.slice(0, index).join('/')
    fs.access(newPath, (err) => {
      if (err) {
        fs.mkdir(newPath, (err) => {
          next(index + 1)
        })
      } else {
        next(index + 1)
      }
    })
  }
  next(index)
}

// https://itbilu.com/nodejs/core/41cswxaTx.html 文件的复制
const copyFile = (src, dist) => {
  fs.writeFileSync(dist, fs.readFileSync(src))
}

module.exports = {
  mkdirSync: mkdirSync,
  copyFile: copyFile
}
