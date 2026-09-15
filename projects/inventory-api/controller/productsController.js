const producstService = require('../service/productsService')

async function postProduct(req, res, next) {
  try {
    const { name, price, category_id, quantity } = req.body
    let numericPrice = price
    if (price !== '') {
      numericPrice = Number(price)
    }
    const numericCategoryId = Number(category_id)
    const numericQuantity = Number(quantity)

    const newProduct = await producstService.postProduct(
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
    const products = await producstService.getAllProducts()
    return res.status(200).json(products)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postProduct,
  getAllProducts,
}
