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

async function createUser(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }

  const newUser = await userRepository.createUser(name)

  return newUser
}

async function searchUserById(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Id needs to be in a valid format', 400)
  }

  const user = await userRepository.getUserById(id)

  if (!user) {
    throw new AppError('User not found', 404)
  }

  return user
}

async function searchUserByName(name) {
  if (!name || name.trim() === '') {
    throw new AppError('Name is required', 400)
  }

  const queryUsers = await userRepository.getUserByName(name)

  return queryUsers
}

async function updateUserById(id, name) {
  const user = searchUserById(id)

  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Name is required', 400)
  }

  await userRepository.updateUser(id, name)

  const updatedUser = await userRepository.getUserById(id)
  return updatedUser
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
