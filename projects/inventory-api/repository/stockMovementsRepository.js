const db = require('../database/database')

function registerStockMovement(productId, type, quantity) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.run(`BEGIN TRANSACTION`, (error) => {
        if (error) {
          reject(error)
          return
        }

        const operator = type === 'entry' ? '+' : '-'

        db.run(
          `
                UPDATE products 
                SET quantity = quantity ${operator} ?
                WHERE id = ?
              `,
          [quantity, productId],
          (error) => {
            if (error) {
              db.run('ROLLBACK')
              reject(error)
              return
            }
            db.run(
              ` 
                    INSERT INTO stock_movements
                      (product_id, type, quantity, created_at)
                    VALUES (?,?,?,?)
                  `,
              [productId, type, quantity, new Date().toISOString()],
              (error) => {
                if (error) {
                  db.run('ROLLBACK')
                  reject(error)
                  return
                }
                db.run(`COMMIT`, (error) => {
                  if (error) {
                    reject(error)
                    return
                  }
                  resolve()
                })
              },
            )
          },
        )
      })
    })
  })
}

function getStockMovements() {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT stock_movements.*, products.name FROM stock_movements JOIN products ON products.id = stock_movements.product_id`,
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

function getStockMovementsByProductId(productId) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT stock_movements.*, products.name FROM stock_movements 
      JOIN products ON products.id = stock_movements.product_id 
      WHERE stock_movements.product_id = ?`,
      [productId],
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

function getStockMovementById(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT stock_movements.*, products.name FROM stock_movements
      JOIN products ON products.id = stock_movements.product_id
      WHERE stock_movements.id = ?`,
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

module.exports = {
  registerStockMovement,
  getStockMovements,
  getStockMovementsByProductId,
  getStockMovementById,
}
