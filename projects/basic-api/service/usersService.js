const users = require('../data/users')
const AppError = require('../errors/appError')

function getAllUsers() {
  return users
}
function getUsersCount() {
  return users.length
}
function getUsersNames() {
  const names = users.map((user) => user.name)
  return names
}

function createUser(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
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
    throw new AppError('Id needs to be in a valid format', 400)
  }

  const user = users.find((user) => user.id === id)

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return user
}

function searchUserByName(name) {
  if (!name || name.trim() === '') {
    throw new AppError('Name is required', 400)
  }

  const searchName = name.toLowerCase()
  const queryUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName),
  )

  return queryUsers
}

function updateUserById(id, name) {
  if (Number.isNaN(id)) {
    throw new AppError('Id needs to be in a valid format', 400)
  }
  const user = users.find((user) => user.id === id)
  if (!user) {
    throw new AppError('User not found', 404)
  }

  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Name is required', 400)
  }

  user.name = name
  return user
}

function deleteUserById(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Id needs to be in a valid format', 400)
  }

  const userIndex = users.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    throw new AppError('User not found', 404)
  }

  users.splice(userIndex, 1)
}

module.exports = {
  getAllUsers,
  getUsersCount,
  getUsersNames,
  createUser,
  searchUserById,
  searchUserByName,
  updateUserById,
  deleteUserById,
}
