const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  keepAliveInitialDelay: 10000,
   enableKeepAlive: true,
}).promise()

connection.connect( error => {
  if(error) {
    return console.log('Ошибка подключения')
  } else {
    return console.log('Подключение успешно')
  }
})

module.exports = connection