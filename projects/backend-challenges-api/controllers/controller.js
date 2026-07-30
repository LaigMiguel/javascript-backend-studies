const customerService = require('../service/service')

async function postNewCustomer(req, res) {
  const { name } = req.body

  const user = await customerService.postNewCustomer(name)
  return res.status(201).json(user)
}

module.exports = {
  postNewCustomer,
}
