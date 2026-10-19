const express = require('express')
const stockMovementsRoute = express.Router()
const stockMovementsController = require('../controllers/stockMovementsController')

stockMovementsRoute.post('/', stockMovementsController.postStockMovement)

module.exports = stockMovementsRoute
