const db = require('../database/database')

function postOrder(clientId) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO orders(client_id) VALUES (?)`,
      [clientId],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        const newOrder = {
          id: this.lastID,
          clientId,
          status: 'Pending',
        }
        resolve(newOrder)
      },
    )
  })
}

function getOrders() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM orders', (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

module.exports = {
  postOrder,
  getOrders,
}
