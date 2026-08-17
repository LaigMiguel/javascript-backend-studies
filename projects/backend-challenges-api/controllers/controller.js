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

  const customer = await customerService.getCustomersByIdOrThrow(id)
  return res.json(customer)
}

async function postNewCustomer(req, res) {
  const { name } = req.body || {}

  const user = await customerService.postNewCustomer(name)
  return res.status(201).json(user)
}

async function updateCustomer(req, res) {
  const id = Number(req.params.id)
  const { name } = req.body || {}
  const updatedCustomer = await customerService.updateCustomer(name, id)

  return res.status(200).json(updatedCustomer)
}

async function deleteCustomer(req, res) {
  const id = Number(req.params.id)

  await customerService.deleteCustomer(id)

  return res.status(204).send()
}

async function postNewPhone(req, res, next) {
  try {
    const id = Number(req.params.id)
    const { phone } = req.body || {}

    const newPhone = await customerService.postNewPhone(phone, id)
    return res.status(201).json(newPhone)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postNewCustomer,
  getCustomers,
  getCustomersById,
  getCustomersByQueryParam,
  updateCustomer,
  deleteCustomer,
  postNewPhone,
}
