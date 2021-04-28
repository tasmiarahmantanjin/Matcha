const router = require('express').Router()
const { login, register, registrationVerify } = require('../controllers/authController')
// const { registrationVerify } = require('../controllers/registrationVerify')

const { validate } = require('../validators')
const { rules: registrationRules } = require('../validators/auth/register')
const { rules: loginRules } = require('../validators/auth/login')

router.post('/login', [loginRules, validate], login)

router.post('/register', [registrationRules, validate], register)

router.get('/registrationVerify', registrationVerify)

module.exports = router