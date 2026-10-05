const productsService = require('../services/productsService')

async function postProduct(req, res, next) {
  try {
    const { name, stock_quantity, price } = req.body || {}
    const newProduct = await productsService.postProduct(
      name,
      stock_quantity,
      price,
    )
    return res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProduct,
}
