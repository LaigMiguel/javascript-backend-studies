const stockMovementsService = require('../services/stockMovementsService')

async function postStockMovement(req, res, next) {
  try {
    const { product_id, quantity, type } = req.body || {}
    await stockMovementsService.postStockMovement(product_id, quantity, type)
    return res
      .status(201)
      .json({ message: 'Stock movement registered successfully' })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postStockMovement,
}
