const express = require('express')
const stockMovementsRoutes = express.Router()
const stockMovementsController = require('../controller/stockMovementsController')
module.exports = stockMovementsRoutes

stockMovementsRoutes.post('/', stockMovementsController.registerStockMovement)
