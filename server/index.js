/*const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')
const port = 5000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/users', db.getUsers)
app.get('/users/:id', db.getUserById)
app.post('/users', db.createUser)
app.put('/users/:id', db.updateUser)

// TO-DO:
// Update username.
// Update user password.
// Update user email.
// Update user verification.
// Update user settings (matching preferences, notifications setting).
// Update user location

app.delete('/users/:id', db.deleteUser)

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})*/

const express = require('express')
const config = require('./config/app')
const router = require('./router')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
// const http = require('http')

// parse application/x-www-form-urlencoded: Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json());

// to solve the issue to render data from one port to another
app.use(cors());

// Fire up the router's
app.use(router);

// to be able to serve image from a static source
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const port = config.appPort

app.listen(port, () => {
    console.log(`CORS-enabled web Server listening on port ${port}`);
})
