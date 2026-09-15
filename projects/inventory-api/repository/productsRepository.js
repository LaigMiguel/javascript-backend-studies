const db = require('../database/database')

function postProduct(name, numericPrice, numericCategoryId, numericQuantity) {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO products(name, price, category_id, quantity) VALUES (?, ?, ?, ?)',
      [name, numericPrice, numericCategoryId, numericQuantity],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        const newProduct = {
          id: this.lastID,
          name,
          price: numericPrice,
          categoryId: numericCategoryId,
          quantity: numericQuantity,
        }
        resolve(newProduct)
      },
    )
  })
}

function getAllProducts() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products`, (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

function getProductById(id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM products WHERE products.id = ?`,
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
  postProduct,
  getAllProducts,
  getProductById,
}
