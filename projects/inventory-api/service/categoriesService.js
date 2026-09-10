const categoriesRepository = require('../repository/categoriesRepository')
const AppError = require('../errors/AppError')

async function postCategorie(name) {
  if (typeof name !== 'string' || name.trim() === '') {
    throw new AppError('Invalid categorie name', 400)
  }

  const categorieWithoutAccent = name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const normalizedCategorieName = categorieWithoutAccent
    .toLowerCase()
    .replace(/[0-9]/g, '')
  const newCategorie = await categoriesRepository.postCategorie(
    normalizedCategorieName,
  )

  return newCategorie
}

async function getCategories() {
  return await categoriesRepository.getCategories()
}

async function getCategorieByIdOrThrow(id) {
  if (Number.isNaN(id)) {
    throw new AppError('Invalid id', 400)
  }
  const categorie = await categoriesRepository.getCategorieByIdOrThrow(id)
  if (!categorie) {
    throw new AppError('Categorie not found', 404)
  }
  return categorie
}

async function updateCategorieName(newName, id) {
  await getCategorieByIdOrThrow(id)

  if (typeof newName !== 'string' || newName.trim() === '') {
    throw new AppError('Invalid name', 400)
  }

  const nameWithoutAccent = newName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

  const normalizedName = nameWithoutAccent.toLowerCase().replace(/[0-9]/g, '')

  const changes = await categoriesRepository.updateCategorieName(
    normalizedName,
    id,
  )
  if (changes === 0) {
    throw new AppError('Unable to update categorie', 404)
  }

  const updatedCategorie = await getCategorieByIdOrThrow(id)
  return updatedCategorie
}

module.exports = {
  postCategorie,
  getCategories,
  getCategorieByIdOrThrow,
  updateCategorieName,
  updateCategorieName,
}
