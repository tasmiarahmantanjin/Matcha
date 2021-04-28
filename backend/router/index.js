const router = require('express').Router();

router.get('/home', (req, res) => {
	return res.send('Home Screen is working');
})

router.use('/', require('./auth'))

// API end-point for update Use profile
router.use('/users', require('./user'))

// route for verifyUserRegistration
router.use('/verify', require('./verify'))


module.exports = router;