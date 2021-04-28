const nodemailer = require('nodemailer')

const resetEmail = (email, token) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'hive.web.branch',
			pass: 'hive.web.branch93'
		}
	})

	const mailOptions = {
		from: 'hive.web.branch@gmail.com',
		to: email,
		subject: 'Reset Your Password',
		text: `Forgot Your Password? That's okay! you can reset your password by clicking following link: http://localhost:5000/resetPassword?token=${token}`
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