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

function searchUserById(id) {
  if (Number.isNaN(id)) {
    throw new Error('Id needs to be in a valid format')
  }

  const user = users.find((user) => user.id === id)

  if (!user) {
    throw new Error('User not found')
  }

  return user
}

module.exports = {
  createUser,
  searchUserById,
}
