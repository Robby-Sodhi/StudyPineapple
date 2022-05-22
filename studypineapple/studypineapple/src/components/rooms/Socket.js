import io, { Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import "./socket.css";

const socket = io.connect("http://localhost:3001");

function SocketWS() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="App">
      <input
        className="inputbob"
        placeholder="Room Number..."
        onChange={(event) => {
          setRoom(event.target.value);
        }}
      />
      <button className="btnbob" onClick={joinRoom}>
        {" "}
        Join Room
      </button>
      <input
        className="inputbob"
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button className="btnbob" onClick={sendMessage}>
        {" "}
        Send Message
      </button>
      <h1> Message:</h1>
      {messageReceived}
    </div>
  );
}

export default SocketWS;
