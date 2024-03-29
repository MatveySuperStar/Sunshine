const Router = require('express')
const router = new Router()
const GroupController = require('../controllers/groupController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const {body, check} = require('express-validator')

router.get('/', GroupController.getAll)

router.get('/accessTest', GroupController.accessTest)

router.post('/likeGroup', GroupController.like)

router.post('/add', check('name', 'Название группы не должно быть пустым').notEmpty(), GroupController.add)

router.put('/put', [
  check('id').notEmpty(),
  check('name', 'Название группы не должно быть пустым').notEmpty(),
], GroupController.put)

router.delete('/delete', GroupController.delete)

module.exports = router