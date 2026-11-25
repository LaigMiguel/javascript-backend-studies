const express = require('express')
const app = express()

const accountsRouter = require('./routes/accountsRouter')
const errorMiddleware = require('./middlewares/errorMiddleware')

app.use(express.json())

app.use('/accounts', accountsRouter)

app.use(errorMiddleware)

module.exports = app
