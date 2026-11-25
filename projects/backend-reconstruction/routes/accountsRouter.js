const express = require('express')
const accountsRoute = express.Router()
const accountsController = require('../controllers/accountsControllers')

accountsRoute.post('/', accountsController.postAccount)
accountsRoute.get('/login', accountsController.getAccountByLogin)
accountsRoute.get('/:id', accountsController.getAccountById)
accountsRoute.post('/login', accountsController.getAccountCredentialsByLogin)

module.exports = accountsRoute
