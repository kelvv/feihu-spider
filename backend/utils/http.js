const axios = require('axios')
const { BASE_URL, AUTHORIZATION } = require('../../config/http')
const {
  PUT_UPDATE,
  DELETE_ARTICLE,
  PUT_TAGS,
  PUT_HOT_KEYWORDS,
  POST_PINNED
} = require('../../config/api')

axios.defaults.baseURL = BASE_URL
axios.defaults.headers.common['x-feihu-token'] = AUTHORIZATION

const putUpdate = (data) => {
  return axios.put(PUT_UPDATE, data)
}
const deleteArticle = (data) => {
  return axios.delete(`${DELETE_ARTICLE}/${data.id}`)
}
const putTags = (data) => {
  return axios.put(PUT_TAGS, data)
}
const putHotKeywords = (data) => {
  return axios.put(PUT_HOT_KEYWORDS, data)
}
const postPinned = (id, data) => {
  return axios.post(`${POST_PINNED}/${id}`, data)
}

module.exports = {
  putUpdate,
  deleteArticle,
  putTags,
  putHotKeywords,
  postPinned
}
