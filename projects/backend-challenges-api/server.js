const express = require('express')
const customersRouter = require('./routes/customers')
const errorMiddleware = require('./middlewares/errorMiddleware')

const app = express()
app.use(express.json())

app.use('/customers', customersRouter)

app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000')
})
