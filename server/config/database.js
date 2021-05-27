const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  port: 5432,
  database: "login_matcha"
});

module.exports = pool;