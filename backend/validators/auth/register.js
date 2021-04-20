const { body } = require('express-validator')

exports.rules = (() => {
	return [
		body('firstName').notEmpty().isAlpha().isLength({ min: 3 }),
		body('lastName').notEmpty().isAlpha().isLength({ min: 3 }),
		body('userName').notEmpty().isLength({ min: 3 }),
		body('gender').notEmpty().isAlpha(),
		body('email').isEmail(),

		/*
		body("password").isStrongPassword({
			minLength: 6,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1
		})
			.withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number") */
		/*
		body('password')
			.isLength({ min: 6 })
			.matches(/\d/)
			.withMessage('Password must be greater than 6 character with at least one number') */

		body("password")
			.isLength({ min: 6 }).withMessage('Password Must Be at Least 6 Characters')
			.matches('[0-9]').withMessage('Password Must Contain a Number')
			.matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
		// .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
	]
})()