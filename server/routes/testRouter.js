const Router = require('express')
const router = new Router()
const TestController = require('../controllers/testController')

const {check, body} = require('express-validator')

router.get('/getOne', /*authMiddleware,*/ TestController.getOne)

router.get('/', /*authMiddleware,*/ TestController.getAll)

router.post('/add', TestController.add)

router.put('/put', TestController.put)

router.put('/delete', TestController.put)

module.exports = router