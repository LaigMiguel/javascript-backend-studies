const express = require('express')
const usersRouter = require('./routes/users')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use(express.json())

app.use('/users', usersRouter)
app.use(errorMiddleware)

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'API is running',
  })
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
