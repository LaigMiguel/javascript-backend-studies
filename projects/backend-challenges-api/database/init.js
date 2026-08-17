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

db.run(
  `
  CREATE TABLE IF NOT EXISTS phones (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_id INTEGER,
  phone TEXT,
  FOREIGN KEY (customer_id) REFERENCES users(id)
  )`,
  (error) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Table created')
  },
)
