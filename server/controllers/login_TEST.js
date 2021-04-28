require("dotenv").config();
const pool = require('../config/database')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const { validationResult } = require('express-validator')

exports.login = async (req, res) => {
	// const { email, password } = req.body
	const { userName, password } = req.body

	try {
		// const secret = require('crypto').randomBytes(64).toString('hex')

		// find the user
		// const user = await User.findOne({ where: { userName } })
		//2. check if user exists in the db (user need to be exist to be able to login) (if not exists, then throw error)
		const user = await pool.query("SELECT * FROM users WHERE user_name = $1", [
			user_name
		]);
		console.log(user);
		// if (user.rows.length === 0) {
		// 	return res.status(401).json("Invalid Credential");
		// }

		// check if user found
		if (!user) return res.status(404).json({ message: 'User not found!' })

		// check if password matches
		body.password = bcrypt.hashSync(pwd, bcrypt.genSaltSync(10));
		if (!bcrypt.compareSync(body.password, user.password)) return res.status(401).json({ message: 'Incorrect password!' })

		// generate auth token
		const userWithToken = generateToken(user({ raw: true }))
		// userWithToken.user.avatar = user.avatar

		// return res.send(secret)
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
