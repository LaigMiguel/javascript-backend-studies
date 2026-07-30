const db = require('../database/database')

function postNewCustomer(name) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (name) VALUES(?)', [name], (error) => {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

module.exports = {
  postNewCustomer,
}
