const express = require('express')
const productsOrderRoute = express.Router()
const productsOrderController = require('../controllers/productsOrderController')

productsOrderRoute.post('/', productsOrderController.postProductsOrder)

module.exports = productsOrderRoute
