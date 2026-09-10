const db = require('./database.js')

db.run(`CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT
  )
`)

db.run(`CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price REAL,
  category_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (category_id) REFERENCES categories(id)
  )
`)
db.run(`CREATE TABLE IF NOT EXISTS stock_movements (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  type TEXT,
  quantity INTEGER,
  created_at TEXT,
  FOREIGN KEY (product_id) REFERENCES products(id)
  )
`)
