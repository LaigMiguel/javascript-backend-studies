const express = require('express')
const router = express.Router()
const customerController = require('../controllers/controller')

router.get('/', customerController.getCustomers)
router.get('/search', customerController.getCustomersByQueryParam)
router.get('/:id', customerController.getCustomersById)
router.post('/', customerController.postNewCustomer)
router.put('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)
router.post('/:id/phones', customerController.postNewPhone)

module.exports = router
