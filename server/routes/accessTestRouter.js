const Router = require('express')
const router = new Router()
const AccessTestController = require('../controllers/accessTestController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const {body, check} = require('express-validator')

router.get('/', AccessTestController.getAll)

router.post('/add', check('name', 'Название группы не должно быть пустым').notEmpty(), AccessTestController.add)

router.put('/put', AccessTestController.put)

router.delete('/delete', AccessTestController.delete)

module.exports = router