const AppError = require('../../basic-api/errors/appError')
const customerRepository = require('../repository/repository')

async function getCustomers() {
  const customers = await customerRepository.getCustomers()
  return customers
}

async function getCustomersByQueryParam(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Name format is invalid', 400)
  }

  const querySearch = await customerRepository.getCustomersByQueryParam(name)
  return querySearch
}

async function getCustomersByIdOrThrow(id) {
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

async function updateCustomer(name, id) {
  await customerRepository.getCustomersById(id)
  await customerRepository.updateCustomer(name, id)
  const updatedCustomer = await customerRepository.getCustomersById(id)
  return updatedCustomer
}
async function deleteCustomer(id) {
  await getCustomersById(id)
  await customerRepository.deleteCustomer(id)
}
module.exports = {
  postNewCustomer,
  getCustomers,
  getCustomersByIdOrThrow,
  getCustomersByQueryParam,
  updateCustomer,
  deleteCustomer,
}
