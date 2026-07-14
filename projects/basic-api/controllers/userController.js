const userService = require('../service/usersService')

function getUsers(req, res) {
  const allUsers = userService.getAllUsers()
  res.json(allUsers)
}

function getUsersCount(req, res) {
  const count = userService.getUsersCount()
  res.json(count)
}

function getUsersNames(req, res) {
  const names = userService.getUsersNames()
  res.json(names)
}

function getUserById(req, res) {
  const id = Number(req.params.id)

  const user = userService.searchUserById(id)
  return res.json(user)
}

function getUsersByName(req, res) {
  const name = req.query.name

  const queryUsers = userService.searchUserByName(name)
  return res.json(queryUsers)
}

function postNewUser(req, res) {
  const { name } = req.body

  const user = userService.createUser(name)
  return res.status(201).json(user)
}

function putUser(req, res) {
  const userId = Number(req.params.id)
  const { name } = req.body

  const updatedUser = userService.updateUserById(userId, name)
  return res.json(updatedUser)
}

function deleteUser(req, res) {
  const userId = Number(req.params.id)

  const deletedUser = userService.deleteUserById(userId)
  return res.status(204).send()
}

module.exports = {
  getUsers,
  getUserById,
  getUsersByName,
  getUsersCount,
  getUsersNames,
  postNewUser,
  putUser,
  deleteUser,
}
