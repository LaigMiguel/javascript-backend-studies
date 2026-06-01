const express = require('express')

const app = express()

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

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
