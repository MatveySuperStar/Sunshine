const Router = require('express')
const router = new Router()
const placesController = require('../controllers/placesController')

const {check, body} = require('express-validator')

router.get('/', /*authMiddleware,*/ placesController.getAll)

router.post('/add', [
  check('nameCentre', 'Заполниет поле Город').notEmpty(),
  check('latitude', 'Заполниет поле Широта').notEmpty(),
  check('longitude', 'Заполниет поле Долгота').notEmpty(),
], placesController.add)

router.put('/put', [
  check('nameCentre', 'Заполниет поле Город').notEmpty(),
  check('latitude', 'Заполниет поле Широта').notEmpty(),
  check('longitude', 'Заполниет поле Долгота').notEmpty(),
], placesController.put)

router.delete('/delete', placesController.delete)


module.exports = router