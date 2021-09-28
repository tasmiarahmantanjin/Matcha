import React from 'react'
import PartnerMessage from '../PartnerMessage/PartnerMessage'
import './PartnerRow.css'

const PartnerRow = ({ index, image, sender, timestamp, message }) =>{
	return (
		<div className="PartnerRow">
			<PartnerMessage image={image} sender={sender} timestamp={timestamp} message={message} />
		</div>
	) }

export default PartnerRow