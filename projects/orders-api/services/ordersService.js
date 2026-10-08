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

module.exports = {
  postOrder,
  getOrders,
}
