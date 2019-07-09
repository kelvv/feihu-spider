const { deleteArticle } = require('./utils/http')
const { data } = require('./config/delete')

deleteArticle(data).then(response => {
  console.log(response.data)
})
