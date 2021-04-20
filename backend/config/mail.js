const nodemailer = require("nodemailer");
const User = require('../models').User;
const config = require('./app');

const appUrl = config.appUrl
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
// Need to fetch the registrationToken from database
module.exports.sendRegistrationConfirmationEmail = (name, email, confirmationCode) => {
	console.log("Check");
	transport.sendMail({
		from: user,
		to: email,
		subject: "Please confirm your account",
		html: `<h1>Email Confirmation</h1>
			<h2>Hello ${name}</h2>
			<p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
			<a ${appUrl}/confirm/${confirmationCode}> Click here</a>
			</div>`,
	}).catch(err => console.log(err));
};
