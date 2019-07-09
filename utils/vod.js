/*
 * 腾讯云视频上传SDK
 */
const { VodUploadClient, VodUploadRequest } = require('vod-node-sdk')
const { SecretId, SecretKey } = require('../config/vod')

const uploadVod = (options) => {
  return new Promise(resolve => {
    const client = new VodUploadClient(SecretId, SecretKey)
    const req = new VodUploadRequest()
    for (let key in options) {
      req[key] = options[key]
    }
    client.upload('ap-guangzhou', req, (err, data) => {
      resolve({ err, data })
    })
  })
}

module.exports = {
  uploadVod
}
