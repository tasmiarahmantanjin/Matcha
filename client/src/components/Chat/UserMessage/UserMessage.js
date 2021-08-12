import React from 'react'
import './UserMessage.css'

const UserMessage = ({ sender, timestamp, message }) =>{
  var time_sent = new Date(timestamp).toLocaleDateString([], {hour12: false, hour: '2-digit', minute:'2-digit'}) // Trim timestamp to relevant hours and minutes.
	return (
		<div className="UserMessage">
			<p>{sender.charAt(0).toUpperCase() + sender.slice(1)} on {time_sent} :</p>
      {message}
		</div>
	) }

export default UserMessage