const express = require('express')
const router = express.Router()

const users = require('../data/users')
const usersController = require('../controllers/userController')

router.get('/', usersController.getUsers)

router.get('/count', usersController.getUsersCount)
router.get('/names', usersController.getUsersNames)

router.get('/search', usersController.getUsersByName)

router.get('/:id', usersController.getUserById)

router.post('/', usersController.postNewUser)

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
