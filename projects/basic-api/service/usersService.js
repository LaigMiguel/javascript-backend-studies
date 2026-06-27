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

function searchUserByName(name) {
  if (!name || name.trim() === '') {
    throw new Error('Name is required')
  }

  const searchName = name.toLowerCase()
  const queryUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName),
  )

  return queryUsers
}

function updateUserById(id, name) {
  if (Number.isNaN(id)) {
    throw new Error('Id needs to be in a valid format')
  }
  const user = users.find((user) => user.id === id)
  if (!user) {
    throw new Error('User not found')
  }

  if (typeof name !== 'string' || name.trim() === '') {
    throw new Error('Name is required')
  }

  user.name = name
  return user
}

function deleteUserById(id) {
  if (Number.isNaN(id)) {
    throw new Error('Id needs to be in a valid format')
  }

  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    throw new Error('User not found')
  }

  users.splice(userIndex, 1)
}

module.exports = {
  createUser,
  searchUserById,
  searchUserByName,
  updateUserById,
  deleteUserById,
}
