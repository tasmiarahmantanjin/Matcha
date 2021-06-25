// The use of this middleware is to update user profile

const config = require('../config/app')
const pool = require('../config/database');
//const { updateAccount } = require('../controllers/authControllerHelper');
//const { updateTime } = require('../controllers/authControllerHelper');

exports.isOnline = async (req, res, next) => {
	console.log('In logout middleware. Request body:')
  console.log(req.body);
const user_id = req.body.user_id
//1. Find the user
const online = await pool.query(`SELECT online FROM users WHERE user_id = $1`, [user_id])//await findUserInfo('user_id', user_id);//`SELECT ${info} FROM users WHERE ${key} = $1`, [value]
.then(
  (resolvedValue)=>{console.log(online)},
  (errorFromPromise)=>{console.log(errorFromPromise)}
)
if (online === '0'){
    return res.status(401)//.json({ error: 'User already logged out.' })
}
console.log(online);
	next()
}