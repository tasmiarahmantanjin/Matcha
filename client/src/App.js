import React, { useState, useEffect, useRef } from "react";
import Form from './components/Form/Form'
import UserRow from './components/UserRow/UserRow'
import PartnerRow from './components/PartnerRow/PartnerRow'
import './App.css'
import io from "socket.io-client"

const App = () => {
  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      setYourID(id);
    })

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      body: message,
      id: yourID,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <div className="Page">
      <div className="Container">
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <UserRow key={index} message={message} />
            )
          }
          return (
            <PartnerRow key={index} message={message} />
          )
        })}
      </div>
      <Form message={message} onSubmit={sendMessage} handleChange={handleChange}>
        
      </Form>
    </div>
  );
};

export default App;
