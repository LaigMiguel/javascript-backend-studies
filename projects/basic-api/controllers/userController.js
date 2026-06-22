const users = require('../data/users')

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

  if (Number.isNaN(id)) {
    return res.status(400).json({ message: 'Id needs to be in a valid format' })
  }

  const user = users.find((user) => user.id === id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
}

function getUsersByName(req, res) {
  const name = req.query.name
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name query parameter is required' })
  }

  const searchName = name.toLowerCase()
  const queryUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName),
  )

  res.json(queryUsers)
}

function postNewUser(req, res) {
  const { name } = req.body

  if (typeof name !== 'string' || name.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Name field is required and cannot be empty' })
  }

  const lastUser = users[users.length - 1]
  const newUser = {
    id: lastUser.id + 1,
    name,
  }

  users.push(newUser)
  return res.status(201).json(newUser)
}

module.exports = {
  getUsers,
  getUserById,
  getUsersByName,
  getUsersCount,
  getUsersNames,
  postNewUser,
}
