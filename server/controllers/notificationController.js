const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const config = require("../config/app");

exports.getNotifications = async (req, resp) => {
  //console.log("Endpoint hit: getNotifications");
  //console.log(req.body.user.user_id);

  try {
    const user_id = req.body.user.user_id;
    //console.log(`user ID = ${user_id}`);
    //1. Get the user's token
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return resp.status(401).json({ error: "Missing token!" });
    }

    //2. Verify the token
    const user = jwt.verify(token, config.appKey);
    if (!user)
      return resp.status(401).json({ error: "token missing or invalid" });

    //3. Database query to get the data from notification table if user_id exists
    if (user_id) {
      //console.log("We have a user ID.");
      pool.query(
        `SELECT * FROM notifications WHERE user_id = $1 ORDER BY date DESC`,
        [user_id],
        (err, result) => {
          if (err) {
            return resp.status(500).json({ error: err });
          }
          resp.json(result.rows);
        }
      );
    } else
      pool.query(
        "SELECT * FROM notifications ORDER BY date DESC",
        [],
        (err, res) => {
          if (err) return resp.status(500).send({ error: err.detail });
          resp.status(200).send(res.rows);
        }
      );
  } catch (err) {
    //console.log(err);
    resp.status(500).json({ error: err });
  }
};

exports.setNotificationAsRead = async (req, resp) => {
 //console.log("Endpoint hit: setNotificationAsRead");
  //console.log(req.body.user.user_id);

  try {
    const id = req.body.id;
    const user_id = req.body.user_id
    //console.log(`user ID = ${user_id}`);
    //1. Get the user's token
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return resp.status(401).json({ error: "Missing token!" });
    }

    //2. Verify the token
    const user = jwt.verify(token, config.appKey);
    if (!user)
      return resp.status(401).json({ error: "token missing or invalid" });

    //3. Database query to get the data from notification table if user_id exists
    if (id) {
      //console.log("We have an ID.");
      pool.query(
        `UPDATE notifications SET read = 1 WHERE id = $1`,
        [id]
      );
      // resp.status(200).json({ status: 'success'});
      const result = await pool.query(
        `SELECT * FROM notifications WHERE user_id = $1 ORDER BY date DESC`,
        [user_id]
      );
      //console.log('Result:');
      //console.log(result);
      resp.json(result);
    } else {
      return resp.status(500).send({ error: "ERROR: Notifications not set as read." });
    }
  } catch (err) {
   //console.log(err);
    resp.status(500).json({ error: err });
  }
};
