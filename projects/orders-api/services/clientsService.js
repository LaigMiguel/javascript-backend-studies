const clienteRepository = require('../repositories/clientsRepository')
const AppError = require('../errors/AppError')

async function postClient(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }

  const normalizedName = name.trim().toLowerCase()

  if (!/^[A-Za-zà-ÿ ]+$/.test(normalizedName)) {
    throw new AppError('Name contains invalid characters', 400)
  }

  const newClient = await clienteRepository.postClient(normalizedName)
  return newClient
}

module.exports = {
  postClient,
}
