const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./database/database.sqlite')
module.exports = db
