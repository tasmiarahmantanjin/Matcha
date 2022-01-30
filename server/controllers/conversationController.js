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

    exports.insertMessageIntoConversation = async (message) => {
      console.log('Message in insertMessageIntoConversation:')
      console.log(message)
      try {
        const { message_text, sender_id, timestamp, conversation, partner } = message
        
        const results = await db.query(`INSERT INTO messages(sender_id, conversation_id, message_text, timestamp) VALUES ($1, $2, $3, $4)`, [sender_id, conversation, message_text, timestamp]);
        const sender = await db.query('SELECT * FROM users WHERE user_id = $1', [sender_id])
        //console.log(sender);
        if (sender.rowCount > 0) {
          const matchNotification = await db.query('INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *', [partner, sender_id, `${sender.rows[0].first_name.charAt(0).toUpperCase() + sender.rows[0].first_name.slice(1)} sent you a message!`]);
        }
        //console.log(results)
    
        
        //return res.send(results)
        //return res.status(200)
      } catch (e) {
        console.log(`Error: ${e}`)
      }
    }
  
    exports.getConversationsArray = async (req, res) => {
      //console.log('Request.body in conversationController.getConversationsArray:')
      //console.log(req.body.user.user_id)
      try {
        const user_id = req.body.user.user_id
        //console.log(`user_id = ${user_id}`);
        
        const results = await db.query(`SELECT * FROM conversations WHERE user_one_id = $1 OR user_two_id = $1`, [user_id]);
        //console.log(results)
        return res.send(results)
        //return res.status(200)
      } catch (e) {
        return res.status(500).json({ message: e.message })
      }
      }