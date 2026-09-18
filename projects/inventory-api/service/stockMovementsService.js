const AppError = require('../errors/AppError')
const productsService = require('../service/productsService')
const stockMovementsRepository = require('../repository/stockMovementsRepository')

async function registerStockMovement(productId, type, quantity) {
  if (!Number.isInteger(productId) || productId <= 0) {
    throw new AppError('Invalid product id', 400)
  }
  if (type !== 'entry' && type !== 'exit') {
    throw new AppError('Invalid movement type', 400)
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError('Invalid quantity', 400)
  }

  const product = await productsService.getProductById(productId)

  if (type === 'exit' && quantity > product.quantity) {
    throw new AppError('Insufficient stock', 400)
  }

  await stockMovementsRepository.registerStockMovement(
    productId,
    type,
    quantity,
  )
}

module.exports = {
  registerStockMovement,
}
