const ordersRepository = require('../repositories/ordersRepository')
const clientsService = require('./clientsService')
const AppError = require('../errors/AppError')

async function postOrder(clientId) {
  await clientsService.getClientByIdOrThrow(clientId)

  const newOrder = await ordersRepository.postOrder(clientId)
  return newOrder
}

async function getOrders() {
  return await ordersRepository.getOrders()
}

async function getOrderByIdOrThrow(orderId) {
  if (Number.isNaN(orderId)) {
    throw new AppError('Invalid id', 400)
  }

  const order = await ordersRepository.getOrdersById(orderId)
  if (!order) {
    throw new AppError('Order not found', 400)
  }
  return order
}

module.exports = {
  postOrder,
  getOrders,
  getOrderByIdOrThrow,
}
