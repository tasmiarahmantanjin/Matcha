const express = require("express");
const http = require("http");
const app = express();
const cors = require('cors')
app.use(cors())
const server = http.createServer(app);
const socket = require("socket.io");
//const io = socket(server);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    //allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

app.get('/', (req, res) => {
  console.log('Endpoint hit: Chat home')
	return res.send('Chat home is working');
})

io.on("connection", socket => {
  console.log('Connection.');
  socket.emit("your id", socket.id);
  socket.on("send message", message => {
    console.log(message)
    io.emit("message", message)
  })
})

const PORT = 3001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));