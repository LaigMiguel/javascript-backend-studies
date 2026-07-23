const userService = require('../service/usersService')

async function getUsers(req, res) {
  const allUsers = await userService.getAllUsers()
  res.json(allUsers)
}

async function getUsersCount(req, res) {
  const count = await userService.getUsersCount()
  res.json(count)
}

async function getUsersNames(req, res) {
  const names = await userService.getUsersNames()
  res.json(names)
}

async function getUserById(req, res) {
  const id = Number(req.params.id)

  const user = await userService.searchUserById(id)
  return res.json(user)
}

async function getUsersByName(req, res) {
  const name = req.query.name

  const queryUsers = await userService.searchUserByName(name)
  return res.json(queryUsers)
}

async function postNewUser(req, res) {
  const { name } = req.body

  const user = await userService.createUser(name)
  return res.status(201).json(user)
}

async function putUser(req, res) {
  const userId = Number(req.params.id)
  const { name } = req.body

  const updatedUser = await userService.updateUserById(userId, name)
  return res.json(updatedUser)
}

async function deleteUser(req, res) {
  const userId = Number(req.params.id)

  const deletedUser = await userService.deleteUserById(userId)
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
