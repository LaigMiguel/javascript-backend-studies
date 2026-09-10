const express = require('express')
const errorsMiddleware = require('./middlewares/errorsMiddleware')
const app = express()
const categoriesRouter = require('./routes/categoriesRoutes')
const productsRouter = require('./routes/productsRoutes')
const stockMovementsRouter = require('./routes/stockMovementsRoutes')

app.use(express.json())
app.use('/categories', categoriesRouter)
app.use('/products', productsRouter)
app.use('/stockMovements', stockMovementsRouter)

app.use(errorsMiddleware)

app.listen(3000, () => {
  console.log('Server initiated')
})
