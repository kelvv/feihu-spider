/*
 * 文章上传
 */
const axios = require('axios')
const { BASE_URL, AUTHORIZATION } = require('../config/http')
const { POST_ARTICLE } = require('../config/api')

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common['x-feihu-token'] = AUTHORIZATION

const postArticle = (data) => {
  return axios.post(POST_ARTICLE, data)
}

module.exports = {
  postArticle
}
