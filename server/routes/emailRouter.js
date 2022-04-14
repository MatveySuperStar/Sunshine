const Router = require('express')
const router = new Router()
const EmailController = require('../controllers/emailController')
const authMiddleware = require('../middleware/authMiddleware')
const checkRole = require('../middleware/checkRoleMiddleware')
const {body, check} = require('express-validator')

router.post('/send',[
  check('email', 'Email не соответствует требованиям').isEmail(),
  check('phone', 'Телефон не соответствует требованиям').isMobilePhone(),
  check('name', 'Заполните Имя').notEmpty(),
  check('message', 'Заполните поле с сообщением').notEmpty()
], EmailController.send)

module.exports = router