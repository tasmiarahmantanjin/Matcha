const router = require('express').Router()
// connect with database user mode
const User = require('../models').User
const sequelize = require('sequelize')

//connect with database
const db = require('../config/app')

router.get('/', (req, resp) => {
	db.query('UPDATE users SET verified = 1 WHERE token = $1',
		[req.query.token], (err, res) => {
			if (res && res.rowCount === 1) {
				resp.redirect('http://localhost:3000/verify')
			} else {
				resp.redirect('http://localhost:3000')
			}
		})
})

module.exports = router