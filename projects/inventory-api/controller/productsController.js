const productsService = require('../service/productsService')

async function postProduct(req, res, next) {
  try {
    const { name, price, category_id, quantity } = req.body
    let numericPrice = price
    if (price !== '') {
      numericPrice = Number(price)
    }
    const numericCategoryId = Number(category_id)
    const numericQuantity = Number(quantity)

    const newProduct = await productsService.postProduct(
      name,
      numericPrice,
      numericCategoryId,
      numericQuantity,
    )
    return res.status(201).json(newProduct)
  } catch (error) {
    next(error)
  }
}

async function getAllProducts(req, res, next) {
  try {
    const products = await productsService.getAllProducts()
    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

async function getProductById(req, res, next) {
  try {
    const id = Number(req.params.id)
    const product = await productsService.getProductById(id)
    return res.status(200).json(product)
  } catch (error) {
    next(error)
  }
}

async function updateProduct(req, res, next) {
  try {
    const { name, price, category_id, quantity } = req.body
    const id = Number(req.params.id)
    const updatedProduct = await productsService.updateProduct(
      name,
      price,
      category_id,
      quantity,
      id,
    )
    return res.status(200).json(updatedProduct)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  updateProduct,
}
