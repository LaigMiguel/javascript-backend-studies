const categoriesService = require('../service/categoriesService')

async function postCategorie(req, res, next) {
  try {
    const { name } = req.body || {}
    const newCategorie = await categoriesService.postCategorie(name)
    return res.status(201).json(newCategorie)
  } catch (error) {
    next(error)
  }
}

async function getCategories(req, res, next) {
  try {
    const categories = await categoriesService.getCategories()
    return res.status(200).json(categories)
  } catch (error) {
    next(error)
  }
}

async function getCategorieByIdOrThrow(req, res, next) {
  try {
    const id = Number(req.params.id)
    const categorie = await categoriesService.getCategorieByIdOrThrow(id)
    return res.status(200).json(categorie)
  } catch (error) {
    next(error)
  }
}

async function updateCategorieName(req, res, next) {
  try {
    const id = Number(req.params.id)
    const { name } = req.body
    const updatedCategorie = await categoriesService.updateCategorieName(
      name,
      id,
    )
    return res.status(200).json(updatedCategorie)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  postCategorie,
  getCategories,
  getCategorieByIdOrThrow,
  updateCategorieName,
}
