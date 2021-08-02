const pool = require('../config/database')
// const generateToken = require('../utils/generateToken')
const config = require('../config/app')
const jwt = require('jsonwebtoken')

console.log("THis is notification")

// @route   POST /notifications
// @desc    Send a notification to a user
// @access  Protected
exports.likeNotification = async (req, resp) => {

	const { email } = req.body;
	console.log(email)
	console.log(`In notification.js: ${req.body}`);
	console.log(`In notification.js: ${req.query}`);


	const user = jwt.verify(req.token, tokenSecret)

	if (!user || (req.query.user_id && user.user_id !== Number(req.query.user_id)))
		return resp.status(401).json({ error: 'token missing or invalid' })

	if (req.query.user_id)
		// Fetching the data from the notification table
		pool.query('SELECT * FROM notifications WHERE user_id = $1 ORDER BY date DESC',
			[req.query.user_id], (err, res) => {
				if (res)
					resp.status(200).send(res.rows)
				else
					resp.status(500).send({ error: err.detail })
			})

	else
		pool.query('SELECT * FROM notifications ORDER BY date DESC', [], (err, res) => {
			if (res)
				resp.status(200).send(res.rows)
			else
				resp.status(500).send({ error: err.detail })
		})
}
