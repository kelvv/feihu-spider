/*
 * 创建MongoDB实例
 */
const MongoClient = require('mongodb').MongoClient
const { MONGO_URL } = require('../config/mongo')

const createClient = () => {
  return new Promise((resolve) => {
    MongoClient.connect(MONGO_URL, { useNewUrlParser: true }, (err, client) => {
      if (err) {
        throw err
      } else {
        resolve(client)
      }
    })
  })
}

module.exports = {
  createClient
}
