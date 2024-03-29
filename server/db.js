const mysql = require('mysql2')

const connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  waitForConnections: true,
  connectionLimit: 100,
  queueLimit: 0,
  debug: false,
  connectTimeout: 1000000
}).promise()



module.exports = connection