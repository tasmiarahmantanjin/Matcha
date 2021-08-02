const router = require('express').Router()
const { likeNotification } = require('../controllers/notificationController')

router.post('/', likeNotification)

console.log(`Request body in router/notification for sending notification: `)
// console.log(req.body)
console.log('Endpoint hit: Notification')

// router.post('/', notification)

// router.patch('/:id', notification)

// router.patch('/', notification)

module.exports = router
