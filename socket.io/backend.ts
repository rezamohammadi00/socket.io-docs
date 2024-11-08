const express = require("express");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;
const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: "*", // tip: this command is used to allow all origins(domains) to connect to the server
    //origin: "http://localhost:5173", // tip: this command is used to allow only one origin(domain) to connect to the server
  },
});

io.on("connection", (socket) => {
  //socket == the sender(client or user)
  socket.emit("message", "Welcome to the server"); // this command to send a message to the sender when it connects to the server
  //socket.broadcast.emit("message", response);  // send to all clients except the sender when a client connects to the server
  // socket.emit("message", message);  // send to the sender when a client connects to the server

  console.log(socket.id); // this command to get the id of the sender , this id is unique for each client

  socket.on("message", (message) => {
    //console.log(message);

    //console.log(socket.id); // this command to get the id of the sender , this id is unique for each client

    // const response = {
    //   message: message,
    //   userId: socket.id,
    // };

    io.emit("message", message, socket.id); // send to all clients
    //socket.broadcast.emit("message", response);  // send to all clients except the sender
    // socket.emit("message", message);  // send to the sender
  });

  // this command to join the sender to a room(roomId) and send a message to all clients in the room(roomId)
  //tip: for that name of the room is required
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId); // this command to join the sender to a room(roomId)

    socket.broadcast.to(roomId).emit("roomCreated", roomId); // this command to send a message to all clients in the room(roomId) except the sender

    //tip: the 2lines below are the same
    socket.to(roomId).emit("roomCreated", roomId); // this command to send a message to all clients in the room(roomId) including the sender
    io.to(roomId).emit("roomCreated", roomId); // this command to send a message to all clients in the room(roomId) including the sender

    //********************************************************************************************************************************************
    // a user who is not a member of a room cannot send a message to that room using socket.to(roomId).emit() or similar methods in Socket.IO.
    // but a user who is not a member of a room can send a message to that room using io.to(roomId).emit()
    //If a user who is not a member of a room attempts to send a message to that room using socket.to(roomId).emit() (or similar methods like io.to(roomId).emit()), nothing will happen(error and warning will not be thrown).
    //********************************************************************************************************************************************

    socket.leave(roomId); // this command to leave the sender from the room(roomId)
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});


//tip: If the room specified by roomId does not exist (i.e., there are no clients currently in the room), nothing will happen when you call:
// io.to(roomId).emit("roomMessage", "This is a message for the room!");
//یعنی موجود ولی عضو نداره