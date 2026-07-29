const db = require('../database/database')

function getUsers() {
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
function getUsersCount() {
  return new Promise((resolve, reject) => {
    db.get('SELECT COUNT(*) AS count FROM users', (error, row) => {
      if (error) {
        reject(error)
        return
      }
      resolve(row.count)
    })
  })
}
function getUsersNames() {
  return new Promise((resolve, reject) => {
    db.all('SELECT name FROM users', (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

function getUserById(id) {
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

function createUser(name) {
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

function getUserByName(name) {
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

function getUsersSortedByName() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users ORDER BY name', (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

function updateUser(id, name) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE users SET name = ? WHERE id = ?',
      [name, id],
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

function deleteUserById(id) {
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

module.exports = {
  getUsers,
  getUsersCount,
  getUsersNames,
  getUserById,
  createUser,
  getUserByName,
  getUsersSortedByName,
  updateUser,
  deleteUserById,
}
