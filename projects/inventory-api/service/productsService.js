const categoriesService = require('./categoriesService')
const productsRepository = require('../repository/productsRepository')
const AppError = require('../errors/AppError')
const { application } = require('express')

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

async function updateProduct(name, price, category_id, quantity, id) {
  if (
    name === undefined &&
    price === undefined &&
    category_id === undefined &&
    quantity === undefined
  ) {
    throw new AppError('No data provided for update', 400)
  }

  const product = await getProductById(id)

  const nameProvided = name !== undefined
  const priceProvided = price !== undefined
  const categoryIdProvided = category_id !== undefined
  const quantityProvided = quantity !== undefined

  if (!nameProvided) {
    name = product.name
  }
  if (!priceProvided) {
    price = product.price
  }
  if (!categoryIdProvided) {
    category_id = product.category_id
  }
  if (!quantityProvided) {
    quantity = product.quantity
  }

  if (nameProvided) {
    if (typeof name !== 'string' || name.trim() === '') {
      throw new AppError('Invalid product name', 400)
    }
  }

  if (priceProvided) {
    if (typeof price !== 'number' || Number.isNaN(price) || price < 0) {
      throw new AppError('Invalid price', 400)
    }
  }

  if (categoryIdProvided) {
    if (!Number.isInteger(category_id) || category_id < 0) {
      throw new AppError('Invalid category_id', 400)
    }
    await categoriesService.getCategorieByIdOrThrow(category_id)
  }

  if (quantityProvided) {
    if (!Number.isInteger(quantity) || quantity < 0) {
      throw new AppError('Invalid quantity', 400)
    }
  }

  await productsRepository.updateProduct(name, price, category_id, quantity, id)

  const updatedProduct = await getProductById(id)
  return updatedProduct
}

module.exports = {
  postProduct,
  getAllProducts,
  getProductById,
  updateProduct,
}
