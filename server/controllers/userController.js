// database connection
const db = require('../config/database')
const bcrypt = require('bcrypt')

// This really should be a helper function in an import.
const findUserInfo = async (key, value, ...args) => {
  //console.log(`Finding user by key = ${key}, value = ${value}.`)

  const info = args.length == 0 ? '*' : args.join(', ')
  //console.log(`Info = ${info}.`)

  const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value])
  //console.log(res.rows[0]);
  return res.rows[0]
}

/*const updateUserInfo = async (key, value, ...args) => {
  console.log(`Updating user info by key = ${key}, value = ${value}.`)

	const info = args.length == 0 ? '*' : args.join(', ');
  console.log(`Info = ${info}.`)

	//const res = await db.query(`UPDATE users SET () WHERE ${key} = $1`, [value]);
  console.log(res.rows[0]);
	return res.rows[0];
};*/

exports.getHashtagList = async (req, res) => {
  try {
    console.log('Getting hashtag list.')
    const hashtags = await db.query('SELECT * FROM hashtags')
    if (hashtags.rowCount > 0) {
      console.log('Hashtags:')
      console.log(hashtags.rows)
    } else {
      console.log('No hashtags.')
    }
    // return res.send(hashtags)
    return res.status(200).json({ data: hashtags })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.update = async (req, res) => {
  //console.log('Request.body in userController:')
  //console.log(req.body)
  try {
    const {
      user_id,
      first_name,
      last_name,
      gender,
      sexual_orientation,
      bio,
      interest,
      birthdate,
      email,
      password
    } = req.body
    //console.log(sexual_orientation);
    let avatar = null
    if (req.file) {
      avatar = req.file.filename
    }

    //1. Find the user
    const user = await findUserInfo('user_id', user_id)

    //2. Check if user found
    if (!user) return res.status(404).json({ message: 'User not found!' })

    //3. Check if password matches and fields are not empty
    if (!password) return res.status(400).json('Field can not be empty')
    if (!bcrypt.compareSync(password, user.password))
      return res.status(401).json({ message: 'Incorrect password!' })

    //4. Update user table with new user data.
    //const userWithToken = updateUser(user)
    //userWithToken.user.avatar = user.avatar
    //console.log('Now we would update user table with new data.')
    // It updates! However, frontend has problems with default options.
    // Transform interests into correct format
    console.log('body.interest length:')
    console.log(interest.length)
    let interest_arr
    if (interest.length > 0) {
      interest_arr = interest.split(',')
    } else {
      interest_arr = []
    }
    let sexual_orientation_arr
    if (sexual_orientation.length > 0) {
      sexual_orientation_arr = sexual_orientation.split(',')
    } else {
      sexual_orientation_arr = []
    }
    //console.log(sexual_orientation_arr);
    db.query(
      'UPDATE users SET first_name = $1, last_name = $2, gender = $3, sexual_orientation = $4, bio = $5, interest = $6, birthdate = $7, email = $8 WHERE user_id = $9',
      [
        first_name,
        last_name,
        gender,
        sexual_orientation_arr,
        bio,
        interest_arr,
        birthdate,
        email,
        user_id
      ]
    )
    if (interest_arr) {
      let difference = interest_arr.filter(item => !user.interest.includes(item))
      //console.log(`Difference.length: ${difference.length}`);
      if (difference.length > 0) {
        for (let i in difference) {
          console.log(`Interest: ${difference[i]}`)
          const hashtags = await db.query(`SELECT * FROM hashtags WHERE interest = $1`, [
            difference[i]
          ])
          if (hashtags.rowCount === 0) {
            console.log(`Inserting into table: ${difference[i]}`)
            db.query(`INSERT INTO hashtags(interest, number) VALUES ($1, $2)`, [difference[i], 1])
          }
          if (hashtags.rowCount > 0) {
            if (!user.interest.includes(difference[i])) {
              db.query('UPDATE hashtags SET number = $1 WHERE interest = $2', [
                hashtags.rows[0].number + 1,
                difference[i]
              ])
              console.log(`Interest count added: ${difference[i]}`)
            } else {
              console.log(`Interest already in array: ${difference[i]}`)
            }
          }
        }
      }
      let deleted = user.interest.filter(item => !interest_arr.includes(item))
      console.log('Following was removed:')
      console.log(deleted)

      if (deleted.length > 0) {
        for (let i in deleted) {
          console.log(`Deleted: ${deleted[i]}`)
          const hashtags = await db.query(`SELECT  * FROM hashtags WHERE interest = $1`, [
            deleted[i]
          ])
          db.query('UPDATE hashtags SET number = $1 WHERE interest = $2', [
            hashtags.rows[0].number - 1,
            deleted[i]
          ])
          console.log(`Interest count decreased: ${deleted[i]}`)
        }
      } else {
        console.log('Nothing deleted here.')
      }
      if (avatar !== null) {
        //console.log('Updating avatar')
        db.query('UPDATE users SET avatar = $1 WHERE email = $2', [avatar, email])
        const newImage = await db.query(
          'INSERT INTO gallery (owner_id, path) VALUES ($1, $2) RETURNING path',
          [user_id, avatar]
        )
      }
      res.status(200).json({ status: 'success' })
    }

    return res.status(200).json({ status: 'success' })
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
