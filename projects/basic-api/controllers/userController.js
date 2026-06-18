const users = require('../data/users')

function getUsers(req, res) {
  res.json(users)
}

module.exports = {
  getUsers,
}
