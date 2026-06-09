const express = require('express')

const app = express()

app.use(express.json())

const usersRouter = require('./routes/users')

app.use('/users', usersRouter)

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
