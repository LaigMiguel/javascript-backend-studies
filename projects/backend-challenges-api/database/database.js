const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./database/database.sqlite')
db.run('PRAGMA foreign_keys = ON')
module.exports = db
