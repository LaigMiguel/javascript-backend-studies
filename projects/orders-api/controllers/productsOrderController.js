const productsOrderService = require('../services/productsOrderService')

async function postProductsOrder(req, res, next) {
  try {
    const { order_id, product_id, quantity } = req.body || {}
    const productOrder = await productsOrderService.postProductOrder(
      order_id,
      product_id,
      quantity,
    )
    return res.status(201).json(productOrder)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProductsOrder,
}
