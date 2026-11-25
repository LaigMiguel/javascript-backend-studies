const db = require('../database/database')

function postAccount(login, password) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO accounts(login, password) VALUES(?,?)',
      [login, password],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        const account = {
          id: this.lastID,
          login,
        }
        resolve(account)
      },
    )
  })
}

module.exports = {
  postAccount,
}
