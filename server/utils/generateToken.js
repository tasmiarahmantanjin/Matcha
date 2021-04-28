const jwt = require('jsonwebtoken');
require("dotenv").config();

// Function to generate token
const generateToken = (user) => {

	delete user.password
	// payload is user in this case
	const token = jwt.sign(user, process.env.APP_KEY, { expiresIn: 86400 })

	return { ...{ user }, ...{ token } }
}

module.exports = generateToken;
