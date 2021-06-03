// database connection 
const db = require('../config/database')
const bcrypt = require('bcrypt')

// This really should be a helper function in an import.
const findUserInfo = async (key, value, ...args) => {
  //console.log(`Finding user by key = ${key}, value = ${value}.`)

	const info = args.length == 0 ? '*' : args.join(', ');
  //console.log(`Info = ${info}.`)

	const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
  //console.log(res.rows[0]);
	return res.rows[0];
};

/*const updateUserInfo = async (key, value, ...args) => {
  console.log(`Updating user info by key = ${key}, value = ${value}.`)

	const info = args.length == 0 ? '*' : args.join(', ');
  console.log(`Info = ${info}.`)

	//const res = await db.query(`UPDATE users SET () WHERE ${key} = $1`, [value]);
  console.log(res.rows[0]);
	return res.rows[0];
};*/

exports.update = async (req, res) => {
  //console.log('Request.file.filename in userController:')
  //console.log(req.file.filename)
  try {
		const {first_name, last_name, gender, sex_orientation, bio, interest, email, password } = req.body
    const avatar = req.file.filename

		//1. Find the user
		const user = await findUserInfo('email', email);

		//2. Check if user found
		if (!user) return res.status(404).json({ message: 'User not found!' })

		//3. Check if password matches and fields are not empty
		if (!password) return res.status(400).json('Field can not be empty');
		if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' });

		//4. Update user table with new user data.
		//const userWithToken = updateUser(user)
		//userWithToken.user.avatar = user.avatar
    //console.log('Now we would update user table with new data.')
    // It updates! However, frontend has problems with default options.
    // Transform interests into correct format
    let interest_arr = interest.split(",")
    db.query("UPDATE users SET first_name = $1, last_name = $2, gender = $3, sex_orientation = $4, bio = $5, interest = $6, avatar = $7 WHERE email = $8", [first_name, last_name, gender, sex_orientation, bio, interest_arr, avatar, email]);
    
    
		//return res.send(updatedUser)
		return res.status(200)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
	}

  /*
  try {
		const { email, password } = req.body
		//1. Find the user
		const user = await findUserInfo('email', email;

		//2. Check if user found
		if (!user) return res.status(404).json({ message: 'User not found!' })

		//3. Check if password matches and fields are not empty
		if (!password) return res.status(400).json('Field can not be empty');
		if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' });

		//4. Update user table with new user data.
		//const userWithToken = updateUser(user)
		//userWithToken.user.avatar = user.avatar
    console.log('Now we would update user table with new data.')

		return res.send(updatedUserWithToken)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
  */
