const Router = require('express')
const router = new Router()
const KursController = require('../controllers/kursController')

const {check, body} = require('express-validator')

router.post('/add', KursController.add)

router.get('/', KursController.get)

router.delete('/delete', KursController.delete)

router.put('/put', KursController.update)

module.exports = router