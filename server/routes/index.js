const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const emailRouter = require('./emailRouter')

router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/email', emailRouter)

module.exports = router