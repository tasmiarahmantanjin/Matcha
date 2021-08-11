const router = require('express').Router()
const { notification1, notification2, notification3, notification4 } = require('../controllers/notificationController')
const { auth } = require('../middleware/auth')

router.get('/', [auth], notification1)

router.post('/', [auth], notification2)

router.patch('/', [auth], notification3)

router.patch('/:id', [auth], notification4)


module.exports = router
