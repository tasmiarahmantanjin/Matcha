const nodemailer = require("nodemailer");
const config = require("../config/nodemailer.auth.config");
const User = require('../models').User;
const config = require('../config/app');

const appEmail = config.appEmail;
const appPass = config.appPass;

const transport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		appEmail: appEmail,
		appPass: appPass
	},
});

// Email Template
module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
	console.log("Check");
	transport.sendMail({
		from: user,
		to: email,
		subject: "Please confirm your account",
		html: `<h1>Email Confirmation</h1>
			<h2>Hello ${name}</h2>
			<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
			<a href=http://localhost:3001/confirm/${confirmationCode}> Click here</a>
			</div>`,
	}).catch(err => console.log(err));
};
