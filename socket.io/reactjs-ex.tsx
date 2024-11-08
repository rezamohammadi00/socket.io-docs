import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.auth = {  //tip: this command must be executed only once  //this command is used to send the token to the server 
  token: "1234567890",
};

function ChatComponent() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected");
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


    socket.on("message", (data) => {
      console.log("Message:", data);
    });

    // Clean up connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const sendMessage = () => {
    socket.emit("sendMessage", { message: "Hello from client!" });
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
}

export default ChatComponent;
