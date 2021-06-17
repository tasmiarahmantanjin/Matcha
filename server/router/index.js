const router = require('express').Router();

router.get('/home', (req, res) => {
  console.log('Endpoint hit: home screen')
	return res.send('Home Screen is working');
})

router.get('/bullshit', (req, res) => {
  console.log('Endpoint hit: bullshit')
	return res.send('Bullshit is working');
})

/*router.post('/matches', (req, res) => {
  console.log('Endpoint hit: matches')
	return res.send('Matches is working, kinda.');
})*/

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


/*router.post('/matches', function(req, res){
  console.log(`Request body in router/index: `)
  console.log(req.body)
  console.log('Endpoint hit: Matches');
})*/
// @route	POST localhost:5000/matches
// @desc	API end-point for getting matches
// @access	Public
router.use('/matches', require('./matches'))

// route for verifyUserRegistration
// router.use('/registrationVerify', require('./registrationVerify'))

module.exports = router;