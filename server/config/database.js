const config = require('./app')
const Pool = require("pg").Pool;

const pool = new Pool({
  host: config.appDbHost,
  user: config.appDbUser,
  password: config.appDbPass,
  port: 5432,
  database: config.appDbDatabase
});

module.exports = pool;