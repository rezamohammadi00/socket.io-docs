import "./App.css";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import arr from "./assets/arr.png";

const socket = io("http://localhost:3000");

const App = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<{message:string,userId:string}[]>([]);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    socket.on("message", (message, userId) => {
      console.log(message, userId);
      setResponse((pre) => [...pre, { message, userId }]);
    });
  }, []);

  socket.on("connect", () => {
  
    setUserId(socket.id || "do not know");
  });
  return (
    <div>
   
      <div className="flex gap-2 p-5 bg-[#227AFF] w-full items-center">
        <img
          src="https://picsum.photos/200/300"
          alt="random"
          className="w-12 h-12 rounded-full"
        />
        <p className="text-lg text-white">{userId}</p>
      </div>

      <div className="flex flex-col mt-8">
        {response.map((res) => {
          const isMe = res.userId === userId;
          const bg = isMe ? "#3CB6FA" : "#227AFF";
          return (
            <div className="w-56 bg-[#3CB6FA] rounded-md mb-4 p-4 text-white text-lg" style={{backgroundColor:bg,alignSelf:isMe?"flex-end":"flex-start"}}>
              {res.message}
            </div>
          );
        })}
      </div>

      {/* sending box */}
      <div className="absolute bottom-0 w-full bg-[#227AFF] flex items-center justify-between">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-16 bg-[#227AFF] p-4 text-white placeholder:text-white"
          placeholder="Send a message..."
        />
        <button
          onClick={() => {
            socket.emit("message", message);
            setMessage("");
          }}
          className="absolute right-4 p-2 text-black bg-white rounded-md"
        >
          <img src={arr} alt="send" className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default App;
