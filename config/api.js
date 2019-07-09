/*
 * 后端接口api的path
 * POST_ARTICLE => 创建文章接口，与爬虫有关，其余为后台管理接口，与爬虫无关
 */
const PUT_UPDATE = 'feihu/api/user/update'
const POST_ARTICLE = 'feihu/api/article/create'
const DELETE_ARTICLE = 'feihu/api/article/delete'
const PUT_TAGS = 'feihu/api/article/tags'
const PUT_HOT_KEYWORDS = 'feihu/api/article/hot-keywords'
const POST_PINNED = 'feihu/api/article/pinned'

module.exports = {
  PUT_UPDATE,
  POST_ARTICLE,
  DELETE_ARTICLE,
  PUT_TAGS,
  PUT_HOT_KEYWORDS,
  POST_PINNED
}
