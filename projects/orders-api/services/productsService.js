const productsRepository = require('../repositories/productsRepository')
const AppError = require('../errors/AppError')

async function postProduct(name, stock, price) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid name', 400)
  }
  const normalizedName = name.trim().toLowerCase()

  if (!/^[A-Za-zà-ÿ ]+$/.test(normalizedName)) {
    throw new AppError('Name contains invalid characters', 400)
  }

  if (!Number.isInteger(stock) || stock < 0) {
    throw new AppError('Invalid stock quantity', 400)
  }

  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    Math.abs(price * 100 - Math.round(price * 100)) > 0.000001
  ) {
    throw new AppError('Invalid price', 400)
  }

  const newProduct = await productsRepository.postProduct(
    normalizedName,
    stock,
    price,
  )

  return newProduct
}

async function getProducts() {
  return await productsRepository.getProducts()
}

async function getProductsByIdOrThrow(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Invalid id', 400)
  }

  const product = await productsRepository.getProductsById(id)
  if (!product) {
    throw new AppError('Product not found', 404)
  }

  return product
}

async function updateProduct(id, name, stockQuantity, price) {
  const product = await getProductsByIdOrThrow(id)

  if (name === undefined) {
    name = product.name
  }
  if (stockQuantity === undefined) {
    stockQuantity = product.stock_quantity
  }
  if (price === undefined) {
    price = product.price
  }

  const normalizedName = name.trim().toLowerCase()
  if (!/^[a-zA-Zà-ÿ ]+$/.test(normalizedName)) {
    throw new AppError('Name contains invalid characters', 400)
  }

  if (!Number.isInteger(stockQuantity) || stockQuantity < 0) {
    throw new AppError('Stock quantity amount is invalid', 400)
  }

  if (
    !Number.isFinite(price) ||
    price <= 0 ||
    Math.abs(price * 100 - Math.round(price * 100)) > 0.000001
  ) {
    throw new AppError('Invalid price amount', 400)
  }

  await productsRepository.updateProduct(
    id,
    normalizedName,
    stockQuantity,
    price,
  )

  const updatedProduct = await getProductsByIdOrThrow(id)
  return updatedProduct
}

async function deleteProduct(id) {
  await getProductsByIdOrThrow(id)
  await productsRepository.deleteProduct(id)
}

module.exports = {
  postProduct,
  getProducts,
  getProductsByIdOrThrow,
  updateProduct,
  deleteProduct,
}
