const express = require('express')
const router = express.Router()
const customerController = require('../controllers/controller')

router.get('/', customerController.getCustomers)
router.get('/search', customerController.getCustomersByQueryParam)
router.get('/phones', customerController.getPhonesAndCustomerName)
router.get('/phones/search', customerController.getPhoneByNumber)
router.get('/:id', customerController.getCustomersById)
router.get('/:id/with-phones', customerController.getCustomerWithPhones)
router.post('/', customerController.postNewCustomer)
router.put('/:id', customerController.updateCustomer)
router.delete('/:id', customerController.deleteCustomer)
router.post('/:id/phones', customerController.postNewPhone)
router.get('/:id/phones', customerController.getPhonesByCustomerId)
router.patch('/:id/phones/:phoneId', customerController.updatePhone)
router.delete(
  '/:id/phones/:phoneId',
  customerController.deletePhoneFromCustomer,
)
router.patch('/:id/status', customerController.updateCustomerActiveStatus)

module.exports = router
