const express = require('express')
const router = express.Router()

const users = require('../data/users')
const usersController = require('../controllers/userController')

router.get('/', usersController.getUsers)

router.get('/count', (req, res) => {
  const count = users.length
  res.json(count)
})
router.get('/names', (req, res) => {
  const names = users.map((user) => user.name)

  res.json(names)
})

router.get('/search', (req, res) => {
  const name = req.query.name
  if (!name || name.trim() === '') {
    return res.status(400).json({ message: 'Name query paramter is required' })
  }
  const reqName = name.toLowerCase()
  const queryUsers = users.filter((user) =>
    user.name.toLowerCase().includes(reqName),
  )

  res.json(queryUsers)
})

router.get('/:id', usersController.getUserById)

router.post('/', (req, res) => {
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

  res.json(newUser)
})

router.put('/:id', (req, res) => {
  const reqId = Number(req.params.id)
  const { name } = req.body

  if (Number.isNaN(reqId)) {
    return res.status(400).json({ message: 'Invalid id format' })
  }

  const user = users.find((user) => user.id === reqId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  if (typeof name !== 'string' || name.trim() === '') {
    return res
      .status(400)
      .json({ message: 'Name field is required and cannot be empty' })
  }

  user.name = name

  res.json(user)
})

router.delete('/:id', (req, res) => {
  const reqId = Number(req.params.id)

  if (Number.isNaN(reqId)) {
    return res.status(400).json({ message: 'Invalid id format' })
  }

  const user = users.find((user) => user.id === reqId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  users = users.filter((user) => user.id !== reqId)

  return res.status(204).send()
})

module.exports = router
