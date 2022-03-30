require('dotenv').config()
const express = require('express')
const router = require('./routes')
const cors = require('cors')
const errorMiddleware = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server ${5000}`)
})