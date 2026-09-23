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

async function getStockMovements() {
  return await stockMovementsRepository.getStockMovements()
}

async function getStockMovementsByProductId(productId) {
  await productsService.getProductById(productId)

  return await stockMovementsRepository.getStockMovementsByProductId(productId)
}

async function getStockMovementById(id) {
  if (!Number.isInteger(id)) {
    throw new AppError('Invalid id', 400)
  }

  const stockMovement = await stockMovementsRepository.getStockMovementById(id)
  if (!stockMovement) {
    throw new AppError('No stock movement found', 404)
  }

  return stockMovement
}

module.exports = {
  registerStockMovement,
  getStockMovements,
  getStockMovementsByProductId,
  getStockMovementById,
}
