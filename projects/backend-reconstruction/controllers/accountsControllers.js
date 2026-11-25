const accountsService = require('../services/accountsServices')

async function postAccount(req, res, next) {
  try {
    const { login, password } = req.body
    const account = await accountsService.postAccount(login, password)
    return res.status(201).json(account)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postAccount,
}
