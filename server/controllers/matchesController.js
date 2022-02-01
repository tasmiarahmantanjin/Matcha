// database connection 
const db = require('../config/database')
const bcrypt = require('bcrypt')

// This really should be a helper function in an import.
const findUserInfo = async (key, value, ...args) => {
	//console.log(`Finding user by key = ${key}, value = ${value}.`)

	const info = args.length == 0 ? '*' : args.join(', ');
	//console.log(`Info = ${info}.`)

	const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
	//console.log(res.rows[0]);
	return res.rows[0];
};

exports.match = async (req, res) => {
	console.log('Request.body in matchesController:')
	console.log(req.body)
	try {
		const { ageRangeMax, ageRangeMin, distance, gender, sexual_orientation, interest } = req.body
		let interestArr = interest.split(",")
		let sexualOrientationArr = sexual_orientation.split(",")

		const results = await db.query(`SELECT * FROM users WHERE gender = ANY($1) AND $2 = ANY(sexual_orientation) AND interest && $3 ORDER BY first_name ASC`, [sexualOrientationArr, gender, interestArr]);
		console.log(results)
		return res.send(results)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
}
