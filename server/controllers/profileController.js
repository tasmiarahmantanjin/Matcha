// database connection 
const db = require('../config/database')

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

exports.getUserById = async (req, res) => {
  //console.log('Request.body in profileController:')
  //console.log(req.body)
  try {
		const { profile_id } = req.body
    
    const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [profile_id]);
    console.log(results)

    // To-do: insert notification.

    
		return res.send(results)
		//return res.status(200)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
	}

  exports.likeUser = async (req, res) => {
    //console.log('Request.body in profileController.likeUser:')
    //console.log(req.body)
    try {
      const { user_id, profile_id } = req.body

      //console.log(`Now we insert like from ${user_id} to ${profile_id}`)
		const results = await db.query("INSERT INTO likes (user_id, liked_user) VALUES ($1, $2) RETURNING *", [user_id, profile_id]);
    //console.log(results)
    
    // To-do: insert notification.

      
      return res.send(results)
      //return res.status(200)
    } catch (e) {
      return res.status(500).json({ message: e.message })
    }
    }

    exports.getLike = async (req, res) => {
      console.log('Request.body in profileController.getLike:')
      console.log(req.body)
      try {
        const { user_id, profile_id } = req.body
  
        console.log(`Now we get like from ${user_id} to ${profile_id}`)
      const results = await db.query(`SELECT * FROM likes WHERE user_id = $1 AND liked_user = $2`, [user_id, profile_id]);
      console.log(results)
      
      // To-do: insert notification.

      return res.send(results)
      
        //return res.status(200)
      } catch (e) {
        return res.status(500).json({ message: e.message })
      }
      }

      exports.unlikeUser = async (req, res) => {
        console.log('Request.body in profileController.unlikeUser:')
        console.log(req.body)
        try {
          const { user_id, profile_id } = req.body
    
          console.log(`Now we delete like from ${user_id} to ${profile_id}`)
        const results = await db.query("DELETE FROM likes WHERE user_id = $1 AND liked_user = $2", [user_id, profile_id]);
        //const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [profile_id]);
        console.log(results)
        // To-do: insert notification.
          
          return res.sendStatus(201)
          //return res.status(200)
        } catch (e) {
          return res.status(500).json({ message: e.message })
        }
        }
 
