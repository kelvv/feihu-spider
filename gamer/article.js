const chalk = require('chalk')
// 预处理文章数据
const { findContentItems, getCreateTime } = require('./utils/article')
// 繁转简 图片宽高获取
const { tw2Cn, findWidthAndHeight } = require('../utils/utils')
const { CLASS_2_TAG } = require('../config/class2tag')
const GAMER_CONFIG = require('../config/urls').GAMER

// 文章解析
const articleParser = (c, href, listData) => {
  return new Promise(resolve => {
    c.queue({
      uri: href,
      callback: (error, res, done) => {
        if (error) {
          console.log(error)
        } else {
          try {
            const $ = res.$
            const articleTags = new Set()
            const articleCreate = getCreateTime($)
            const articleContents = []
            const imgList = []
            const contentItems = findContentItems($)
            const tagsImg = $('.GN-lbox3A img').length ? $('.GN-lbox3A img') : $('h1 img')

            // 获取文章tags
            tagsImg.each((index, item) => {
              const imgClass = $(item).attr('class').trim().toUpperCase()
              const tag = CLASS_2_TAG[imgClass]
              if (tag) {
                articleTags.add(tag)
                if (tag === 1 || tag === 2 || tag === 3) {
                  articleTags.add(4)
                }
                if (tag === 5 || tag === 6) {
                  articleTags.add(7)
                }
              }
            })

            // 内容处理
            for (let i = 0; i < contentItems.length; i++) {
              const contentItem = $(contentItems[i])
              if (contentItem.find('iframe').length) { // 视频
              } else if (contentItem.find('img').length) { // 图片
                const imgItems = contentItem.find('img')
                imgItems.each((index, item) => {
                  const imgSrc = $(item).attr('data-src')
                  if (imgSrc) {
                    const widthAndHeight = findWidthAndHeight($(item).attr('style'))
                    let imgDesc = ''
                    if (
                      $(item).next('.pic-desc')
                      && $(item).next('.pic-desc').length
                    ) {
                      imgDesc = $(item).next('.pic-desc').text().trim()
                    }
                    articleContents.push({
                      type: 'img',
                      src: imgSrc,
                      desc: tw2Cn(imgDesc),
                      width: widthAndHeight.width,
                      height: widthAndHeight.height
                    })
                    imgList.push(imgSrc)
                  }
                })
              } else if (
                contentItem.prop('tagName').toUpperCase() === 'H1'
                || contentItem.prop('tagName').toUpperCase() === 'H2'
                || contentItem.prop('tagName').toUpperCase() === 'H3'
                || contentItem.prop('tagName').toUpperCase() === 'H4'
                || contentItem.prop('tagName').toUpperCase() === 'H5'
                || contentItem.prop('tagName').toUpperCase() === 'H6'
              ) { // 标题
                const contentText = contentItem.text().trim()
                if (contentText) {
                  articleContents.push({
                    type: 'title',
                    content: [tw2Cn(contentText)]
                  })
                }
              } else if (
                contentItem.prop('tagName').toUpperCase() === 'OL'
                || contentItem.prop('tagName').toUpperCase() === 'UL'
              ) { // 多行内容
                const lis = contentItem.find('li')
                const liContents = []
                lis.each((index, item) => {
                  const liText = $(item).text().trim()
                  if (liText) {
                    liContents.push(tw2Cn(liText))
                  }
                })
                articleContents.push({
                  type: 'text',
                  content: liContents
                })
              } else { // 内容
                const contentText = contentItem.text().trim()
                if (contentText) {
                  articleContents.push({
                    type: 'text',
                    content: [tw2Cn(contentText)]
                  })
                }
              }
            }
            listData.content = JSON.stringify(articleContents)
            listData.thumbnail = JSON.stringify(listData.thumbnail)
            listData.publishedAt = articleCreate
            listData.images = imgList
            listData.authorId = GAMER_CONFIG.ID
            listData.tagIds = Array.from(articleTags)
            resolve(listData)
          } catch (error) {
            console.log(chalk.red(href))
            resolve(null)
          }
        }
        done()
      }
    })
  })
}

module.exports = {
  articleParser
}
