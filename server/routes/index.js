const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')

router.use('/user', userRouter)
router.use('/group', groupRouter)

module.exports = router