// database connection 
const db = require('../config/database')
const bcrypt = require('bcrypt')
const fs = require('fs')

const findUserInfo = async (key, value, ...args) => {
  //console.log(`Finding user by key = ${key}, value = ${value}.`)

	const info = args.length == 0 ? '*' : args.join(', ');
  //console.log(`Info = ${info}.`)

	const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value]);
  //console.log(res.rows[0]);
	return res.rows[0];
};

exports.galleryUpload = async (req, res) => {
  //console.log('Request.body in galleryController.galleryUpload:')
  //console.log(`user ID: ${req.user.user_id}`)
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
     const galleryImages = await db.query('SELECT * FROM gallery WHERE owner_id = $1', [user_id])
    //console.log('Gallery image: ');
    //console.log(galleryImages.rowCount);
    let fame
    if (galleryImages.rowCount > 1) {
      fame = 100
      await db.query(
        'UPDATE users SET fame = $1 WHERE user_id = $2',
        [
          fame,
          user_id
        ]
      )
    }
    return res.send(newImage)
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
  }


exports.getGalleryByUser = async (req, res) => {
  //console.log('Request.body in galleryController.getGalleryByUser:')
  //console.log(req.body.user)
  try {
    const owner_id = req.body.user.user_id
    
    const results = await db.query(`SELECT * FROM gallery WHERE owner_id = $1`, [owner_id]);
    //console.log(results)
    
    return res.send(results)
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
  }

exports.deleteGalleryImage = async (req, res) => {
  //console.log('Request.body in galleryController.deleteGalleryImage:')
  //console.log(req.body)
  try {
    const user_id = req.body.user.user_id
    const { image_id, owner_id, path} = req.body.image

    if (user_id !== owner_id) return res.status(401).json({ message: 'Forbidden!' })
    
    const del = await db.query(`DELETE FROM gallery WHERE image_id = $1`, [image_id])
    if (del.rowCount === 1) {
      //console.log('DB entry deleted!');
      const file = `uploads/user/${owner_id}/${path}`
      fs.unlink(file, function (err) {
        if (err) throw err
        //console.log('File deleted!')
    })
    }
    // Send updated gallery 
    const results = await db.query(`SELECT * FROM gallery WHERE owner_id = $1`, [owner_id])
    //console.log('Here we delete the file: DELETE.');
    //console.log(results)
    
    /**/
    //console.log(results)
    //console.log('Sending results.')
    return res.send(results)
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
  }

  exports.makeAvatarImage = async (req, res) => {
  //console.log('Request.body in galleryController.makeAvatarImage:')
  //console.log(req.body)
  try {
    const user_id = req.body.user.user_id
    const { image_id, owner_id, path} = req.body.image

    if (user_id !== owner_id) return res.status(401).json({ message: 'Forbidden!' })
    
    const update = await db.query(`UPDATE users SET avatar = $1 WHERE user_id = $2`, [path, user_id])
    if (update.rowCount === 1) {
      //console.log('User image updated!');
      const file = `uploads/user/${owner_id}/${path}`
    }
    // Send updated gallery 
    const results = await db.query(`SELECT * FROM gallery WHERE owner_id = $1`, [owner_id])
    //console.log('Here we delete the file: DELETE.');
    //console.log(results)
    
    /**/
    //console.log(results)
    //console.log('Sending results.')
    return res.send(results)
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
  }