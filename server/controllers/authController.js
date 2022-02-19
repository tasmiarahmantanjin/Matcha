const pool = require('../config/database')
const generateToken = require('../utils/generateToken')
const sendEmail = require('../utils/email')
const { getLocation } = require('../utils/location')
const { updateAccount } = require('./authControllerHelper');
const { updateTime } = require('./authControllerHelper');


const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const { validationResult } = require('express-validator')

// @route   POST /login
// @desc    Login as a user
// @access  Public
exports.login = async (req, res) => {
	try {
		const { user_name, password } = req.body
		//1. Find the user
		const user = await findUserInfo('user_name', user_name.toLowerCase());

		//2. Check if user found
		if (!user) return res.status(404).json({ message: 'User not found!' })

		//3. Check if password matches and fields are not empty
		if (!user_name || !password) return res.status(400).json('Fields can not be empty');
		if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' });

		//4. Check if user is verified or not
		// // //! TODO: NEED TO CHECK IF USER IS VERIFIED OR NOT, IF NOT THEN SEND A ERROR MESSAGE THAT USER IS NOT VERIFIED
		if (user.verified === 0){
			return res.status(426).json('Your account is not activated yet. Please, verify your account first!')
		}

		//!TODO: NEED TO SET THE USER ONLINE ONCE LOGIN & get the user location
		const location = await getLocation(req);
		// Once login user will be in online
		location.online = 1;
		await updateAccount(user.user_id, location)
    const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
    console.log(time)
    await updateTime(user.user_id, time)

		//4. Generate auth token
		const userWithToken = generateToken(user)
		userWithToken.user.avatar = user.avatar
    console.log(userWithToken)

		return res.send(userWithToken)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}

const findUserInfo = async (key, value, ...args) => {
	const info = args.length == 0 ? '*' : args.join(', ');
	const res = await pool.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
	return res.rows[0];
};

// @route   POST /register
// @desc    Create new user
// @access  Public
exports.register = async (req, res) => {
	try {
    //console.log('Endpoint hit: register.')
		//1. De-structure the req.body(first_name, last_name, user_name, email, password, token)
		const { first_name, last_name, user_name, email, gender, password, token } = req.body

		//2. check if user exists in the db (if not exists, then throw error)
		const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

		// if user exists, then throw error
		if (user.rows.length !== 0) {
			return res.status(401).send("User already exits")
		}

		//3. Bcrypt the user password
		const saltRound = 10;
		const salt = await bcrypt.genSalt(saltRound);
		const bcryptPassword = await bcrypt.hash(password, salt);

		//4. generating RANDOM token for validation with crypto or jwt
		const jwtToken = crypto.randomBytes(42).toString('hex');

		//5. create & enter the new user info with generated token inside my database
		const newUser = await pool.query("INSERT INTO users (first_name, last_name, user_name, email, gender, password, token, avatar, blocked_users, interest) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [first_name, last_name, user_name, email, gender, bcryptPassword, jwtToken, 'default.png', '{}', '{}']);
		res.json(newUser.rows[0]);

		//6. Finally send the email to verify the registration
		return res.json(sendEmail(email, jwtToken))
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
}

// @route   GET /registrationVerify
// @desc    Email verification of user registration
// @access  Public
exports.registrationVerify = ('/registrationVerify', (req, resp) => {
	pool.query('UPDATE users SET verified = 1 WHERE token = $1',
		[req.query.token], (err, res) => {

			if (res && res.rowCount === 1) {
				resp.redirect('http://localhost:5000/registrationVerify')
			} else {
				resp.redirect('http://localhost:3000')
			}
		})
})

// @route   POST /logout
// @desc    Logout as a user
// @access  Private
exports.logout = async (req, res) => {
	try {
    console.log(`User ID: `)
    console.log(req.body);
		const { user_id } = req.body
		//1. Find the user
		const user = await findUserInfo('user_id', user_id);
    console.log(user.online)
		//2. Check if user found
		if (!user) return res.status(404).json({ message: 'User not found!' })
		if (user.online === 0) return res.status(404).json({ message: 'User already logged out!' })


    console.log('Here we log out user.');
		//!TODO: NEED TO SET THE USER ONLINE ONCE LOGIN & get the user location
		//const location = await getLocation(req);
		// Once login user will be in online
		//online = 0;
		await pool.query(
      `UPDATE users SET online = 0 WHERE user_id = $1`, [user_id]);
    const time = new Date().toISOString().slice(0, 19).replace('T', ' ')
    console.log(time)
    await updateTime(user_id, time)

		return res.sendStatus(200)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}