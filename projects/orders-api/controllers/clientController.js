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

module.exports = {
  postClient,
}
