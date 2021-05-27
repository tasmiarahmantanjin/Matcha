require('dotenv').config();

module.exports = {
	appKey: process.env.APP_KEY,
	appPort: process.env.APP_PORT,
	appUrl: process.env.APP_URL,
	appEmail: process.env.USER_EMAIL,
	appPass: process.env.USER_PASS,
  appClientId: process.env.CLIENT_ID,
  appClientSecret: process.env.CLIENT_SECRET,
  appRefreshToken: process.env.REFRESH_TOKEN
}
