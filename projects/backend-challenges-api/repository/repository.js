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

function getPhonesAndCustomerName() {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT phones.id, phones.phone, users.name FROM phones JOIN users ON phones.customer_id = users.id',
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

function getPhoneByNumber(phoneNumber) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT phone FROM phones WHERE phone LIKE(?)',
      [`%${phoneNumber}%`],
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

function updatePhone(newPhone, phoneId, customerId) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE phones SET phone = ? WHERE phones.id = ? AND phones.customer_id = ?',
      [newPhone, customerId, phoneId],
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

function getCustomerWithPhones(cutomerId) {
  return new Promise((resolve, reject) => {
    db.all(
      'SELECT users.id AS customer_id, users.name, phones.id AS phone_id, phones.phone FROM users LEFT JOIN phones ON phones.customer_id = users.id WHERE users.id = ?',
      [cutomerId],
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
  getPhonesAndCustomerName,
  getPhoneByNumber,
  updatePhone,
  getCustomerWithPhones,
}
