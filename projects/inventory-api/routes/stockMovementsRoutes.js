const express = require('express')
const stockMovementsRoutes = express.Router()
const stockMovementsController = require('../controller/stockMovementsController')
module.exports = stockMovementsRoutes

stockMovementsRoutes.post('/', stockMovementsController.registerStockMovement)
stockMovementsRoutes.get('/', stockMovementsController.getStockMovements)
stockMovementsRoutes.get(
  '/products/:id',
  stockMovementsController.getStockMovementsByProductId,
)
stockMovementsRoutes.get('/:id', stockMovementsController.getStockMovementById)
