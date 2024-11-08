// handle socket.io communication on client side

import { io } from "socket.io-client"; // npm install socket.io-client

// ----------------------------------------------------------------------------------------------------

const socket = io("http://localhost:3000"); // connect to server      //tip: this command must be executed only once

// const socket = io('http://localhost:3000', {
//     reconnectionAttempts: 5, // Maximum reconnection attempts
//     reconnectionDelay: 1000, // Delay in ms between attempts
//   })

// ----------------------------------------------------------------------------------------------------

console.log(socket.id); // log the socket id that the server assigned to the client
console.log(socket.connected); // log the connection status of the socket

console.log(socket.disconnected); // log the disconnection status of the socket
console.log(socket.pingInterval); // log the ping interval of the socket
console.log(socket.pingTimeout); // log the ping timeout of the socket

// ---------------------------------------------------------------------------------------------------------

// receive event from server
socket.on("eventName", (erg1, erg2, ...args) => {
  // parameters (erg1,erg2,...) can to be any type.  (e.g. string,number,object,array,boolean,etc.)
  console.log(erg1, erg2, args);
}); //tip: this command must be executed only once

let userName = "John";
let userAge = 20;
let userInfo = { name: userName, age: userAge };
let userArray = [1, 2, 3, 4, 5];
let userBoolean = true;

// send event to server
socket.emit(userName, userAge, userInfo, userBoolean); // args(userName, userAge, userInfo, userBoolean) can be any type.  (e.g. string,number,object,array,boolean,etc.)

// ---------------------------------------------------------------------------------------------------------
socket.on("connect", () => {             //tip: this command must be executed only once
  console.log("Connected to server");    // when the client is connected to the server, this message will be displayed in the console
});

socket.on("disconnect", () => {          //tip: this command must be executed only once
  console.log("Disconnected from server");  // when the client is disconnected from the server, this message will be displayed in the console
});


  // socket.on('connect_error', (error) => {
    //     console.log('Connection Error:', error);
    //   });
      
    //   socket.on('reconnect_attempt', (attempt) => {
    //     console.log(`Reconnect attempt #${attempt}`);
    //   });
      
    //   socket.on('reconnect', () => {
    //     console.log('Reconnected to server');
    //   });

    
// ---------------------------------------------------------------------------------------------------------

socket.disconnect();  // when this command is executed, the client will be disconnected from the server

// ---------------------------------------------------------------------------------------------------------
