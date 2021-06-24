const router = require('express').Router();

router.get('/home', (req, res) => {
  console.log('Endpoint hit: home screen')
	return res.send('Home Screen is working');
})

router.get('/bullshit', (req, res) => {
  console.log('Endpoint hit: bullshit')
	return res.send('Bullshit is working');
})

router.get('/profile/:id', function (req, res) {
  res.send(req.params)
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
const { getUserById } = require('../controllers/profileController')
router.post('/profile', function(req, res){
  //console.log(`Request body in router/index: `)
  //console.log(req.body)
  //console.log('Endpoint hit: Profile')
  return(getUserById(req, res))
})
// @route	POST localhost:5000/profile
// @desc	API end-point for getting profile
// @access	Public
//router.use('/profile', require('./profile'))

//router.use('/like', require('./matches'))
const { likeUser } = require('../controllers/profileController')
router.post('/like', function(req, res){
  //console.log(`Request body in router/index for like user: `)
  //console.log(req.body)
  //console.log('Endpoint hit: Like')
  return(likeUser(req, res))
})

const { getLike } = require('../controllers/profileController')
router.post('/getLike', function(req, res){
  //console.log(`Request body in router/index for getLike: `)
  //console.log(req.body)
  //console.log('Endpoint hit: getLike')
  return(getLike(req, res))
})

const { unlikeUser } = require('../controllers/profileController')
router.post('/unlike', function(req, res){
  //console.log(`Request body in router/index for unlikeUser: `)
  //console.log(req.body)
  //console.log('Endpoint hit: Unlike')
  return(unlikeUser(req, res))
})
//router.use('/like', require('./profile'))

//const { isOnline } = require('../middleware/isOnline')
//const pool = require('../config/database');
const { logout } = require('../controllers/authController')
router.post("/logout", function(req, res){
  console.log(`Request body in router/index for logout: `)
  console.log(req.body)
  console.log('Endpoint hit: Logout')
    return(logout(req, res))
})

// route for verifyUserRegistration
// router.use('/registrationVerify', require('./registrationVerify'))

module.exports = router;