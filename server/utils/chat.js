const express = require("express");
const http = require("http");
const app = express();
const cors = require('cors')
app.use(cors())
const server = http.createServer(app);
const socket = require("socket.io");
//const io = socket(server);
const { insertMessageIntoConversation } = require('../controllers/conversationController')

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
  socket.on('create', function(room) {
    socket.join(room);
    console.log(`Created room:`)
    console.log(room);
  });
  //console.log(socket);
  socket.emit("your id", socket.id);
  socket.on("send message", message => {
    console.log(message)
    //io.emit("message", message)
    /*// to individual socketid (private message)
  io.to(socketId).emit([message]);*/
    // Put message in database here?
  // to all clients in room1
  insertMessageIntoConversation(message)
  io.to(message.conversation).emit("message", message);
  })
})

/*var userNames = {};
io.on('setSocketId', data => {
    var userName = data.name;
    var userId = data.userId;
    userNames[userName] = userId;
    console.log(`user names: ${userNames}`);
});*/

const PORT = 3001;

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`));