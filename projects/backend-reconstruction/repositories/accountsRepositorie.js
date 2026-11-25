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

function getAccountById(id) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, login FROM accounts WHERE id = ?',
      [id],
      (error, row) => {
        if (error) {
          reject(error)
          return
        }
        resolve(row)
      },
    )
  })
}

function getAccountByLogin(login) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, login FROM accounts WHERE login = ?',
      [login],
      (error, row) => {
        if (error) {
          reject(error)
          return
        }
        resolve(row)
      },
    )
  })
}

function getAccountCredentialsByLogin(login) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, login, password FROM accounts WHERE login = ?',
      [login],
      (error, row) => {
        if (error) {
          reject(error)
          return
        }
        resolve(row)
      },
    )
  })
}
module.exports = {
  postAccount,
  getAccountById,
  getAccountByLogin,
  getAccountCredentialsByLogin,
}
