import React from 'react'
import PartnerMessage from '../PartnerMessage/PartnerMessage'
import './PartnerRow.css'

const PartnerRow = ({ index, sender, timestamp, message }) =>{
	return (
		<div className="PartnerRow">
			<PartnerMessage sender={sender} timestamp={timestamp} message={message} />
		</div>
	) }

export default PartnerRow