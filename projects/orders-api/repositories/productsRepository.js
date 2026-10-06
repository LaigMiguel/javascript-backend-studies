const db = require('../database/database')

function postProduct(name, stockQuantity, price) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO product(name, stock_quantity, price) VALUES (?, ?, ?)`,
      [name, stockQuantity, price],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        const newProduct = {
          id: this.lastID,
          name,
          stock_quantity: stockQuantity,
          price,
        }
        resolve(newProduct)
      },
    )
  })
}

function getProducts() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM product`, (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

module.exports = {
  postProduct,
  getProducts,
}
