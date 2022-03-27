require('dotenv').config()
const express = require('express')
const router = require('./routes')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use('/api', router)

app.listen(PORT, () => {
  console.log(`server ${5000}`)
})