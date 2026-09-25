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

function getClients() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM clients', (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

function getClientByIdOrThrow(id) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM clients WHERE clients.id = ?', [id], (error, row) => {
      if (error) {
        reject(error)
        return
      }
      resolve(row)
    })
  })
}

function updateClient(newName, id) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE clients SET name = ? WHERE clients.id = ?',
      [newName, id],
      (error) => {
        if (error) {
          reject(error)
          return
        }
        resolve()
      },
    )
  })
}

function deleteClient(id) {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM clients WHERE clients.id = ?', [id], function (error) {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

module.exports = {
  postClient,
  getClients,
  getClientByIdOrThrow,
  updateClient,
  deleteClient,
}
