const AppError = require('../errors/appError')
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
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }
  await getCustomersByIdOrThrow(id)
  await customerRepository.updateCustomer(name, id)
  const updatedCustomer = await customerRepository.getCustomersById(id)
  return updatedCustomer
}
async function deleteCustomer(id) {
  await getCustomersByIdOrThrow(id)
  await customerRepository.deleteCustomer(id)
}

async function postNewPhone(phone, id) {
  await getCustomersByIdOrThrow(id)
  if (typeof phone !== 'string' || phone.trim() === '') {
    throw new AppError('Invalid phone', 400)
  }
  const newPhone = await customerRepository.postNewPhone(phone, id)
  return newPhone
}

async function getPhonesByCustomerId(id) {
  await getCustomersByIdOrThrow(id)
  const phones = await customerRepository.getPhonesByCustomerId(id)
  return phones
}

async function deletePhoneFromCustomer(customerId, phoneId) {
  await getCustomersByIdOrThrow(customerId)

  if (Number.isNaN(phoneId)) {
    throw new AppError('Invalid phone Id', 400)
  }

  const changes = await customerRepository.deletePhoneFromCustomer(
    customerId,
    phoneId,
  )
  if (changes === 0) {
    throw new AppError('No changes made', 404)
  }

  return changes
}

module.exports = {
  postNewCustomer,
  getCustomers,
  getCustomersByIdOrThrow,
  getCustomersByQueryParam,
  updateCustomer,
  deleteCustomer,
  postNewPhone,
  getPhonesByCustomerId,
  deletePhoneFromCustomer,
}
