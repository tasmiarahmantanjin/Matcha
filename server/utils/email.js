const nodemailer = require("nodemailer");

const sendEmail = (email, token) => {
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
		subject: 'Activate Your Matcha Account Now',
		text: `Hello! Here is your account activation link. Please click the link to verify your account: http://localhost:5000/registrationVerify?token=${token}`
	}
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}

module.exports = sendEmail;