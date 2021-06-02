const nodemailer = require("nodemailer");
const {appEmail, appPass, appClientId, appClientSecret, appRefreshToken} = require('../config/app')

const sendEmail = (email, token) => {
  console.log(`Sending email to ${email}`)
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
      type: 'OAuth2',
      user: appEmail,
      pass: appPass,
      clientId: appClientId,
      clientSecret: appClientSecret,
      refreshToken: appRefreshToken
		}
	})
	const mailOptions = {
		from: 'pontuslaandersson@gmail.com',
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