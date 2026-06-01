const express = require('express')

const app = express()

app.use(express.json())

const users = [
  { id: 1, name: 'João' },
  { id: 2, name: 'Maria' },
]

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  })
})

app.get('/users', (req, res) => {
  res.json(users)
})

app.get('/users/count', (req, res) => {
  const count = users.length
  res.json(count)
})

app.get('/users/:id', (req, res) => {
  const reqId = Number(req.params.id)

  const user = users.find((user) => user.id === reqId)

  if (!user) {
    return res.status(404).json({ message: 'User not found' })
  }

  res.json(user)
})

app.post('/users', (req, res) => {
  const { name } = req.body

  const lastUser = users[users.length - 1]

  const newUser = {
    id: lastUser.id + 1,
    name,
  }

  users.push(newUser)

  res.json(newUser)
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
