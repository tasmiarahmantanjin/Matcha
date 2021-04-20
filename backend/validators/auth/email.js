import nodemailer from 'nodemailer'

export default class Email {
	constructor({ to, successCallback, errorCallback }) {
		this.to = to
		this.successCallback = successCallback
		this.errorCallback = errorCallback
	}

	/*
	sendResetPasswordEmail(userId, code) {
		const link = `http://localhost:3000/resetPassword/${userId}_${code}`
		this.subject = 'Reset Password for Matcha'
		this.html = `<html><body><p>Hello!<br><br>
    You have requested a link to reset your password, because
    presumably you forgot it. Tap the link below to reset your passoword. If this wasn't you who
    requested this link, please contact us!</p>
    <a href='${link}'>Tap here to Reset Password</a>
		<br><br>Sincerely,<br>Ryan Reynolds<br><i>CEO of Matcha</i></body></html>`
		this.send()
	} */

	sendConfirmEmail(userId, code) {
		const link = `http://localhost:3000/finishProfile/${userId}_${code}`
		this.subject = 'Confirm your account for Matcha'
		this.html = `<html><body><p>Hello!<br><br>
    Glad you have joined our amazing social site. We will need
		you to confirm your account to get access to the site. To do that you need to tap the link below
		to confirm your account for Matcha website!</p>
		<a href='${link}'>Tap here to Confirm account</a>
		<br><br>Sincerely,<br>Ryan Reynolds<br><i>CEO of Matcha</i></body></html>`
		this.send()
	}

	send() {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'ollesusteem',
				pass: 'vironialukutaha19',
			},
		})

		const options = {
			from: '"Tasmia From Matcha" ryan.reynolds@matcha.com',
			to: this.to,
			subject: this.subject,
			html: this.html,
		}

		transporter.sendMail(options, (err, success) => {
			if (err) {
				this.errorCallback(err)
			} else this.successCallback(success)
		})
	}
}
