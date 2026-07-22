const db = require('./database/database.sqlite')

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
