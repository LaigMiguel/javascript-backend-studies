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

module.exports = {
  postProduct,
  getProducts,
}
