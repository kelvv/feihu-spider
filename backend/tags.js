const { putTags } = require('./utils/http')
const { data } = require('./config/tags')

putTags(data).then(response => {
  console.log(response.data)
})
