const { putHotKeywords } = require('./utils/http')
const { data } = require('./config/hotwords')

putHotKeywords(data).then(response => {
  console.log(response.data)
})
