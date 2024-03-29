const Router = require('express')
const router = new Router()
const UserController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const {check, body} = require('express-validator')

router.get('/', /*checkRole('Преподаватель'),*/ UserController.getAll)

router.get('/getTeacher', /*checkRole('Преподаватель'),*/ UserController.getTeacher)

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
  check('phone', 'Телефон не соответствует требованиям').isMobilePhone(),
  check('name', 'Заполните Имя').notEmpty(),
  check('surname', 'Заполните Фамилию').notEmpty(),
  check('patronymic', 'Заполните Отчество').notEmpty()
], 
UserController.put)

router.put('/putUserGroup', [
  check('idGroup', '').notEmpty(),
  check('idUser', 'Пользователь не найден').notEmpty(),
], 
UserController.putUserGroup)

router.get('/like', 
UserController.like)

router.post('/login', [
    check('email', 'Email не соответствует требованиям').isEmail(),
    check('password', 'Пароль должен иметь от 5 до 15 символов').isLength({min: 5, max: 15})
  ], 
UserController.login)

router.get('/refresh', UserController.refresh)

router.put('/patchGroup', UserController.patchGroup)

router.get('/logout', UserController.logout)

module.exports = router