// database connection 
const db = require('../config/database')
const bcrypt = require('bcrypt')

// This is probably the one that is not working, and causing problems.

/*exports.update = async (req, res) => {
  console.log('Update has been called.');
	if (req.file) {
		req.body.avatar = req.file.filename
	}

	if (typeof req.body.avatar !== 'undefined' && req.body.avatar.length === 0) delete req.body.avatar

	try {
		const [rows, result] = await User.update(req.body,
			{
				where: {
					id: req.user.id
				},
				returning: true,
				individualHooks: true
			}
		)

		const user = result[0].get({ raw: true })
		user.avatar = result[0].avatar
		delete user.password

		return res.send(user)

	} catch (e) {
    console.log("Oh shit.")
		return res.status(500).json({ error: e.message })
	}
}*/

// This really should be a helper function in an import.
const findUserInfo = async (key, value, ...args) => {
  console.log(`Finding user by key = ${key}, value = ${value}.`)

	const info = args.length == 0 ? '*' : args.join(', ');
  console.log(`Info = ${info}.`)

	const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
  console.log(res.rows[0]);
	return res.rows[0];
};

const updateUserInfo = async (key, value, ...args) => {
  console.log(`Updating user info by key = ${key}, value = ${value}.`)

	const info = args.length == 0 ? '*' : args.join(', ');
  console.log(`Info = ${info}.`)

	//const res = await db.query(`UPDATE users SET () WHERE ${key} = $1`, [value]);
  console.log(res.rows[0]);
	return res.rows[0];
};

exports.update = async (req, res) => {
  //console.log(req)
  console.log(req.body)
  try {
		const {first_name, last_name, gender, sex_orientation, bio, interest, avatar, email, password } = req.body
		//1. Find the user
		const user = await findUserInfo('email', email);

		//2. Check if user found
		if (!user) return res.status(404).json({ message: 'User not found!' })

		//3. Check if password matches and fields are not empty
    console.log(password)
    console.log(user.password)
		if (!password) return res.status(400).json('Field can not be empty');
		if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' });

		//4. Update user table with new user data.
		//const userWithToken = updateUser(user)
		//userWithToken.user.avatar = user.avatar
    //console.log('Now we would update user table with new data.')
    // It updates! However, frontend has problems with default options.
    const updatedUser = db.query("UPDATE users SET first_name = $1, last_name = $2, gender = $3, sex_orientation = $4, bio = $5, interest = $6, avatar = $7 WHERE email = $8", [first_name, last_name, gender, sex_orientation, bio, interest, avatar, email]);
    
    
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
