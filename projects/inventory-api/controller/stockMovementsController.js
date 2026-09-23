const stockMovementsService = require('../service/stockMovementsService')

async function registerStockMovement(req, res, next) {
  try {
    const { product_id, type, quantity } = req.body
    const numericQuantity = Number(quantity)
    const productId = Number(product_id)

    await stockMovementsService.registerStockMovement(
      productId,
      type,
      numericQuantity,
    )

    return res.status(201).send()
  } catch (error) {
    next(error)
  }
}

async function getStockMovements(req, res, next) {
  try {
    const stockMovements = await stockMovementsService.getStockMovements()
    return res.status(200).json(stockMovements)
  } catch (error) {
    next(error)
  }
}

async function getStockMovementsByProductId(req, res, next) {
  try {
    const productId = Number(req.params.id)
    const stockMovements =
      await stockMovementsService.getStockMovementsByProductId(productId)
    return res.status(200).json(stockMovements)
  } catch (error) {
    next(error)
  }
}

async function getStockMovementById(req, res, next) {
  try {
    const id = Number(req.params.id)
    const stockMovement = await stockMovementsService.getStockMovementById(id)
    return res.status(200).json(stockMovement)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  registerStockMovement,
  getStockMovements,
  getStockMovementsByProductId,
  getStockMovementById,
}
