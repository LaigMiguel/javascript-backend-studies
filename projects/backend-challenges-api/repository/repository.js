const db = require('../database/database')

function getCustomers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

function getCustomersByQueryParam(name) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM users WHERE LOWER(name) LIKE LOWER(?)',
      [`%${name}%`],
      (error, rows) => {
        if (error) {
          reject(error)
          return
        }
        resolve(rows)
      },
    )
  })
}

function getCustomersById(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE id = ?', [id], (error, row) => {
      if (error) {
        reject(error)
        return
      }
      resolve(row)
    })
  })
}

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

function updateCustomer(name, id) {
  return new Promise((resolve, reject) => {
    db.run('UPDATE users SET name = ? WHERE id = ?', [name, id], (error) => {
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
  getCustomers,
  getCustomersById,
  getCustomersByQueryParam,
  updateCustomer,
}
