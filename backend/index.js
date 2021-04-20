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

app.use(router);

// to be able to serve image from a static sourse
app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/uploads'))

const port = config.appPort

app.listen(port, () => {
    console.log(`CORS-enabled web Server listening on port ${port}`);
})
