const customerService = require('../service/service')

async function getCustomers(req, res) {
  const customers = await customerService.getCustomers()
  return res.json(customers)
}

async function getCustomersByQueryParam(req, res) {
  const name = req.query.name

  const querySearch = await customerService.getCustomersByQueryParam(name)
  return res.json(querySearch)
}

async function getCustomersById(req, res) {
  const id = Number(req.params.id)

  const customer = await customerService.getCustomersById(id)
  return res.json(customer)
}

async function postNewCustomer(req, res) {
  const { name } = req.body

  const user = await customerService.postNewCustomer(name)
  return res.status(201).json(user)
}

async function updateCustomer(req, res) {
  const id = Number(req.params.id)
  const { name } = req.body
  const updatedCustomer = await customerService.updateCustomer(name, id)

  return res.status(200).json(updatedCustomer)
}

module.exports = {
  postNewCustomer,
  getCustomers,
  getCustomersById,
  getCustomersByQueryParam,
  updateCustomer,
}
