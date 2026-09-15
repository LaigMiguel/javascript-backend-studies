const productsController = require('../controller/productsController')
const express = require('express')
const productsRoutes = express.Router()
module.exports = productsRoutes

productsRoutes.post('/', productsController.postProduct)
