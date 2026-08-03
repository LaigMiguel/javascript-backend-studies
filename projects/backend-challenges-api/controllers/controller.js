const customerService = require('../service/service')

async function getCustomers(req, res) {
  const customers = await customerService.getCustomers()
  return res.json(customers)
}

async function postNewCustomer(req, res) {
  const { name } = req.body

  const user = await customerService.postNewCustomer(name)
  return res.status(201).json(user)
}

module.exports = {
  postNewCustomer,
  getCustomers,
}
