const express = require('express')
const router = express.Router()
const customerController = require('../controllers/controller')

router.post('/', customerController.postNewCustomer)

module.exports = router
