// database connection
const db = require("../config/database");

// This really should be a helper function in an import.
const findUserInfo = async (key, value, ...args) => {
  //console.log(`Finding user by key = ${key}, value = ${value}.`)

  const info = args.length == 0 ? "*" : args.join(", ");
  //console.log(`Info = ${info}.`)

  const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [
    value,
  ]);
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
    const { profile_id } = req.body;

    const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
      profile_id,
    ]);
    //console.log(results)

    return res.send(results);
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.visitUser = async (req, res) => {
  console.log("Request.body in visitUser:");
  console.log(req.body);
  try {
    const { profile_id, user_id } = req.body;

    const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [
      profile_id,
    ]);
    //console.log(results)
    if (results.rowCount > 0) {
      //console.log('It\'s a match!');
      //const matched = await db.query('INSERT INTO conversations (user_one_id, user_two_id) VALUES ($1, $2) RETURNING *', [user_id, profile_id])
      const visitor = await db.query("SELECT * FROM users WHERE user_id = $1", [
        user_id,
      ]);
      if (visitor.rowCount > 0) {
        const visitNotification = await db.query(
          "INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *",
          [
            profile_id,
            user_id,
            `${
              visitor.rows[0].first_name.charAt(0).toUpperCase() +
              visitor.rows[0].first_name.slice(1)
            } visited your profile!`,
          ]
        );
        //console.log(visitNotification);
      }
    }
    //return res.send(results)
    return res.status(200);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
//const isItAMatch = db.query("SELECT * likes WHERE user_id = $2 AND liked_user = $1", [user_id, profile_id]);
exports.likeUser = async (req, res) => {
  //console.log('Request.body in profileController.likeUser:')
  //console.log(req.body)
  try {
    const { user_id, profile_id, first_name } = req.body;

    //console.log(isItAMatch)

    //console.log(`Now we insert like from ${user_id} to ${profile_id}`)
    const results = await db.query(
      "INSERT INTO likes (user_id, liked_user) VALUES ($1, $2) RETURNING *",
      [user_id, profile_id]
    );
    //console.log(results)

    // Notify target that user has liked them.
    const notification = await db.query(
      "INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *",
      [
        profile_id,
        user_id,
        `${
          first_name.charAt(0).toUpperCase() + first_name.slice(1)
        } liked your profile!`,
      ]
    );
    const isMatch = await db.query(
      "SELECT * FROM likes WHERE user_id = $1 and liked_user = $2",
      [profile_id, user_id]
    );
    console.log("isMatch: ");
    if (isMatch.rowCount > 0) {
      //console.log('It\'s a match!');
      const matched = await db.query(
        "INSERT INTO conversations (user_one_id, user_two_id) VALUES ($1, $2) RETURNING *",
        [user_id, profile_id]
      );
      const matchNotification = await db.query(
        "INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *",
        [
          profile_id,
          user_id,
          `You matched with ${
            first_name.charAt(0).toUpperCase() + first_name.slice(1)
          }!`,
        ]
      );
      const matchedUser = await db.query(
        "SELECT * FROM users WHERE user_id = $1",
        [profile_id]
      );
      console.log(matchedUser);
      if (matchedUser.rowCount > 0) {
        const matchNotification = await db.query(
          "INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *",
          [
            user_id,
            profile_id,
            `You matched with ${
              matchedUser.rows[0].first_name.charAt(0).toUpperCase() +
              matchedUser.rows[0].first_name.slice(1)
            }!`,
          ]
        );
      } //console.log(matched);
    }
    return res.send(results);
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.getLike = async (req, res) => {
  console.log("Request.body in profileController.getLike:");
  console.log(req.body);
  try {
    const { user_id, profile_id } = req.body;

    //console.log(`Now we get like from ${user_id} to ${profile_id}`)
    const results = await db.query(
      `SELECT * FROM likes WHERE user_id = $1 AND liked_user = $2`,
      [user_id, profile_id]
    );
    //console.log(results)

    // To-do: insert notification.

    return res.send(results);

    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.unlikeUser = async (req, res) => {
  console.log("Request.body in profileController.unlikeUser:");
  console.log(req.body);
  try {
    const { user_id, profile_id, first_name } = req.body;

    console.log(`Now we delete like from ${user_id} to ${profile_id}`);
    const results = await db.query(
      "DELETE FROM likes WHERE user_id = $1 AND liked_user = $2",
      [user_id, profile_id]
    );
    //const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [profile_id]);
    //console.log(results)
    // To-do: insert notification.
    const notification = await db.query(
      "INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *",
      [
        profile_id,
        user_id,
        `${
          first_name.charAt(0).toUpperCase() + first_name.slice(1)
        } unliked your profile! D:`,
      ]
    );

    // To-do: insert notification.

    return res.sendStatus(201);
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.blockUser = async (req, res) => {
  console.log("Request.body in profileController.blockUser:");
  console.log(req.body);
  try {
    const { user_id, profile_id } = req.body;

    console.log(`Now we insert block from ${user_id} to ${profile_id}`);
    const results = await db.query(
      "UPDATE users SET blocked_users = array_append(blocked_users, $2)  WHERE user_id = $1 RETURNING *",
      [user_id, profile_id]
    );
    console.log(results);

    // To-do: insert notification.

    const user = await findUserInfo("user_id", user_id);
    console.log(user);
    return res.send(user);
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

exports.reportUser = async (req, res) => {
  console.log("Request.body in profileController.reportUser:");
  console.log(req.body);
  try {
    const { user_id, profile_id } = req.body;

    console.log(`Now we insert report from ${user_id} to ${profile_id}`);
    const results = await db.query(
      "INSERT INTO fake_account_reports (user_id, reported_user) VALUES ($1, $2) RETURNING *",
      [user_id, profile_id]
    );
    //console.log(results)

    // To-do: insert notification.

    return res.sendStatus(200);
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
