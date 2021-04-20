import React from 'react'
import './UserMessage.css'

const UserMessage = ({ message }) =>{
	return (
		<div className="UserMessage">
			<p>{message.id} TIME</p>
      {message.body}
		</div>
	) }

export default UserMessage