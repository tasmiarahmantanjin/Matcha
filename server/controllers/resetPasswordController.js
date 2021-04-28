const resetRouter = require('express').Router()
const db = require('../config/database')
const crypto = require('crypto')
const util = require('../utils/resetEmail')
const bcrypt = require('bcryptjs')
const resetEmail = require('../utils/resetEmail')

exports.forgotPassword = (req, resp) => {
	db.query('SELECT email from users WHERE email = $1', [req.body.email], (err, res) => {
		if (res && res.rows[0]) {
			crypto.randomBytes(32, (err, buffer) => {
				if (err)
					console.log(err)
				const token = buffer.toString('hex')
				db.query('UPDATE users SET token = $1 WHERE email = $2', [token, req.body.email], (err, res) => {
					if (res) {
						resetEmail(req.body.email, token)
						resp.status(200).send({ message: 'Check your email' })
					}
					else
						resp.status(500).send(err)
				})
			})
			//resp.status(200).send(res.rows[0])
		}
		else if (res)
			resp.status(401).send({ error: 'No user found with that email' })
		else
			resp.status(500).send({ error: err.detail })
	})
}

exports.resetPassword = async (req, resp) => {
	const token = req.body.token
	console.log(token);
	const saltRounds = 10
	const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

	db.query('SELECT token FROM users WHERE token = $1', [token], (err, res) => {
		if (res && res.rows[0]) {
			db.query('UPDATE users SET password = $1 WHERE token = $2', [hashedPassword, token], (err, re) => {
				if (re)
					resp.status(200).send({ message: 'Password has been changed' })
				else
					resp.status(500).send(err)
			})
		}
		else if (res)
			resp.status(500).send({ error: 'No token found' })
		else
			resp.status(500).send({ error: err.detail })
	})
}

/*
const pool = require('../config/database')
const accountHelper = require('./authControllerHelper');
const resetEmail = require('../utils/resetEmail');
const crypto = require('crypto')
const bcrypt = require('bcryptjs')

// @route   POST /forgotPassword
// @desc    Send the reset password email link
// @access  Public
exports.forgotPassword = async (req, res) => {
	// De-structure the req.body
	const { email } = req.body;

	// Check if user entered any email or not
	if (!email) {
		return res.status(400).json('Field can not be empty');
	}

	// Find the user from database
	const user = await accountHelper.findUserInfo('email', email, 'user_id', 'user_name');
	console.log(user);

	if (!user) {
		return res.status(404).json('This email address doesn’t match with any account! Check & Try again!');
	}

	// Check if account activated or not
	if (user.verified === 0) {
		return res.status(426).json('Account is not activated yet, please check your email!');
	}

	// Create new token to reset password
	const token = crypto.randomBytes(42).toString('hex');

	// Update the token inside database with freshly generated token
	await accountHelper.updateAccount(user.user_id, { token: token });

	// Send email to reset the password
	return res.json(resetEmail(email, token));
};

// @route   POST /resetPassword
// @desc    Let user to reset their password
// @access  Public
exports.resetPassword = async (req, res) => {
	const { email } = req.body;

	const { password, confirmPassword } = req.body;

	if ( !password || !confirmPassword) {
		return res.json({ error: ['Fields can not be empty'] });
	}

	// let errors = accountHelper.validatePassword(password, confirmPassword);

	// if (Object.keys(errors).length != 0) {
	// 	return res.json({ errors: errors });
	// }

	// let result = await accountModel.findUserInfo('user_id', userId, 'token', 'status');
	const result = await accountHelper.findUserInfo('email', email, 'user_id', 'user_name', 'verified');
	console.log('hhhjfjsahfkjafhjk');
	console.log(result);
	console.log('hhhjfjsahfkjafhjk');
	if (!result || result.token !== token || result.verified === 0) {
		// if someone is trying to find valid token
		if (result.verified != 0) {
			await accountHelper.updateAccount({ token: null });
		}

		return res.json({ error: ['Token is not valid, please, resent the link'] });
	}

	await accountModel.updateAccount({
		password: await bcrypt.hash(password, 10),
		token: null,
	});

	return res.json({ msg: 'Your password was updated.' });
};

/*
exports.resetPassword = async (req, resp) => {
	// De-structure the request.body
	const { token, new_password } = req.body;

	// Bcrypt the password
	const saltRounds = 10
	const hashedPassword = await bcrypt.hash(new_password, saltRounds)
	
	// Find the old token from DB
	pool.query('SELECT token FROM users WHERE token = $1', [token], (err, res) => {
		if (res && res.rows[0]) {
			// If token found then UPDATE the new hashedPassword into DB
			pool.query('UPDATE users SET password = $1 WHERE token = $2', [hashedPassword, token], (err, re) => {
				if (re)
					resp.status(200).send({ message: 'Password has been changed successfully!' })
				else
					resp.status(500).send(err)
			})
		}
		else if (res)
			resp.status(500).send({ error: 'No token found' })
		else
			resp.status(500).send({ error: err.detail })
	})
} */
