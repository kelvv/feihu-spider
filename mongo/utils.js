// 查
const findDocuments = (db, collectionName, query) => {
  return new Promise((resolve) => {
    const collection = db.collection(collectionName)
    collection.find(query).toArray((err, docs) => {
      if (err) {
        throw err
      } else {
        resolve(docs)
      }
    })
  })
}

// 增
const insertDocuments = (db, collectionName, data) => {
  return new Promise((resolve) => {
    const collection = db.collection(collectionName)
    collection.insertMany(data, (err, result) => {
      if (err) {
        throw err
      } else {
        resolve(result)
      }
    })
  })
}

module.exports = {
  findDocuments,
  insertDocuments
}
