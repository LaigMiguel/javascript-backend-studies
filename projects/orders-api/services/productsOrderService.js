const productsOrderRepository = require('../repositories/productsOrderRepository')
const orderService = require('./ordersService')
const productService = require('./productsService')
const AppError = require('../errors/AppError')
const productsOrderRoute = require('../routes/productsOrderRoutes')

async function postProductOrder(order_id, product_id, quantity) {
  const order = await orderService.getOrderByIdOrThrow(order_id)
  if (order.status !== 'Pending') {
    throw new AppError('Order must be Pending to add products', 400)
  }
  const product = await productService.getProductsByIdOrThrow(product_id)
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError('Invalid quantity', 400)
  }

  const existingProductOrder =
    await productsOrderRepository.searchOrderIdAndProductId(
      order_id,
      product_id,
    )
  let newQuantity = quantity
  let product_price = product.price

  if (existingProductOrder !== undefined) {
    newQuantity = existingProductOrder.quantity + quantity
    product_price = existingProductOrder.product_price
  }

  if (newQuantity > product.stock_quantity) {
    throw new AppError('Insufficient stock', 400)
  }

  if (existingProductOrder === undefined) {
    return await productsOrderRepository.postProductOrder(
      order_id,
      product_id,
      quantity,
      product_price,
    )
  }

  await productsOrderRepository.updateProductOrderQuantity(
    order_id,
    product_id,
    newQuantity,
  )

  return {
    order_id,
    product_id,
    quantity: newQuantity,
    product_price,
  }
}

async function getProductOrders() {
  return await productsOrderRepository.getProductOrders()
}

async function getProductOrderByOrderIdOrThrow(order_id) {
  await orderService.getOrderByIdOrThrow(order_id)
  const productOrders =
    await productsOrderRepository.getProductOrderByOrderId(order_id)
  if (!productOrders) {
    return new AppError('No product orders found', 404)
  }

  return productOrders
}

module.exports = {
  postProductOrder,
  getProductOrders,
  getProductOrderByOrderIdOrThrow,
}
