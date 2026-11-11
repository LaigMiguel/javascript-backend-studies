const db = require('../database/database')
const productsRepository = require('./productsRepository')
const stockMomentRepository = require('./stockMovementsRepository')

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

function getOrdersById(orderId) {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM orders WHERE id = ?', [orderId], (error, row) => {
      if (error) {
        reject(error)
        return
      }
      resolve(row)
    })
  })
}

function updateOrderStatus(order_id, status) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE orders SET status = ? WHERE id = ?',
      [status, order_id],
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

function postOrderConfirmation(order_id, productsOrder) {
  return new Promise((resolve, reject) => {
    db.run('BEGIN TRANSACTION', async (error) => {
      if (error) {
        reject(error)
        return
      }
      try {
        for (const item of productsOrder) {
          await productsRepository.updateStockQuantity(
            item.product_id,
            item.quantity,
            'exit',
          )
          await stockMomentRepository.postStockMovement(
            item.product_id,
            item.quantity,
            'exit',
          )
        }
        const changes = await updateOrderStatus(order_id, 'Confirmed')
        if (changes === 0) {
          db.run('ROLLBACK', (rollbackError) => {
            if (rollbackError) {
              reject(rollbackError)
              return
            }
            resolve(false)
          })
          return
        }

        db.run('COMMIT', (commitError) => {
          if (commitError) {
            db.run('ROLLBACK', (rollbackError) => {
              reject(rollbackError || commitError)
            })
            return
          }
          resolve(true)
        })
      } catch (error) {
        db.run('ROLLBACK', (rollbackError) => {
          reject(rollbackError || error)
        })
      }
    })
  })
}

function postCancelOrder(order_id) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE orders SET status = ? WHERE id = ?',
      ['Canceled', order_id],
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
  postOrder,
  getOrders,
  getOrdersById,
  postOrderConfirmation,
  postCancelOrder,
}
