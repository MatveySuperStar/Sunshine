require('dotenv').config()
const express = require('express')
const router = require('./routes')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 5000

const app = express()
app.use(fileUpload())
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200
}))
app.use(function(req, res, next) {

  res.setHeader('Access-Control-Expose-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'HEAD, GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-*, Origin, X-Requested-With, Content-Type, Accept, Authorization');
   res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(express.json())
app.use(cookieParser())
app.use('/api', router)
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`server ${5000}`)
})