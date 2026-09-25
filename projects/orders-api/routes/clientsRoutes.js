const express = require('express')
const clientRoute = express.Router()
const clientsController = require('../controllers/clientController')

clientRoute.post('/', clientsController.postClient)

module.exports = clientRoute
