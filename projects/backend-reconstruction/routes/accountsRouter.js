const express = require('express')
const accountsRoute = express.Router()
const accountsController = require('../controllers/accountsControllers')

accountsRoute.post('/', accountsController.postAccount)

module.exports = accountsRoute
