const pool = require("../config/database");
const jwt = require("jsonwebtoken");
const config = require("../config/app");

exports.getHashtags = async (req, resp) => {
  //console.log("Endpoint hit: getHashtags");
  try {
      const result = await pool.query(
        `SELECT * FROM hashtags ORDER BY number DESC LIMIT 3`,
      );
      resp.send(result.rows);
    } catch (err) {
    console.log(err);
    resp.status(500).json({ error: err });
  }
};

