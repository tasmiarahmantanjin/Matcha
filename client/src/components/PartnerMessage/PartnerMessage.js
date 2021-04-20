import React from 'react'
import './PartnerMessage.css'

const PartnerMessage = ({ message }) =>{
	return (
		<div className="PartnerMessage">
			<p>{message.id} TIME</p>
      {message.body}
		</div>
	) }

export default PartnerMessage