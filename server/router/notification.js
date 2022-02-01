const router = require('express').Router()
const { getNotifications, sendNotifications, notification3, notification4 } = require('../controllers/notificationController')
const { auth } = require('../middleware/auth')

router.get('/', [auth], getNotifications)

router.post('/', [auth], sendNotifications)

router.patch('/', [auth], notification3)

// router.patch('/:id', [auth], notification4)
module.exports = router
