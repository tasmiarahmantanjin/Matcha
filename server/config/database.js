const config = require('./app')
const Pool = require("pg").Pool;

const pool = new Pool({
  host: config.appDbHost || 'localhost',
  user: config.appDbUser,
  password: config.appDbPass,
  port: 5432,
  database: config.appDbDatabase
});

module.exports = pool;

// Code to add retry logic
// const pgPool = new Pool(config);
// const pgPoolWrapper = {
//   async connect() {
//     for (let nRetry = 1; ; nRetry++) {
//       try {
//         const client = await pgPool.connect();
//         if (nRetry > 1) {
//           console.info('Now successfully connected to Postgres');
//         }
//         return client;
//       } catch (e) {
//         if (e.toString().includes('ECONNREFUSED') && nRetry < 5) {
//           console.info('ECONNREFUSED connecting to Postgres, ' +
//             'maybe container is not ready yet, will retry ' + nRetry);
//           // Wait 1 second
//           await new Promise(resolve => setTimeout(resolve, 1000));
//         } else {
//           throw e;
//         }
//       }
//     }
//   }
// };

// module.exports = pool;
