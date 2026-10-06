const express = require('express')
const productRoute = express.Router()
const productsController = require('../controllers/productsController')

productRoute.post('/', productsController.postProduct)
productRoute.get('/', productsController.getProducts)
productRoute.get('/:id', productsController.getProductById)

module.exports = productRoute
