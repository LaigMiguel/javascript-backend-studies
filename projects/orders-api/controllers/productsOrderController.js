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

async function getProductOrders(req, res, next) {
  try {
    const productOrders = await productsOrderService.getProductOrders()
    return res.status(200).json(productOrders)
  } catch (error) {
    next(error)
  }
}

async function getProductOrderByOrderId(req, res, next) {
  try {
    const id = Number(req.params.id)
    const productOrders =
      await productsOrderService.getProductOrderByOrderIdOrThrow(id)
    return res.status(200).json(productOrders)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProductsOrder,
  getProductOrders,
  getProductOrderByOrderId,
}
