const pool = require('../config/database')
const jwt = require('jsonwebtoken')
const config = require('../config/app')

// Path: /notifications
// Method: GET
exports.notification1 = async (req, resp) => {
	try {
		//1. Get the user's token
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]
		if (!token) {
			return res.status(401).json({ error: 'Missing token!' })
		}
		//2. Verify the token
		const user = jwt.verify(token, config.appKey)
		if (!user)
			return resp.status(401).json({ error: 'token missing or invalid' })
		console.log('Endpoint hit: GET req for notification')

		//3. Database query to get the data from notification table if user_id exists
		if (req.query.user_id) {
			pool.query(`SELECT * FROM notifications WHERE user_id = $1 ORDER BY date DESC`,
				[req.query.user_id], (err, result) => {
					if (err) {
						return resp.status(500).json({ error: err.detail })
					}
					res.json(result.rows)
				})
		}
		else
			pool.query('SELECT * FROM notifications ORDER BY date DESC', [], (err, res) => {
				if (err)
					return resp.status(500).send({ error: err.detail })
				resp.status(200).send(res.rows)
			})
	}
	catch (err) {
		console.log(err)
		resp.status(500).json({ error: err })
	}
}

// Path: /notifications
// Method: POST
exports.notification2 = async (req, resp) => {
	try {
		//1. De-structure the request body
		const { user_id, from_id, notification } = req.body
		if (!user_id || !from_id || !notification) {
			return resp.status(400).json({ error: 'Missing parameter' })
		}
		console.log(user_id, from_id, notification);

		//2. Get the user's token
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]

		//3. Verify the token
		const user = jwt.verify(token, config.appKey)
		if (!user)
			return resp.status(401).json({ error: 'token missing or invalid' })
		console.log('Endpoint hit: POST request for Notification')

		//4. Database query to insert the data in notification table
		await pool.query('INSERT INTO notifications (user_id, from_id, notification) \
			VALUES ($1, $2, $3) RETURNING *',
			[req.body.user_id, req.body.from_id, req.body.notification], (err, res) => {
				if (err) {
					return resp.status(500).json({ error: err })
				}
				resp.status(204).end()
			})
	}
	catch (err) {
		console.log(err)
		resp.status(500).json({ error: err })
	}
}

// Path: /notifications
// Method: PATCH
// Desc: Update the notification table after seen a notification
exports.notification3 = (req, resp) => {
	try {
		//1. Get the token
		const authHeader = req.headers['authorization']
		const token = authHeader && authHeader.split(' ')[1]

		//2. Verify the token
		const user = jwt.verify(token, config.appKey)
		console.log(user);
		if (!user)
			return resp.status(401).json({ error: 'token missing or invalid' })
		console.log('Endpoint hit: PatchNotification')

		//3. Database query to UPDATE the data of notification table after reading the notification
		pool.query('UPDATE notifications SET read = $1 WHERE user_id = $2',
			[req.body.read, user.user_id], (err, res) => {
				res ? resp.status(204).end() : resp.status(500).json({ error: err.detail })
			})
	} catch (error) {
		console.log(error)
		resp.status(500).json({ error: error })
	}

	// Path: /notifications/:id
	// Method: PATCH
	// Desc: Update the notification table after seen a notification
	exports.notification4 = (req, resp) => {
		try {
			//1. Get the token
			const authHeader = req.headers['authorization']
			const token = authHeader && authHeader.split(' ')[1]

			//2. Verify the token
			const user = jwt.verify(token, config.appKey)
			console.log(user);
			if (!user)
				return resp.status(401).json({ error: 'token missing or invalid' })
			console.log('Endpoint hit: PatchNotification')

			//3. Database query to UPDATE the data of notification table after reading the notification
			pool.query('UPDATE notifications SET read = $1 WHERE id = $2 RETURNING *',
				[req.body.read, req.params.id], (err, res) => {
					res ? resp.status(200).send(res.rows[0]) : resp.status(500).json({ error: err.detail })
				})
		} catch (error) {
			console.log(err)
			resp.status(500).json({ error: err })
		}
	}
}