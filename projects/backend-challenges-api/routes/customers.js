const express = require('express')
const router = express.Router()
const customerController = require('../controllers/controller')

router.get('/', customerController.getCustomers)
router.get('/:id', customerController.getCustomersById)
router.post('/', customerController.postNewCustomer)

module.exports = router
