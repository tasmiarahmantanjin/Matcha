import React, { useState, useEffect, useRef } from "react";

// import useSelector to connect the store with the component
import { useSelector} from 'react-redux'
import Navbar from '../Navbar/Navbar'
//import Match from './Match'
import {withRouter} from 'react-router';
import './Chat.scss'

import { useDispatch } from 'react-redux'

import Form from './Form/Form'
import UserRow from './UserRow/UserRow'
import PartnerRow from './PartnerRow/PartnerRow'
import io from "socket.io-client"


//import { getUserById } from '../../../../server/controllers/profileController';



const Chat = ( { id } ) => {

  const [conversation, setConversation] = useState()
  const [partner, setPartner] = useState()
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  var partner_id
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [yourID, setYourID] = useState(user.user_id);

  const socketRef = useRef();

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
    console.log(messages)
  }

  function sendMessage(e) {
    e.preventDefault();
    const messageObject = {
      message_text: message,
      sender_id: user.user_id,
      timestamp: new Date(),
      conversation: conversation.id,
      partner: partner.user_id // 
    };
    console.log(`Message: ${messageObject.message_text}`)
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions0 = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: id })
    };
    fetch('http://localhost:5000/conversation', requestOptions0)
        .then(response => response.json())
        .then(data =>{
          //console.log('Data: ')
          //console.log(data.rows) 
          setConversation(data.rows[0])
          //console.log(conversation)
          if (data.rows[0].user_one_id === user.user_id) {
            //console.log(`User ID matched: ${data.rows[0].user_one_id}`)
            partner_id = data.rows[0].user_two_id
            const requestOptions2 = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ profile_id: partner_id })
          };
          fetch('http://localhost:5000/profile', requestOptions2)
              .then(response => response.json())
              .then(data =>{
                //console.log(data.rows) 
                setPartner(data.rows[0])
                //console.log('Partner after fetching:');
                //console.log(`${data.rows[0]}`)
              });
          } else {
            //console.log(`Partner after checking: ${data.rows[0].user_two_id}`);
            //setPartner(data.rows[0].user_one_id)
            partner_id = data.rows[0].user_one_id
            const requestOptions2 = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ profile_id: partner_id })
          };
          fetch('http://localhost:5000/profile', requestOptions2)
              .then(response => response.json())
              .then(data =>{
                //console.log(data.rows) 
                setPartner(data.rows[0])
                //console.log('Partner after fetching:');
                //console.log(`${data.rows[0]}`)
              });
          }
          const requestOptions1 = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ conversation_id: data.rows[0].id })
        };
        fetch('http://localhost:5000/messages', requestOptions1)
            .then(response => response.json())
            .then(data =>{
              //console.log(data.rows) 
              setMessages(data.rows)
            });
            socketRef.current = io.connect('localhost:3001/')
            /*var data = {name: user.user_name, userId: socketRef.current.id};
            socketRef.current.emit('setSocketId', data);*/
            socketRef.current.emit('create', data.rows[0].id)
        
            
            /*socketRef.current.on('connection', socket => {
              socket.join(conversation);
              console.log(`socket.rooms: ${socket.rooms}`);
            });*/
        
            socketRef.current.on("your id", id => {
              setYourID(id);
              console.log(`yourID: ${yourID}`)
            })
        
            socketRef.current.on("message", (message) => {
              console.log("Message.");
              console.log(message)
              receivedMessage(message);
            })
        });
        //console.log(`Partner to use for fetching partner data: ${partner_id}`)
        
    
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
//console.log(`${partner}`)

  function handleChange(e) {
    setMessage(e.target.value);
  }



  const formatTimestamp = (timestamp) => {
    console.log(`This is the string: ${timestamp}`);
    let date = new Date(timestamp)
    let ret
    let n = date.toLocaleDateString()
    let substr = timestamp.substring(0, 21)
    console.log(`n = ${typeof(n)}`);
    return timestamp
  }

    return (
      <div>
        <div id='chat-container'>
            <div id='chat-wrap'>
                <Navbar />
            </div>
            <div className="container">
            {messages.map((message, index) => {
          if (message.sender_id === user.user_id) {
            return (
              <UserRow key={index} sender={user.first_name} timestamp={formatTimestamp(message.timestamp)} message={message.message_text} /> // 
            )
          }
          return (
            <PartnerRow key={index} sender={partner.first_name} timestamp={formatTimestamp(message.timestamp)} message={message.message_text} />
          )
        })}
      </div>
      <Form message={message} onSubmit={sendMessage} handleChange={handleChange}>
        
      </Form>
            </div>
            <p>Here will be some chat messages.</p>

            
        </div>
    );
}

export default withRouter(Chat)