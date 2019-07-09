/*
 * MongoDB 配置文件
 * 单条数据结构如下
 * { '_id': ObjectId('5cd2a5364cd574344534ce44'), 'id': '179188' }
 * id为文章ID，获取的是源站的文章ID
 */
const MONGO_URL = 'mongodb://120.79.214.170:27017'
const DEV_DB_NAME = 'feihu_dev' // 测试环境库
// const DEV_DB_NAME = 'feihu' // 线上环境库
const PRODUCTION_DB_NAME = 'feihu'
const GAMER_ID = 'gamer_id'

module.exports = {
  MONGO_URL,
  DEV_DB_NAME,
  PRODUCTION_DB_NAME,
  GAMER_ID
}
