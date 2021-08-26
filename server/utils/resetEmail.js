const nodemailer = require('nodemailer')
const { appEmail, appPass, appClientId, appClientSecret, appRefreshToken } = require('../config/app')

const resetEmail = (email, token) => {
	console.log(`Sending email to ${email}`)
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			// type: 'OAuth2',
			user: appEmail,
			pass: appPass,
			// clientId: appClientId,
			// clientSecret: appClientSecret,
			// refreshToken: appRefreshToken
		}
	})

	const mailOptions = {
		from: 'hive.web.branch@gmail.com',
		to: email,
		subject: 'Reset Your Password',
		text: `Forgot Your Password? That's okay! you can reset your password by clicking following link: http://localhost:3000/resetPassword?token=${token}`
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}

module.exports = resetEmail

