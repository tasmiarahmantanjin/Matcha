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
  //console.log('Request.body in userController:')
  //console.log(req.body)
  try {
		const {user_id, first_name, last_name, gender, sexual_orientation, bio, interest, birthdate, email, password } = req.body
    //console.log(sexual_orientation);
    let avatar = null
    if (req.file) {
      avatar = req.file.filename
    }

		//1. Find the user
		const user = await findUserInfo('user_id', user_id);

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
    let sexual_orientation_arr = sexual_orientation.split(",")
    //console.log(sexual_orientation_arr);
    db.query("UPDATE users SET first_name = $1, last_name = $2, gender = $3, sexual_orientation = $4, bio = $5, interest = $6, birthdate = $7, email = $8 WHERE user_id = $9", [first_name, last_name, gender, sexual_orientation_arr, bio, interest_arr, birthdate, email, user_id]);
    if (avatar !== null) {
      //console.log('Updating avatar')
      db.query("UPDATE users SET avatar = $1 WHERE email = $2", [avatar, email])
    }
    
    
		//return res.send(updatedUser)
		return res.status(200)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
	}

  exports.galleryUpload = async (req, res) => {
    console.log('Request.body in userController:')
    console.log(`user ID: ${req.user.user_id}`)
    try {
      const user_id = req.user.user_id
      //console.log(sexual_orientation);
      let image = null
      if (req.file) {
        image = req.file.filename
      }
  
      //1. Find the user
      const user = await findUserInfo('user_id', user_id);
  
      //2. Check if user found
      if (!user) return res.status(404).json({ message: 'User not found!' })
  
      //3. Check if password matches and fields are not empty
      // if (!password) return res.status(400).json('Field can not be empty');
      // if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ message: 'Incorrect password!' });
  
      //4. Update user table with new user data.
      //const userWithToken = updateUser(user)
      //userWithToken.user.avatar = user.avatar
      //console.log('Now we would update user table with new data.')
      // It updates! However, frontend has problems with default options.
      // Transform interests into correct format
      //let interest_arr = interest.split(",")
      //let sexual_orientation_arr = sexual_orientation.split(",")
      //console.log(sexual_orientation_arr);
      //db.query("UPDATE users SET first_name = $1, last_name = $2, gender = $3, sexual_orientation = $4, bio = $5, interest = $6, birthdate = $7, email = $8 WHERE user_id = $9", [first_name, last_name, gender, sexual_orientation_arr, bio, interest_arr, birthdate, email, user_id]);
      
      const newImage = await db.query("INSERT INTO gallery (owner_id, path) VALUES ($1, $2) RETURNING path", [user_id, image]);
     
      
      
      return res.send(newImage)
      //return res.status(200)
    } catch (e) {
      return res.status(500).json({ message: e.message })
    }
    }