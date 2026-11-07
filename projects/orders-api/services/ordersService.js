const ordersRepository = require('../repositories/ordersRepository')
const clientsService = require('./clientsService')
const productsOrderService = require('./productsOrderService')
const productsService = require('./productsService')
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

async function postOrderConfirmation(order_id) {
  const order = await getOrderByIdOrThrow(order_id)
  if (order.status !== 'Pending') {
    throw new AppError('Status is not pending', 409)
  }
  const productsOrder =
    await productsOrderService.getProductOrderByOrderIdOrThrow(order_id)
  if (productsOrder.length === 0) {
    throw new AppError('Order has no products', 400)
  }

  for (const item of productsOrder) {
    const product = await productsService.getProductsByIdOrThrow(
      item.product_id,
    )

    if (item.stock_quantity > product.quantity) {
      throw new AppError('Not enough products in stock', 400)
    }
  }
}

module.exports = {
  postOrder,
  getOrders,
  getOrderByIdOrThrow,
}
