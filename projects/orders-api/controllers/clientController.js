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

module.exports = {
  postClient,
  getClients,
}
