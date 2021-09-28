import React from 'react'
import './PartnerMessage.css'

const PartnerMessage = ({ image, sender, timestamp, message }) =>{
  let time_sent = new Date(timestamp).toLocaleDateString([], {hour12: false, hour: '2-digit', minute:'2-digit'}) // Trim timestamp to relevant hours and minutes.
	return (
		<div className="PartnerMessage">
			<div className="chat-header"><img className="chat-avatar" width="40" height="40" src={`http://localhost:5000/uploads/user/${image}`} alt='Avatar' />
      <p>{sender.charAt(0).toUpperCase() + sender.slice(1)} on {time_sent} :</p></div>
      {message}
      
		</div>
	) }

export default PartnerMessage