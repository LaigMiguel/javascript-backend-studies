const AppError = require('../../basic-api/errors/appError')
const customerRepository = require('../repository/repository')

async function getCustomers() {
  const customers = await customerRepository.getCustomers()
  return customers
}

async function getCustomersById(id) {
  if (Number.isNaN(id) || id < 1) {
    throw new AppError('Invalid id format', 400)
  }

  const customer = await customerRepository.getCustomersById(id)

  if (!customer) {
    throw new AppError('Customer not found', 404)
  }

  return customer
}

async function postNewCustomer(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }

  const newUser = await customerRepository.postNewCustomer(name)
  return newUser
}

module.exports = {
  postNewCustomer,
  getCustomers,
  getCustomersById,
}
