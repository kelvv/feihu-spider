const path = require('path')
const OpenCC = require('opencc')
const GAMER_CONFIG = require('../config/urls').GAMER
const { fileName } = require('../utils/url')
const opencc = new OpenCC('t2s.json')
const listData = []
// 爬取文章的文章ID
const testId = '182237'

// 解析列表
const listParser = (error, res, done) => {
  return new Promise(resolve => {
    if (error) {
      console.log(error)
    } else {
      const $ = res.$
      const newsItems = $('.BH-lbox.GN-lbox2').children()
      for (let i = 0; i < newsItems.length; i++) {
        const newsItem = newsItems[i]
        if ($(newsItem).hasClass('GN-lbox2B')) {
          const imgSrc = $(newsItem).find('.GN-lbox2E img').attr('src')
          const articleHref = `https:${$(newsItem).find('.GN-lbox2E a').attr('href')}`
          const articleId = fileName(articleHref)
          if (articleId === testId) {
            listData.push({
              href: articleHref,
              data: {
                thumbnail: [imgSrc],
                title: opencc.convertSync($(newsItem).find('h1 a').text()),
                type: 2,
                source: GAMER_CONFIG.SOURCE
              }
            })
          }
        } else if ($(newsItem).hasClass('GN-lbox2F')) {
          const articleHref = `https:${$(newsItem).find('a').attr('href')}`
          const articleId = fileName(articleHref)
          if (articleId === testId) {
            listData.push({
              href: articleHref,
              data: {
                thumbnail: [],
                title: opencc.convertSync($(newsItem).find('a').text()),
                type: 1,
                source: GAMER_CONFIG.SOURCE
              }
            })
          }
        }
      }
      resolve(listData)
    }
    done()
  })
}

module.exports = {
  listParser
}
