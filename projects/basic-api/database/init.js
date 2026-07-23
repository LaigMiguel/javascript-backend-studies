const db = require('./database.js')

db.run(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT
  )
`,
  (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Table created')
  },
)
