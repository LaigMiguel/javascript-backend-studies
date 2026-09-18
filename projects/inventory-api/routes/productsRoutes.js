const productsController = require('../controller/productsController')
const express = require('express')
const productsRoutes = express.Router()
module.exports = productsRoutes

productsRoutes.post('/', productsController.postProduct)
productsRoutes.get('/', productsController.getAllProducts)
productsRoutes.get('/:id', productsController.getProductById)
productsRoutes.patch('/:id', productsController.updateProduct)
productsRoutes.delete('/:id', productsController.deleteProduct)
