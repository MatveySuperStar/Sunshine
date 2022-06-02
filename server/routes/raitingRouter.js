const Router = require('express')
const router = new Router()
const RaitingController = require('../controllers/raitingController')

const {check, body} = require('express-validator')

router.post('/add', RaitingController.add)

router.get('/', RaitingController.all)

router.get('/getUserRating', RaitingController.getUserRating)

router.get('/getMyRating', RaitingController.getMyRating)

router.get('/getGroupRating', RaitingController.getGroupRating)

router.get('/getGroupUsersRating', RaitingController.getGroupUsersRating)

router.get('/getMyRating', RaitingController.getMyRating)

router.delete('/deleteAllGroupRating', RaitingController.deleteAllGroupRating)

router.delete('/deleteOneGroupRating', RaitingController.deleteOneGroupRating)

module.exports = router