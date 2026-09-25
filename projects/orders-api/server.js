const express = require('express')
const app = express()
const clientsRouter = require('./routes/clientsRoutes')
const productsRouter = require('./routes/productsRoutes')
const ordersRouter = require('./routes/ordersRoutes')
const productsOrderRouter = require('./routes/productsOrderRoutes')
const stockMovementsRouter = require('./routes/stockMovementsRoutes')
const errorMiddleware = require('./middlewares/errorMiddleware')

app.use(express.json())

app.use('/client', clientsRouter)
app.use('/product', productsRouter)
app.use('/orders', ordersRouter)
app.use('/productsOrder', productsOrderRouter)
app.use('/stockMovements', stockMovementsRouter)

app.use(errorMiddleware)

app.listen(3000, () => {
  console.log('Server initiated')
})
