const stockMovementsRepository = require('../repositories/stockMovementsRepository')
const productRepository = require('../repositories/productsRepository')
const productsService = require('../services/productsService')
const AppError = require('../errors/AppError')

async function postStockMovement(product_id, quantity, type) {
  if (!Number.isInteger(product_id) || product_id <= 0) {
    throw new AppError('Invalid product id', 400)
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new AppError('Invalid quantity', 400)
  }
  if (type !== 'exit' && type !== 'entry') {
    throw new AppError('Invalid type', 400)
  }
  const productInStock =
    await productsService.getProductsByIdOrThrow(product_id)

  if (type === 'exit') {
    if (quantity > productInStock.stock_quantity) {
      throw new AppError('Not enough products in stock', 400)
    }
  }
  await productRepository.updateStockQuantity(product_id, quantity, type)
  await stockMovementsRepository.postStockMovement(product_id, quantity, type)
}

async function getStockMovements() {
  return await stockMovementsRepository.getStockMovements()
}

async function getStockMovementByIdOrThrow(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Invalid id', 400)
  }

  const stockMovent = await stockMovementsRepository.getStockMovementById(id)
  if (!stockMovent) {
    throw new AppError('Stock movement not found', 404)
  }

  return stockMovent
}

module.exports = {
  postStockMovement,
  getStockMovements,
  getStockMovementByIdOrThrow,
}
