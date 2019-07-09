const { postPinned } = require('./utils/http')
const { data } = require('./config/pinned')

postPinned(data.id, {
  pinned: data.pinned
}).then(response => {
  console.log(response.data)
})
