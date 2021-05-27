const router = require('express').Router()
const { forgotPassword, resetPassword } = require('../controllers/resetPasswordController')

const { validate } = require('../validators')
const { rules: forgotPasswordRules } = require('../validators/resetPassword/forgotPassword')
const { rules: resetPasswordRules } = require('../validators/resetPassword/resetPassword')

router.post('/forgotPassword', [forgotPasswordRules, validate], forgotPassword)

router.post('/resetPassword', [resetPasswordRules, validate], resetPassword)

//router.get('/resetPassword', [resetPasswordRules, validate], resetPassword)

module.exports = router