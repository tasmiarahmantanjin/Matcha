const router = require('express').Router();

router.get('/home', (req, res) => {
  console.log('Endpoint hit: home screen')
	return res.send('Home Screen is working');
})

router.get('/bullshit', (req, res) => {
  console.log('Endpoint hit: bullshit')
	return res.send('Bullshit is working');
})

// @route   POST localhost:5000/login
// @route   POST localhost:5000/registration
// @route   GET localhost:5000/registrationVerify
// @desc    User Registration, Registration Verification & Login
// @access  Public
router.use('/', require('./auth'))

// @route	POST localhost:5000/forgotPassword
// @route	POST localhost:5000/resetPassword
// @desc	Reset Password
// @access	Public
router.use('/', require('./resetPassword'))

// @route	POST localhost:5000/users/update
// @desc	API end-point for update User profile information
// @access	Public
router.use('/users', require('./user'))

// route for verifyUserRegistration
// router.use('/registrationVerify', require('./registrationVerify'))

module.exports = router;