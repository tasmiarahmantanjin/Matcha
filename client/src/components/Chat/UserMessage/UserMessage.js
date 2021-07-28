import React from 'react'
import './UserMessage.css'

const UserMessage = ({ sender, timestamp, message }) =>{
  var time_sent = new Date(timestamp).toString() // Trim timestamp to relevant hours and minutes.
	return (
		<div className="UserMessage">
			<p>{sender} at {time_sent}:</p>
      {message}
		</div>
	) }

export default UserMessage