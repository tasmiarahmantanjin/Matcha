import React from 'react'
import './PartnerMessage.css'

const PartnerMessage = ({ sender, timestamp, message }) =>{
  var time_sent = new Date(timestamp).toString() // Trim timestamp to relevant hours and minutes.
	return (
		<div className="PartnerMessage">
			<p>{sender} at {time_sent}:</p>
      {message}
		</div>
	) }

export default PartnerMessage