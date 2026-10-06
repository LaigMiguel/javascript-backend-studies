const express = require('express')
const productRoute = express.Router()
const productsController = require('../controllers/productsController')

productRoute.post('/', productsController.postProduct)
productRoute.get('/', productsController.getProducts)

module.exports = productRoute
