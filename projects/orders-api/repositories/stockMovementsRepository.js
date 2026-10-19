const db = require('../database/database')

function postStockMovement(product_id, quantity, type) {
  return new Promise((resolve, reject) => {
    db.run(
      `
        INSERT INTO stock_movement
          (product_id, quantity, type, created_at)
        VALUES (?, ?, ?, CURRENT_TIMESTAMP)
      `,
      [product_id, quantity, type],
      function (error) {
        if (error) {
          reject(error)
          return
        }

        resolve(this.lastID)
      },
    )
  })
}

module.exports = {
  postStockMovement,
}
