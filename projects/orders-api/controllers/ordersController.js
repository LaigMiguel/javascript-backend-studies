const ordersService = require('../services/ordersService')

async function postOrder(req, res, next) {
  try {
    const id = Number(req.params.id)
    const newOrder = await ordersService.postOrder(id)
    return res.status(201).json(newOrder)
  } catch (error) {
    next(error)
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await ordersService.getOrders()
    return res.status(200).json(orders)
  } catch (error) {
    next(error)
  }
}

async function getOrderById(req, res, next) {
  try {
    const id = Number(req.params.id)
    const order = await ordersService.getOrderByIdOrThrow(id)
    return res.status(200).json(order)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postOrder,
  getOrders,
  getOrderById,
}
