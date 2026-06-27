const users = require('../data/users')
const userService = require('../service/usersService')

function getUsers(req, res) {
  res.json(users)
}

function getUsersCount(req, res) {
  const count = users.length
  res.json(count)
}

function getUsersNames(req, res) {
  const names = users.map((user) => user.name)
  res.json(names)
}

function getUserById(req, res) {
  const id = Number(req.params.id)

  try {
    const user = userService.searchUserById(id)
    return res.json(user)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

function getUsersByName(req, res) {
  const name = req.query.name
  try {
    const queryUsers = userService.searchUserByName(name)
    return res.json(queryUsers)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

function postNewUser(req, res) {
  const { name } = req.body

  try {
    const user = userService.createUser(name)
    return res.status(201).json(user)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

function putUser(req, res) {
  const userId = Number(req.params.id)
  const { name } = req.body

  try {
    const updatedUser = userService.updateUserById(userId, name)
    return res.json(updatedUser)
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
}

function deleteUser(req, res) {
  const userId = Number(req.params.id)
  try {
    const deletedUser = userService.deleteUserById(userId)
    return res.status(204).send()
  } catch (error) {
    return res.status(400).json({ message: error.message })
  }
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
