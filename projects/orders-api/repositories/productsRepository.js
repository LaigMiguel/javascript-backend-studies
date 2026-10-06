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

function getProductsById(id) {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM product WHERE id = ?`, [id], (error, row) => {
      if (error) {
        reject(error)
        return
      }
      resolve(row)
    })
  })
}

function updateProduct(id, name, stockQuantity, price) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE product SET name = ?, stock_quantity = ?, price = ? WHERE product.id = ? `,
      [name, stockQuantity, price, id],
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

function deleteProduct(id) {
  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM product WHERE id = ?`, [id], (error) => {
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}

module.exports = {
  postProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
}
