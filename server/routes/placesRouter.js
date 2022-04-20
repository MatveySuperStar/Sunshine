const Router = require('express')
const router = new Router()
const placesController = require('../controllers/placesController')

const {check, body} = require('express-validator')

router.get('/', /*authMiddleware,*/ placesController.getAll)

router.post('/add', placesController.add)

router.put('/put', placesController.put)

router.delete('/delete', placesController.delete)


module.exports = router