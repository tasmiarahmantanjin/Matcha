// This file contains all the rules form userUpdate form validations
const { body } = require('express-validator')

exports.rules = (() => {
	return [
		body('firstName').notEmpty().isAlpha().isLength({ min: 3 }),
		body('lastName').notEmpty().isAlpha().isLength({ min: 3 }),
		// body('userName').notEmpty().isLength({ min: 3 }),
		body('gender').notEmpty().isAlpha(),
		body('email').isEmail(),
		body("password")
			.isLength({ min: 6 }).withMessage('Password Must Be at Least 6 Characters')
			.matches('[0-9]').withMessage('Password Must Contain a Number')
			.matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
	]
})()