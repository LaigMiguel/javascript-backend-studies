const express = require('express')
const stockMovementsRoute = express.Router()
const stockMovementsController = require('../controllers/stockMovementsController')

stockMovementsRoute.post('/', stockMovementsController.postStockMovement)
stockMovementsRoute.get('/', stockMovementsController.getStockMovements)

module.exports = stockMovementsRoute
