const accountsRepositorie = require('../repositories/accountsRepositorie')
const AppError = require('../errors/AppError')
const bcrypt = require('bcrypt')

async function postAccount(login, password) {
  if (
    typeof login !== 'string' ||
    login.trim() !== login ||
    login.trim() === '' ||
    login.includes(' ')
  ) {
    throw new AppError('Invalid login', 400)
  }

  if (
    typeof password !== 'string' ||
    password.trim() !== password ||
    password.trim() === '' ||
    password.includes(' ')
  ) {
    throw new AppError('Invalid password', 400)
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const account = await accountsRepositorie.postAccount(login, hashedPassword)

  return account
}

async function getAccountById(id) {
  if (!Number.isInteger(id) || id <= 0) {
    throw new AppError('Invalid id', 400)
  }
  const account = await accountsRepositorie.getAccountById(id)

  if (!account) {
    throw new AppError('Account not found', 404)
  }
  return account
}

async function getAccountByLogin(login) {
  if (typeof login !== 'string' || login.trim() === '' || login.includes(' ')) {
    throw new AppError('Invalid login', 400)
  }

  const account = await accountsRepositorie.getAccountByLogin(login)

  if (!account) {
    throw new AppError('Account not found', 404)
  }

  return account
}

async function getAccountCredentialsByLogin(login, password) {
  if (typeof login !== 'string' || login.trim() === '' || login.includes(' ')) {
    throw new AppError('Invalid login', 400)
  }
  if (
    typeof password !== 'string' ||
    password.trim() === '' ||
    password.includes(' ')
  ) {
    throw new AppError('Invalid password', 400)
  }

  const account = await accountsRepositorie.getAccountCredentialsByLogin(login)
  if (!account) {
    throw new AppError('Account not found', 404)
  }

  const isValid = await bcrypt.compare(password, account.password)

  if (!isValid) {
    throw new AppError('Invalid login or password', 401)
  }

  return {
    id: account.id,
    login: account.login,
  }
}

module.exports = {
  postAccount,
  getAccountById,
  getAccountByLogin,
  getAccountCredentialsByLogin,
}
