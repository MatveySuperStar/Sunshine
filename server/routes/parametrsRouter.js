const Router = require('express')
const router = new Router()
const ParametrsController = require('../controllers/parametrsController')

const {check, body} = require('express-validator')


router.get('/', /*authMiddleware,*/ ParametrsController.getAll)

module.exports = router