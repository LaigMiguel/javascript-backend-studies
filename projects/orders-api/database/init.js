const db = require('./database.js')

db.run(`CREATE TABLE IF NOT EXISTS client(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT      
)`)

db.run(`CREATE TABLE IF NOT EXISTS product(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        stock_quantity INTEGER,
        price REAL
)`)

db.run(`CREATE TABLE IF NOT EXISTS orders(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        status TEXT,
        FOREIGN KEY (client_id) REFERENCES client(id)

)`)

db.run(`CREATE TABLE IF NOT EXISTS products_order(
        order_id INTEGER,
        product_id INTEGER,
        quantity INTEGER,
        product_price REAL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES product(id)
)`)

db.run(`CREATE TABLE IF NOT EXISTS stock_movement(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_id INTEGER,
          quantity INTEGER,
          type TEXT,
          created_at TEXT,
          FOREIGN KEY (product_id) REFERENCES product(id)
)`)
