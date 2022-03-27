const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')

router.get('/', UserController.getAll)
router.post('/registration', checkRole('ADMIN'), UserController.registration)
router.delete('/delete', UserController.delete)
router.put('/update', UserController.put)
router.post('/login', UserController.login)
router.get('/auth', authMiddleware, UserController.check)

module.exports = router