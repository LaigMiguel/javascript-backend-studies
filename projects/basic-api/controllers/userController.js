const users = require('../data/users')

function getUsers(req, res) {
  res.json(users)
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

module.exports = {
  getUsers,
  getUserById,
  getUsersByName,
}
