const express = require('express')
const productsOrderRoute = express.Router()
const productsOrderController = require('../controllers/productsOrderController')

productsOrderRoute.post('/', productsOrderController.postProductsOrder)
productsOrderRoute.get('/', productsOrderController.getProductOrders)
productsOrderRoute.get('/:id', productsOrderController.getProductOrderByOrderId)

module.exports = productsOrderRoute
