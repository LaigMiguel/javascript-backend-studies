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

module.exports = {
  postProduct,
}
