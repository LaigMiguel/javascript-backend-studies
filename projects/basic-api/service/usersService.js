const AppError = require('../errors/appError')
const userRepository = require('../repository/userRepository')

function getAllUsers() {
  return userRepository.getUsers()
}
function getUsersCount() {
  return userRepository.getUsersCount()
}
function getUsersNames() {
  return userRepository.getUsersNames()
}

function createUser(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }

  const newUser = userRepository.createUser(name)

  return newUser
}

function searchUserById(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Id needs to be in a valid format', 400)
  }

  const user = userRepository.getUserById(id)

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return user
}

function searchUserByName(name) {
  if (!name || name.trim() === '') {
    throw new AppError('Name is required', 400)
  }

  const queryUsers = userRepository.getUserByName(name)

  return queryUsers
}

function updateUserById(id, name) {
  const user = searchUserById(id)

  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Name is required', 400)
  }

  userRepository.updateUser(id, name)
  return user
}

function deleteUserById(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Id needs to be in a valid format', 400)
  }

  searchUserById(id)

  userRepository.deleteUserById(id)
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
