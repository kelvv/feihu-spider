const { putUpdate } = require('./utils/http')
const { data } = require('./config/update')

putUpdate(data).then(response => {
  console.log(response.data)
})
