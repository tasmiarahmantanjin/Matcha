const nodemailer = require("nodemailer");
const User = require('../models').User;
const config = require('./app');

const appUrl = config.appUrl
const appEmail = config.appEmail;
const appPass = config.appPass;

//! Jony vhai's email code

const sendEmail = (email, token) => {
	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			appEmail: appEmail,
			appPass: appPass
		},
	})

	const mailOptions = {
		from: 'appEmail',
		to: email,
		subject: 'Plese verify your MATCHA account',
		text: `Hello! Please click the following link to verify your email http://localhost:3001/verify?token=${token}`
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log('Email sent: ' + info.response)
		}
	})
}

/*
// Email Template
// Need to fetch the registrationToken from database
const transport = nodemailer.createTransport({
	service: "gmail",
	auth: {
		appEmail: appEmail,
		appPass: appPass
	},
});

module.exports.sendRegistrationConfirmationEmail = (name, email, confirmationCode) => {
	console.log("Check");
	transport.sendEmail({
		from: user,
		to: email,
		subject: "Please confirm your MATCHA account",
		html: `<h1>Email Confirmation</h1>
			<h2>Hello ${name}</h2>
			<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
			<a ${appUrl}/verify?token=${token}> Click here</a>
			</div>`,
	}).catch(err => console.log(err));
}; */