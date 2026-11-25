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

module.exports = {
  postAccount,
}
