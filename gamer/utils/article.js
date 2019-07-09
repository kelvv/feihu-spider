const findContentItems = ($) => {
  const contentsConChildren = []
  let contentsCon = $('.GN-lbox3B')
  // 去除展示时间内容
  contentsCon.children('span:first-child').remove()
  // 去除无用的版权声明
  contentsCon.children('p:last-child').remove()
  contentsCon.children().each((index, item) => {
    removeAllEmpty($, item)
  })
  contentsCon.children().each((index, item) => {
    removeAllDiv($, item, contentsConChildren)
  })
  return contentsConChildren
}

/*
 * 去除所有只有空内容的div
 * <div>&#xA0;</div> 去除文章内所有这样的div
 */
const removeAllEmpty = ($, item) => {
  if (
    !$(item).text().trim()
    && $(item).prop('tagName').toUpperCase() === 'DIV'
  ) {
    if ($(item).html().trim() === '&#xA0;') {
      $(item).remove()
    }
  }
  if ($(item).children().length) {
    $(item).children().each((index, item) => {
      removeAllEmpty($, item)
    })
  }
}

/*
 * 去除文章内所有外层多余的div
 * ========= 去除前 =========
 * <div>
 *   <div>content</div>
 *   <div>content</div>
 *   <ul>......</ul>
 * </div>
 * ========= 去除后 =========
 * <div>content</div>
 * <div>content</div>
 * <ul>......</ul>
 */
const removeAllDiv = ($, item, array) => {
  if (
    !$(item).attr('style')
    && !$(item).attr('class')
    && $(item).children().length
    && $($(item).children()[0]).prop
    && $($(item).children()[0]).prop('tagName')
    && $($(item).children()[0]).prop('tagName').toUpperCase() === 'DIV'
    && !$($(item).children()[0]).attr('style')
    && !$($(item).children()[0]).attr('class')
  ) {
    $(item).children().each((index, item) => {
      removeAllDiv($, item, array)
    })
  } else {
    array.push(item)
  }
}

const doubleNumber = (number) => {
  return number < 10 ? `0${number}` : number
}

// 格式化时间
const formatTime = (time) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${year}-${doubleNumber(month)}-${doubleNumber(day)} ${doubleNumber(hour)}:${doubleNumber(minute)}:${doubleNumber(second)}`
}

// 获取文章创建时间
const getCreateTime = ($) => {
  const articleCreateText = $('.GN-lbox3C').text() || $('.GN-lbox3CA').text()
  const articleCreateString = articleCreateText.split('）')[1].trim().slice(0, 19)
  const articleCreate = formatTime(new Date(articleCreateString).getTime())
  return articleCreate
}

module.exports = {
  findContentItems,
  getCreateTime
}
