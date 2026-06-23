const users = require('../data/users')

function createUser(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Invalid name')
  }

  const lastUser = users[users.length - 1]

  const newUser = {
    id: lastUser.id + 1,
    name,
  }
  users.push(newUser)

  return newUser
}

module.exports = {
  createUser,
}
