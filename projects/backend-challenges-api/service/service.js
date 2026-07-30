const AppError = require('../../basic-api/errors/appError')
const customerRepository = require('../repository/repository')

async function postNewCustomer(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }

  const newUser = await customerRepository.postNewCustomer(name)
  return newUser
}

module.exports = {
  postNewCustomer,
}
