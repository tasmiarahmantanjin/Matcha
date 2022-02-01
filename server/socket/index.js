const webSocketServer = require('websocket').server
const db = require('../config/database')

module.exports = server => {
	const wsServer = new webSocketServer({
		httpServer: server
	})

	const clients = []

	wsServer.on('request', request => {
		console.log(`Websocket received a new connection from origin ${request.origin}`)
		console.log('---')

		const connection = request.accept(null, request.origin)

		connection.on('message', message => {

			if (message.type === 'utf8') {
				const messageArray = JSON.parse(message.utf8Data)

				if (messageArray.type === 'connected') {
					clients[messageArray.from] = connection
					db.query('UPDATE users SET online = 1 WHERE user_id = $1',
						[messageArray.from], () => {
							console.log(`User ${messageArray.from} connected`)
							console.log('---')
						})
				}

				if (messageArray.type === 'close') {
					clients[messageArray.from].close()
				}

				if (messageArray.type === 'closed') {
					db.query('UPDATE users SET online = 0, last_online = CURRENT_TIMESTAMP WHERE user_id = $1',
						[messageArray.from], () => { })
				}

				if (messageArray.type === 'message') {

					db.query('SELECT from_user_id, to_user_id FROM blocked\
					WHERE (from_user_id = $1 AND to_user_id = $2)\
					OR (from_user_id = $2 AND to_user_id = $1)',
						[messageArray.from, messageArray.to], (err, res) => {
							if (res && res.rowCount === 0) {
								db.query('INSERT INTO chat (sender, receiver, msg) VALUES($1, $2, $3) RETURNING *',
									[messageArray.from, messageArray.to, messageArray.msg], (err, res) => {

										if (res && res.rows[0]) {
											if (clients[messageArray.to] && clients[messageArray.to].connected) {

												clients[messageArray.to].sendUTF(JSON.stringify({ ...res.rows[0], type: 'message' }))
												clients[messageArray.from].sendUTF(JSON.stringify({ ...res.rows[0], type: 'message' }))
											}
											else
												clients[messageArray.from].sendUTF(JSON.stringify({ ...res.rows[0], type: 'rejected' }))
										}
									})
							}
						})
				}

				if (messageArray.type === 'notification') {


					db.query('SELECT from_user_id, to_user_id FROM blocked\
					WHERE (from_user_id = $1 AND to_user_id = $2)\
					OR (from_user_id = $2 AND to_user_id = $1)',
						[messageArray.from, messageArray.to], (err, res) => {

							if (res && res.rowCount === 0) {

								db.query('INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *',
									[messageArray.user_id, messageArray.from_id, messageArray.notification],
									(err, res) => {
										if (res && res.rows[0]) {
											if (clients[messageArray.user_id] && clients[messageArray.user_id].connected)
												clients[messageArray.user_id].sendUTF(JSON.stringify({ ...res.rows[0], type: 'notification' }))
										}
										else
											console.log(err)
									})
							}
						})
				}
			}
		})

		connection.on('close', () => {

			clients.forEach((c, i) => {
				if (c === connection) {
					db.query('UPDATE users SET online = 0, last_online = CURRENT_TIMESTAMP WHERE user_id = $1',
						[i], () => {
							console.log(`User ${i} disconnected`)
							console.log('---')
						})
				}
			})
		})
	})
}