const { body } = require('express-validator')

exports.rules = (() => {
	return [
		// body('email').isEmail()
		// I need to change email to userName to be able to login
		body('userName').notEmpty().isLength({ min: 3 })
	]
})()