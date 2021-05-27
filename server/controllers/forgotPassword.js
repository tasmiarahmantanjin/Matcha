const crypto = require('crypto');
const accountHelper = require('./authControllerHelper');
const resetEmail = require('../utils/resetEmail');

exports.resetPassword = async (req, res) => {
	// De-structure the req.body
	const { email } = req.body;
  console.log(`In forgotPassword.js: ${req.body}`);
	// Check if user entered any email or not
	if (!email) {
		return res.status(400).json('Field can not be empty');
	}

	// Find the user from database
	const user = await accountHelper.findUserInfo('email', email, 'user_id', 'user_name', 'status');

	if (!user) {
		return res.status(404).json('This email address doesn’t match with any account! Check & Try again!');
	}

	// Check if account activated or not
	if (user.status === 0) {
		return res.status(426).json('Account is not activated yet, please check your email!');
	}

	// Create new token to reset password
	const token = crypto.randomBytes(42).toString('hex');

	// Update the token inside database with freshly generated token
	await accountHelper.updateAccount(user.user_id, { token: token });

	// Send email to reset the password
	return res.json(resetEmail(email, token));
};
