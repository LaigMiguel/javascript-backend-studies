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
    db.run('INSERT INTO users (name) VALUES(?)', [name], function (error) {
      if (error) {
        reject(error)
        return
      }

      const newCustomer = {
        id: this.lastID,
        name,
      }
      resolve(newCustomer)
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

function deleteCustomer(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM users WHERE id = ?', [id], (error) => {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

function postNewPhone(phone, id) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO phones (customer_id, phone) VALUES (?, ?)',
      [id, phone],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        const newPhone = {
          customer_id: id,
          id: this.lastID,
          phone,
        }
        resolve(newPhone)
      },
    )
  })
}

function getPhonesByCustomerId(id) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT * FROM phones WHERE customer_id = ?',
      [id],
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

function deletePhoneFromCustomer(customerId, phoneId) {
  return new Promise((resolve, reject) => {
    db.run(
      'DELETE FROM phones WHERE customer_id = ? AND id = ?',
      [customerId, phoneId],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        resolve(this.changes)
      },
    )
  })
}

module.exports = {
  postNewCustomer,
  getCustomers,
  getCustomersById,
  getCustomersByQueryParam,
  updateCustomer,
  deleteCustomer,
  postNewPhone,
  getPhonesByCustomerId,
  deletePhoneFromCustomer,
}
