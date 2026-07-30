const express = require('express')
const usersRouter = require('./routes/users')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()

app.use('/users', usersRouter)
app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
