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

async function getClients() {
  return await clienteRepository.getClients()
}

async function getClientByIdOrThrow(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Invalid id', 400)
  }

  const client = await clienteRepository.getClientByIdOrThrow(id)
  if (!client) {
    throw new AppError('Client not found', 404)
  }

  return client
}

async function updateClient(name, id) {
  await getClientByIdOrThrow(id)

  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }

  const newName = name.trim().toLowerCase()

  if (!/^[A-Za-zà-ÿ ]+$/.test(newName)) {
    throw new AppError('Name contains invalid characters', 400)
  }

  await clienteRepository.updateClient(newName, id)

  const client = await getClientByIdOrThrow(id)

  return client
}

module.exports = {
  postClient,
  getClients,
  getClientByIdOrThrow,
  updateClient,
}
