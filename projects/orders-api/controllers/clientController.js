const clientService = require('../services/clientsService')

async function postClient(req, res, next) {
  try {
    const { name } = req.body || {}

    const newClient = await clientService.postClient(name)

    return res.status(201).json(newClient)
  } catch (error) {
    next(error)
  }
}

async function getClients(req, res, next) {
  try {
    const clients = await clientService.getClients()
    return res.status(200).json(clients)
  } catch (error) {
    next(error)
  }
}

async function getClientByIdOrThrow(req, res, next) {
  try {
    const id = Number(req.params.id)
    const client = await clientService.getClientByIdOrThrow(id)
    return res.status(200).json(client)
  } catch (error) {
    next(error)
  }
}

async function updateClient(req, res, next) {
  try {
    const { name } = req.body || {}
    const id = Number(req.params.id)

    const updatedClient = await clientService.updateClient(name, id)

    return res.status(200).json(updatedClient)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postClient,
  getClients,
  getClientByIdOrThrow,
  updateClient,
}
