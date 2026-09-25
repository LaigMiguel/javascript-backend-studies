const db = require('../database/database')

function postClient(name) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO clients(name) VALUES (?)', [name], function (error) {
      if (error) {
        reject(error)
        return
      }
      const newClient = {
        id: this.lastID,
        name,
      }
      resolve(newClient)
    })
  })
}

module.exports = {
  postClient,
}
