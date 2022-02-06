const express = require("express");
const config = require("./config/app");
const router = require("./router");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const chat = require("./utils/chat.js");

// parse application/x-www-form-urlencoded: Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// parse application/json
app.use(express.json());

// to solve the issue to render data from one port to another
app.use(cors());

// Fire up the router's
app.use(router);

// to be able to serve image from a static source
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

const port = config.appPort;

app.listen(port, () => {
  console.log(`CORS-enabled web Server listening on port ${port}`);
});
