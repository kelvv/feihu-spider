const path = require('path')
const OpenCC = require('opencc')
const GAMER_CONFIG = require('../config/urls').GAMER
const { fileName } = require('../utils/url')
const { findDocuments } = require('../mongo/utils')
const { GAMER_ID } = require('../config/mongo')
const opencc = new OpenCC('t2s.json')
const listData = []
const listDataPromise = []

const checkAddItem = (db, query, listItem) => {
  return new Promise(resolve => {
    findDocuments(db, GAMER_ID, query)
      .then((docs) => {
        if (docs.length === 0) {
          listData.push(listItem)
        }
        resolve(listData)
      })
  })
}

// 文章列表解析
const listParser = (error, res, done, db) => {
  return new Promise(resolve => {
    if (error) {
      console.log(error)
    } else {
      const $ = res.$
      const newsItems = $('.BH-lbox.GN-lbox2').children()
      for (let i = 0; i < newsItems.length; i++) {
        const newsItem = newsItems[i]
        let listItem = null
        let articleId = ''
        if ($(newsItem).hasClass('GN-lbox2B')) { // 单图模式
          const imgSrc = $(newsItem).find('.GN-lbox2E img').attr('src')
          const articleHref = `https:${$(newsItem).find('.GN-lbox2E a').attr('href')}`
          articleId = fileName(articleHref)
          listItem = {
            href: articleHref,
            data: {
              thumbnail: [imgSrc],
              title: opencc.convertSync($(newsItem).find('h1 a').text()),
              type: 2,
              source: GAMER_CONFIG.SOURCE
            }
          }
        } else if ($(newsItem).hasClass('GN-lbox2F')) { // 无图模式
          const articleHref = `https:${$(newsItem).find('a').attr('href')}`
          articleId = fileName(articleHref)
          listItem = {
            href: articleHref,
            data: {
              thumbnail: [],
              title: opencc.convertSync($(newsItem).find('a').text()),
              type: 1,
              source: GAMER_CONFIG.SOURCE
            }
          }
        }
        if (articleId && listItem) {
          listDataPromise.push(checkAddItem(db, {
            id: articleId
          }, listItem))
        }
      }
      Promise.all(listDataPromise)
        .then(() => {
          resolve(listData)
        })
    }
    done()
  })
}

module.exports = {
  listParser
}
