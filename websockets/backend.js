//websockets server

const { WebSocketServer } = require("ws"); // npm i ws   // WebSocketServer is a class that creates a websocket server

const wss = new WebSocketServer({ port: 8080, host: "localhost" });

wss.on("connection", (ws) => {
  //console.log("New connection");   // when a new connection is established this message is logged
  ws.send(JSON.stringify("Welcome to the server")); // when a new connection is established this message is sent to the client(sender)

  ws.on("message", (message) => {
    // console.log(message);   // the message is a buffer ,you need to convert it to a string using toString() method
    const b = Buffer.from(message); // convert the message to a buffer
    //console.log(b.toString()); // convert the buffer to a string

    console.log(`Received message: ${b.toString()}`); // when a message is received this message is logged     // the message is a string sent by the client(sender)
    ws.send(JSON.stringify(`you sent -> ${b.toString()}`)); // when a message is received, this message is sent back to the sender  //tip: argument can be a string, can not be an object or an array and boolean.
  });
});
