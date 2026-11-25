const express = require('express')
const accountsRoute = express.Router()
const accountsController = require('../controllers/accountsControllers')

accountsRoute.post('/', accountsController.postAccount)
accountsRoute.get('/:id', accountsController.getAccountById)

module.exports = accountsRoute
