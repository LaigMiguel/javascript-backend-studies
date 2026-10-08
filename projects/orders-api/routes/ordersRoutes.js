const express = require('express')
const ordersRoute = express.Router()
const ordersController = require('../controllers/ordersController')

ordersRoute.post('/:id', ordersController.postOrder)
ordersRoute.get('/', ordersController.getOrders)
ordersRoute.get('/:id', ordersController.getOrderById)

module.exports = ordersRoute
