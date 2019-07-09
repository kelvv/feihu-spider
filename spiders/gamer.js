const Crawler = require('crawler')
const chalk = require('chalk')
const GAMER_CONFIG = require('../config/urls').GAMER
// 测试文章列表解析器，解析单条文章
// const { listParser } = require('../test/list')
// 文章列表解析器
const { listParser } = require('../gamer/list')
// 文章解析
const { articleParser } = require('../gamer/article')
// 文章上传接口
const { postArticle } = require('../utils/http')
const { DEV_DB_NAME, GAMER_ID } = require('../config/mongo')
const { createClient } = require('../mongo/client')
const { insertDocuments } = require('../mongo/utils')
const { fileName } = require('../utils/url')
const mongoDB = { client: null, db: null }
const articlePromise = []

// 解析文章列表
const handleGamer = (error, res, done) => {
  listParser(error, res, done, mongoDB.db)
    .then(data => {
      startSpiderArticle(data)
    })
}

// 解析文章 上传数据 保存文章ID至本地MongoDB
const handleArticle = (data, i) => {
  return new Promise(resolve => {
    const articleId = fileName(data[i].href)
    articleParser(c, data[i].href, data[i].data)
      .then(data => {
        if (data) {
          postArticle(data)
            .then(data => {
              if (data.data.code === 0) {
                insertDocuments(mongoDB.db, GAMER_ID, [{
                  id: articleId
                }])
                  .then(() => {
                    console.log(chalk.green(articleId))
                    resolve()
                  })
              }
            })
        } else {
          resolve()
        }
      })
  })
}

const startSpiderArticle = (data) => {
  for (let i = 0; i < data.length; i++) {
    articlePromise.push(handleArticle(data, i))
  }
  Promise.all(articlePromise)
    .then(() => {
      mongoDB.client && mongoDB.client.close()
    })
}

const c = new Crawler({
  maxConnections: 10,
  callback: handleGamer
})

createClient()
  .then((client) => {
    mongoDB.client = client
    mongoDB.db = client.db(DEV_DB_NAME)
    c.queue(GAMER_CONFIG.ENTRY_URL)
  })
