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

function updateStockQuantity(id, quantity, type) {
  return new Promise((resolve, reject) => {
    const operator = type === 'entry' ? '+' : '-'
    const stockCondition = type === 'exit' ? 'AND stock_quantity >= ?' : ''
    const params = type === 'exit' ? [quantity, id, quantity] : [quantity, id]
    db.run(
      `
      UPDATE product SET stock_quantity = stock_quantity ${operator} ? WHERE id = ? ${stockCondition}
      `,
      params,
      function (error) {
        if (error) {
          reject(error)
          return
        }

        if (this.changes === 0) {
          reject(new Error('Product not found or insufficient stock'))
          return
        }
        resolve()
      },
    )
  })
}

module.exports = {
  postProduct,
  getProducts,
  getProductsById,
  updateProduct,
  deleteProduct,
  updateStockQuantity,
}
