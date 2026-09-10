const express = require('express')
const categoriesRoute = express.Router()
const categoriesController = require('../controller/categoriesController')

categoriesRoute.post('/', categoriesController.postCategorie)
categoriesRoute.get('/', categoriesController.getCategories)
categoriesRoute.get('/:id', categoriesController.getCategorieByIdOrThrow)
categoriesRoute.patch('/:id', categoriesController.updateCategorieName)
module.exports = categoriesRoute
