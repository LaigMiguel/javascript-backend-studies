const productsService = require('../services/productsService')

async function postProduct(req, res, next) {
  try {
    const { name, stock_quantity, price } = req.body || {}
    const newProduct = await productsService.postProduct(
      name,
      stock_quantity,
      price,
    )
    return res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
}

async function getProducts(req, res, next) {
  try {
    const products = await productsService.getProducts()
    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

async function getProductById(req, res, next) {
  try {
    const id = Number(req.params.id)
    const product = await productsService.getProductsByIdOrThrow(id)
    return res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

async function updateProduct(req, res, next) {
  try {
    const id = Number(req.params.id)
    const { name, stock_quantity, price } = req.body || {}
    const updatedProduct = await productsService.updateProduct(
      id,
      name,
      stock_quantity,
      price,
    )
    return res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProduct,
  getProducts,
  getProductById,
  updateProduct,
}
