const express = require('express')
const clientRoute = express.Router()
const clientsController = require('../controllers/clientController')

clientRoute.post('/', clientsController.postClient)
clientRoute.get('/', clientsController.getClients)
clientRoute.get('/:id', clientsController.getClientByIdOrThrow)

module.exports = clientRoute
