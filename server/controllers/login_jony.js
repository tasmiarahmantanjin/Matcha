
exports.login = async (request, response) => {
	const body = request.body

	pool.query('SELECT verified, password FROM users WHERE user_name = $1',
		[body.user_name], async (err, res) => {

			if (err)
				return response.status(500).send({ error: 'Database error' })

			if (res.rowCount === 0)
				return response.status(401).send({ error: 'Invalid username or password' })

			const hashedPass = res.rows[0].password
			const passwordMatches = await bcrypt.compare(body.password, hashedPass)

			if (!passwordMatches)
				return response.status(401).send({ error: 'Invalid username or password' })

			if (!res.rows[0].verified)
				return response.status(401).send({ error: 'Account needs to be verified, check your email' })

			pool.query('WITH updated AS (\
				UPDATE users\
				SET (latitude, longitude) = ($1, $2)\
				WHERE user_name = $3\
				RETURNING user_id, first_name, last_name, user_name, email,\
				gender, sex_orientation, bio, tags, longitude, latitude)',
				[body.user_name], (err, result) => {
					if (result) {
						const { first_name, last_name, age, ...user } = result.rows[0]

						const userForToken = {
							user_name: result.rows[0].user_name,
							user_id: result.rows[0].user_id,
						}

						const sessionToken = jwt.sign(userForToken, process.env.APP_KEY)

						return response
							.status(200)
							.send({ sessionToken, first_name: first_name, last_name: last_name, user_name: user_name, ...user, })
					}

					return response.status(500).send({ error: 'Database error' })

				})

		})
}