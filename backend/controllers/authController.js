const User = require('../models').User
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/app')
const { validationResult } = require('express-validator')

exports.login = async (req, res) => {
	// const { email, password } = req.body
	const { userName, password } = req.body


	try {
		const secret = require('crypto').randomBytes(64).toString('hex')

		// find the user
		const user = await User.findOne({

			where: {
				// email
				userName
			}
		})

		//! Need to check if user is verified or not by using following code: TEST CODE START
		/*
		if (user.status != "Active") {
			return res.status(401).send({
			  message: "Pending Account. Please Verify Your Email!",
			});
		}
		*/
		//! TEST CODE END


		// check if user found
		if (!user) return res.status(404).json({ message: 'User not found!' })

		// check if password matches
		if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' })

		// generate auth token
		const userWithToken = generateToken(user.get({ raw: true }))
		userWithToken.user.avatar = user.avatar

		// return res.send(secret)
		return res.send(userWithToken)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}

exports.register = async (req, res) => {

	try {
		const user = await User.create(req.body)

		const userWithToken = generateToken(user.get({ raw: true }))
		// to render avatar properly
		userWithToken.user.avatar = user.avatar

		return res.send(userWithToken)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}

// Function to generate token
const generateToken = (user) => {

	delete user.password

	// payload is user in this case
	const token = jwt.sign(user, config.appKey, { expiresIn: 86400 })

	return { ...{ user }, ...{ token } }
}
