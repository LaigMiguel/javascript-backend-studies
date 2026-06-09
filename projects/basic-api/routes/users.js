const express = require('express')
const router = express.Router()

let users = [
  { id: 1, name: 'João' },
  { id: 2, name: 'Maria' },
]

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/count', (req, res) => {
  const count = users.length
  res.json(count)
})

router.get('/:id', (req, res) => {
  const reqId = Number(req.params.id)

  const user = users.find((user) => user.id === reqId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})

router.post('/', (req, res) => {
  const { name } = req.body

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
  const id = Number(req.params.id)

  const user = users.find((user) => user.id === id)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  users = users.filter((user) => user.id !== id)

  return res.status(204).send()
})

module.exports = router
