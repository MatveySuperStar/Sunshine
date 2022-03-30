const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const {check, body} = require('express-validator')

router.get('/', UserController.getAll)

router.post('/registration', [
    check('email', 'Email не соответствует требованиям').isEmail(),
    check('password', 'Пароль должен иметь от 5 до 15 символов').isLength({min: 5, max: 15}),
    check('phone', 'Телефон не соответствует требованиям').isMobilePhone(),
    check('name', 'Заполните Имя').notEmpty(),
    check('surname', 'Заполните Фамилию').notEmpty(),
    check('patronymic', 'Заполните Отчество').notEmpty()
  ], 
 UserController.registration)

router.delete('/delete', UserController.delete)

router.put('/put', [
  check('email', 'Email не соответствует требованиям').isEmail(),
  check('password', 'Пароль должен иметь от 5 до 15 символов').isLength({min: 5, max: 15}),
  check('phone', 'Телефон не соответствует требованиям').isMobilePhone(),
  check('name', 'Заполните Имя').notEmpty(),
  check('surname', 'Заполните Фамилию').notEmpty(),
  check('patronymic', 'Заполните Отчество').notEmpty()
], 
UserController.put)

router.post('/login', [
    check('email', 'Email не соответствует требованиям').isEmail(),
    check('password', 'Пароль должен иметь от 5 до 15 символов').isLength({min: 5, max: 15})
  ], 
UserController.login)

router.get('/auth', authMiddleware, UserController.check)

module.exports = router