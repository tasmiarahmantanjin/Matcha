import React, { useState, useEffect, useRef } from "react";

// import useSelector to connect the store with the component
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";
//import Match from './Match'
import { withRouter } from "react-router";
import "./Chat.scss";

import { useDispatch } from "react-redux";

import chatService from "../../services/chatService";
import Form from "./Form/Form";
import UserRow from "./UserRow/UserRow";
import PartnerRow from "./PartnerRow/PartnerRow";
import io from "socket.io-client";

//import { getUserById } from '../../../../server/controllers/profileController';

const Chat = ({ id }) => {
  const [conversation, setConversation] = useState();
  const [partner, setPartner] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  //var partner_id
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [yourID, setYourID] = useState(user.user_id);

  const socketRef = useRef();

  const receivedMessage = (message) => {
    setMessages((oldMsgs) => [...oldMsgs, message]);
    console.log(messages);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    const messageObject = {
      message_text: message,
      sender_id: user.user_id,
      timestamp: new Date(),
      conversation: conversation.id,
      partner: partner.user_id,
    };
    console.log(`Message: ${messageObject.message_text}`);
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  };

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestObject = {
      id: id,
    };
    //console.log('Getting conversation.');
    chatService
      .getConversation(requestObject) // Getting conversation
      .then((data) => {
        //console.log('Data: ')
        //console.log(data.rows)
        setConversation(data.rows[0]);
        //console.log(conversation)
        if (data.rows[0].user_one_id === user.user_id) {
          // Getting partner where user is user one.
          let partner_id = data.rows[0].user_two_id;
          const requestObject = {
            profile_id: partner_id,
          };
          chatService
            .getPartnerProfile(requestObject)
            //console.log(`User ID matched: ${data.rows[0].user_one_id}`)
            .then((data) => {
              //console.log(data.rows)
              setPartner(data.rows[0]);
              //console.log('Partner after fetching:');
              //console.log(`${data.rows[0]}`)
            });
        } else {
          // Getting partner where user is user two.
          //console.log(`Partner after checking: ${data.rows[0].user_two_id}`);
          //setPartner(data.rows[0].user_one_id)
          let partner_id = data.rows[0].user_one_id;
          const requestObject = {
            profile_id: partner_id,
          };
          chatService
            .getPartnerProfile(requestObject)
            //console.log(`User ID matched: ${data.rows[0].user_one_id}`)
            .then((data) => {
              //console.log(data.rows)
              setPartner(data.rows[0]);
              //console.log('Partner after fetching:');
              //console.log(`${data.rows[0]}`)
            });
        }
        const requestObject = {
          conversation_id: data.rows[0].id,
        };
        chatService
          .getMessages(requestObject) // Getting messages.
          .then((data) => {
            //console.log(data.rows)
            setMessages(data.rows);
          });

        /**
         * Keep this bit...
         */
        socketRef.current = io.connect("localhost:3001/");
        /*var data = {name: user.user_name, userId: socketRef.current.id};
      socketRef.current.emit('setSocketId', data);*/
        socketRef.current.emit("create", data.rows[0].id);

        /*socketRef.current.on('connection', socket => {
        socket.join(conversation);
        console.log(`socket.rooms: ${socket.rooms}`);
      });*/

        socketRef.current.on("your id", (id) => {
          setYourID(id);
          console.log(`yourID: ${yourID}`);
        });

        socketRef.current.on("message", (message) => {
          console.log("Message.");
          console.log(message);
          receivedMessage(message);
        });
      });

    /**
     * ... until here.
     */
    //console.log(`Partner to use for fetching partner data: ${partner_id}`)

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div id="chat-container">
      <div id="chat-wrap">
        <Navbar />
      </div>

      <div>
        {messages.map((message, index) => {
          if (message.sender_id === user.user_id) {
            return (
              <UserRow
                image={`${user.user_id}/${user.avatar}`}
                key={index}
                sender={user.first_name}
                timestamp={message.timestamp}
                message={message.message_text}
              />
            );
          } else if (partner) {
            return (
              <PartnerRow
                key={index}
                image={`${partner.user_id}/${partner.avatar}`}
                sender={partner.first_name}
                timestamp={message.timestamp}
                message={message.message_text}
              />
            );
          }
        })}
      </div>
      <Form
        message={message}
        onSubmit={sendMessage}
        handleChange={handleChange}
      ></Form>
    </div>
  );
};

export default withRouter(Chat);
