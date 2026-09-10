const db = require('../database/database')

function postCategorie(name) {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO categories(name) VALUES (?)', [name], function (error) {
      if (error) {
        reject(error)
        return
      }

      const newCategorie = {
        id: this.lastID,
        name,
      }
      resolve(newCategorie)
    })
  })
}

function getCategories() {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM categories', (error, rows) => {
      if (error) {
        reject(error)
        return
      }
      resolve(rows)
    })
  })
}

function getCategorieByIdOrThrow(id) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM categories WHERE categories.id = ?',
      [id],
      (error, row) => {
        if (error) {
          reject(error)
          return
        }
        resolve(row)
      },
    )
  })
}

function updateCategorieName(newName, id) {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE categories SET name = ? WHERE id = ?',
      [newName, id],
      function (error) {
        if (error) {
          reject(error)
          return
        }
        resolve(this.changes)
      },
    )
  })
}

module.exports = {
  postCategorie,
  getCategories,
  getCategorieByIdOrThrow,
  updateCategorieName,
}
