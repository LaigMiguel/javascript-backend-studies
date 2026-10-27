const db = require('../database/database')

function postProductOrder(order_id, product_id, quantity, product_price) {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO products_order(order_id, product_id, quantity, product_price) VALUES (?,?,?,?)`,
      [order_id, product_id, quantity, product_price],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        const newProductOrder = {
          order_id,
          product_id,
          quantity,
          product_price,
        }
        resolve(newProductOrder)
      },
    )
  })
}

function searchOrderIdAndProductId(order_id, product_id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM products_order WHERE order_id = ? AND product_id = ?`,
      [order_id, product_id],
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

function updateProductOrderQuantity(order_id, product_id, quantity) {
  return new Promise((resolve, reject) => {
    db.run(
      `UPDATE products_order SET quantity = ? WHERE order_id = ? AND product_id = ? `,
      [quantity, order_id, product_id],
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

function getProductOrders() {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM products_order`, (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

function getProductOrderByOrderId(order_id) {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT * FROM products_order WHERE order_id = ?`,
      [order_id],
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
  postProductOrder,
  searchOrderIdAndProductId,
  updateProductOrderQuantity,
  getProductOrders,
  getProductOrderByOrderId,
}
