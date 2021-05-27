const bcrypt = require('bcrypt');               //Importing the NPM bcrypt package.
const saltRounds = 10;                          //We are setting salt rounds, higher is safer.
const myPlaintextPassword = 's0/\/\P4$$w0rD';   //Unprotected password
var has
var res

/* Here we are getting the hashed password from the callback,
we can save that hash in the database */
bcrypt.hash(myPlaintextPassword, saltRounds, (err, hash) => {
  //save the hash in the db
  has = hash
  console.log(hash)
  bcrypt.compare(myPlaintextPassword, has, function(error, response) {
    // response == true if they match
    // response == false if password is wrong
    if (response === true) {
      console.log('Match.');
    }
});
});

/* Here we can compare the hashed password after we get it from
the database with the plaintext password */
/*bcrypt.compare(myPlaintextPassword, hash, function(error, response) {
    // response == true if they match
    // response == false if password is wrong
    if (response === true) {
      console.log('Match.');
    }
});*/