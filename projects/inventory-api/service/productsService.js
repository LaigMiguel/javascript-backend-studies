const categoriesService = require('./categoriesService')
const productsRepository = require('../repository/productsRepository')
const AppError = require('../errors/AppError')

async function postProduct(
  name,
  numericPrice,
  NumericCategoryId,
  numericQuantity,
) {
  await categoriesService.getCategorieByIdOrThrow(NumericCategoryId)
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid product name', 400)
  }
  if (
    Number.isNaN(numericQuantity) ||
    !Number.isInteger(numericQuantity) ||
    numericQuantity < 0
  ) {
    throw new AppError('Invalid quantity', 400)
  }
  if (
    typeof numericPrice !== 'number' ||
    Number.isNaN(numericPrice) ||
    numericPrice < 0
  ) {
    throw new AppError('Invalid price', 400)
  }

  const newProduct = await productsRepository.postProduct(
    name,
    numericPrice,
    NumericCategoryId,
    numericQuantity,
  )

  return newProduct
}

async function getAllProducts() {
  return await productsRepository.getAllProducts()
}

async function getProductById(id) {
  if (!Number.isInteger(id)) {
    throw new AppError('Invalid product id', 400)
  }
  const product = await productsRepository.getProductById(id)
  if (!product) {
    throw new AppError('Product not found', 404)
  }
  return product
}

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
}
