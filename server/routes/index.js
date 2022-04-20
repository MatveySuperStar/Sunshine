const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const groupRouter = require('./groupRouter')
const emailRouter = require('./emailRouter')
const testRouter = require('./testRouter')
const parametrsRouter = require('./parametrsRouter')
const accessTestRouter = require('./accessTestRouter')
const placesRouter = require('./placesRouter')

router.use('/user', userRouter)
router.use('/group', groupRouter)
router.use('/email', emailRouter)
router.use('/test', testRouter)
router.use('/parametrs', parametrsRouter)
router.use('/accessTest', accessTestRouter)
router.use('/places', placesRouter)

module.exports = router