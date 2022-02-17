const db = require('../config/database')

// This really should be a helper function in an import.
const findUserInfo = async (key, value, ...args) => {
  const info = args.length == 0 ? '*' : args.join(', ')

  const res = await db.query(`SELECT ${info} FROM users WHERE ${key} = $1`, [value])
  return res.rows[0]
}

exports.getUserById = async (req, res) => {
  try {
    const { profile_id } = req.body

    const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [profile_id])

    return res.send(results)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

/*
exports.visitUser = async (req, res) => {
  console.log('Request.body in visitUser:', req.body)
  try {
    const { profile_id, user_id } = req.body

    const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [profile_id])
    if (results.rowCount > 0) {
      const visitor = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id])
      if (visitor.rowCount > 0) {
        // Notify user that someone visited their profile.
        const visitNotification = await db.query(
          'INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *',
          [
            profile_id,
            user_id,
            `${
              visitor.rows[0].first_name.charAt(0).toUpperCase() +
              visitor.rows[0].first_name.slice(1)
            } visited your profile!`
          ]
        )
      }
    }
    return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
} */
exports.visitUser = async (req, res) => {
  console.log('Request.body in visitUser:')
  console.log(req.body)
  try {
    const { profile_id, user_id } = req.body

    const results = await db.query(`SELECT * FROM users WHERE user_id = $1`, [profile_id])
    console.log('This is a test', results)
    if (results.rowCount > 0) {
      console.log("It's a match!")
      //const matched = await db.query('INSERT INTO conversations (user_one_id, user_two_id) VALUES ($1, $2) RETURNING *', [user_id, profile_id])
      const visitor = await db.query('SELECT * FROM users WHERE user_id = $1', [user_id])
      console.log('This is a visitor', visitor)

      if (visitor.rowCount > 0) {
        let visitNotification = await db.query(
          'INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *',
          [
            profile_id,
            user_id,
            `${
              visitor.rows[0].first_name.charAt(0).toUpperCase() +
              visitor.rows[0].first_name.slice(1)
            } visited your profile!`
          ]
        )
        return res.send(visitNotification)
      }
    }
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.likeUser = async (req, res) => {
  try {
    const { user_id, profile_id, first_name } = req.body

    const results = await db.query(
      'INSERT INTO likes (user_id, liked_user) VALUES ($1, $2) RETURNING *',
      [user_id, profile_id]
    )

    // Notify target that user has liked them.
    const notification = await db.query(
      'INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *',
      [
        profile_id,
        user_id,
        `${first_name.charAt(0).toUpperCase() + first_name.slice(1)} liked your profile!`
      ]
    )
    const isMatch = await db.query('SELECT * FROM likes WHERE user_id = $1 and liked_user = $2', [
      profile_id,
      user_id
    ])
    console.log('isMatch: ')
    if (isMatch.rowCount > 0) {
      console.log("It's a match!")
      const matched = await db.query(
        'INSERT INTO conversations (user_one_id, user_two_id) VALUES ($1, $2) RETURNING *',
        [user_id, profile_id]
      )

      // Notify target that it's a match.
      const matchNotification = await db.query(
        'INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *',
        [
          profile_id,
          user_id,
          `You matched with ${first_name.charAt(0).toUpperCase() + first_name.slice(1)}!`
        ]
      )
      const matchedUser = await db.query('SELECT * FROM users WHERE user_id = $1', [profile_id])
      console.log(matchedUser)
      if (matchedUser.rowCount > 0) {
        const matchNotification = await db.query(
          'INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *',
          [
            user_id,
            profile_id,
            `You matched with ${
              matchedUser.rows[0].first_name.charAt(0).toUpperCase() +
              matchedUser.rows[0].first_name.slice(1)
            }!`
          ]
        )
      }
    }
    return res.send(results)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.getLike = async (req, res) => {
  console.log('Request.body in profileController.getLike:')
  console.log(req.body)
  try {
    const { user_id, profile_id } = req.body

    const results = await db.query(`SELECT * FROM likes WHERE user_id = $1 AND liked_user = $2`, [
      user_id,
      profile_id
    ])

    return res.send(results)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.unlikeUser = async (req, res) => {
  console.log('Request.body in profileController.unlikeUser:')
  console.log(req.body)
  try {
    const { user_id, profile_id, first_name } = req.body

    console.log(`Now we delete like from ${user_id} to ${profile_id}`)
    const results = await db.query('DELETE FROM likes WHERE user_id = $1 AND liked_user = $2', [
      user_id,
      profile_id
    ])

    // To-do: insert notification when user un-liked your profile.
    const notification = await db.query(
      'INSERT INTO notifications (user_id, from_id, notification) VALUES ($1, $2, $3) RETURNING *',
      [
        profile_id,
        user_id,
        `${first_name.charAt(0).toUpperCase() + first_name.slice(1)} un-liked your profile! D:`
      ]
    )

    return res.sendStatus(201)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.blockUser = async (req, res) => {
  console.log('Request.body in profileController.blockUser:', req.body)
  try {
    const { user_id, profile_id } = req.body

    console.log(`Now we insert block from ${user_id} to ${profile_id}`)
    const results = await db.query(
      'UPDATE users SET blocked_users = array_append(blocked_users, $2)  WHERE user_id = $1 RETURNING *',
      [user_id, profile_id]
    )
    console.log(results)

    const user = await findUserInfo('user_id', user_id)
    return res.send(user)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}

exports.reportUser = async (req, res) => {
  console.log('Request.body in profileController.reportUser:')
  console.log(req.body)
  try {
    const { user_id, profile_id } = req.body

    console.log(`Now we insert report from ${user_id} to ${profile_id}`)
    const results = await db.query(
      'INSERT INTO fake_account_reports (user_id, reported_user) VALUES ($1, $2) RETURNING *',
      [user_id, profile_id]
    )
    //console.log(results)

    // To-do: insert notification.

    return res.sendStatus(200)
    //return res.status(200)
  } catch (e) {
    return res.status(500).json({ message: e.message })
  }
}
