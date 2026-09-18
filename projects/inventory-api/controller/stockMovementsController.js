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

module.exports = {
  registerStockMovement,
}
