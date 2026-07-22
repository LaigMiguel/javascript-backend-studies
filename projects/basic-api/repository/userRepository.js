const users = require('../data/users')
const db = require('../database/database')

function getUsers() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM users', (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}
function getUsersCount() {
  return users.length
}
function getUsersNames() {
  return users.map((user) => user.name)
}

function getUserById(id) {
  const user = users.find((user) => user.id === id)
  return user
}

function createUser(name) {
  const lastUser = users[users.length - 1]

  const newUser = {
    id: lastUser.id + 1,
    name,
  }
  users.push(newUser)
  return newUser
}
function getUserByName(name) {
  const searchName = name.toLowerCase()
  const queryUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchName),
  )
  return queryUsers
}

function updateUser(id, name) {
  const user = getUserById(id)
  user.name = name
  return user
}

function getUserIndexById(id) {
  const userIndex = users.findIndex((user) => user.id === id)
  return userIndex
}

function deleteUserById(id) {
  const userIndex = getUserIndexById(id)
  users.splice(userIndex, 1)
}

module.exports = {
  getUsers,
  getUsersCount,
  getUsersNames,
  getUserById,
  createUser,
  getUserByName,
  updateUser,
  deleteUserById,
}
