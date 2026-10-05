const express = require('express')
const productRoute = express.Router()
const productsController = require('../controllers/productsController')

productRoute.post('/', productsController.postProduct)

module.exports = productRoute
