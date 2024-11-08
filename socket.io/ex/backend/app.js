const express = require("express");
const { Server } = require("socket.io");

const app = express();
const PORT = process.env.PORT || 3000;
const expressServer = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(expressServer, {
  cors: {
    origin: "*", // origin is the domain(url) of the client
  },
});

io.on("connection", (socket) => {
  socket.emit("message", "Welcome to the server");

  console.log(socket.id);

  socket.on("message", (message) => {
    io.emit("message", message, socket.id);
  });
});
