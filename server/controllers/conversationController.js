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

exports.getConversationById = async (req, res) => {
  //console.log('Request.body in conversationController:')
  //console.log(req.body)
  try {
		const { id } = req.body
    
    const results = await db.query(`SELECT * FROM conversations WHERE id = $1`, [id]);
    //console.log(results)
		return res.send(results)
		//return res.status(200)
	} catch (e) {
		return res.status(500).json({ message: e.message })
	}
	}

  exports.getMessagesByConversation = async (req, res) => {
    //console.log('Request.body in conversationController.getMessages:')
    //console.log(req.body)
    try {
      const { conversation_id } = req.body
      
      const results = await db.query(`SELECT * FROM messages WHERE conversation_id = $1`, [conversation_id]);
      //console.log(results)
  
      
      return res.send(results)
      //return res.status(200)
    } catch (e) {
      return res.status(500).json({ message: e.message })
    }
    }

  