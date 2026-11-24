const db = require('.//database')

db.run(`CREATE TABLE IF NOT EXISTS accounts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        login TEXT NOT NULL UNIQUE,
        password TEXT
  )`)

db.run(`CREATE TABLE IF NOT EXISTS characters(
        id  INTEGER PRIMARY KEY AUTOINCREMENT,
        account_id INTEGER NOT NULL,
        name TEXT NOT NULL UNIQUE,
        class TEXT,
        level INTEGER,
        FOREIGN KEY (account_id) REFERENCES accounts(id)
  )`)

db.run(`CREATE TABLE IF NOT EXISTS items(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        level INTEGER NOT NULL,
        requirements TEXT,
        sell_price INTEGER NOT NULL,
        max_stack INTEGER NOT NULL
  )`)

db.run(`CREATE TABLE IF NOT EXISTS inventories(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        character_id INTEGER NOT NULL UNIQUE,
        capacity INTEGER NOT NULL,
        money INTEGER NOT NULL,
        FOREIGN KEY (character_id) REFERENCEs characters(id)
  )`)

db.run(`CREATE TABLE IF NOT EXISTS inventory_items(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        inventory_id INTEGER NOT NULL,
        item_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        FOREIGN KEY (inventory_id) REFERENCES inventories(id),
        FOREIGN KEY (item_id) REFERENCES items(id),
        UNIQUE (inventory_id, item_id)
  )`)
