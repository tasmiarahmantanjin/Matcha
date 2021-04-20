import React from 'react'
import PartnerMessage from '../PartnerMessage/PartnerMessage'
import './PartnerRow.css'

const PartnerRow = ({ index, message }) =>{
	return (
		<div className="PartnerRow">
			<PartnerMessage message={message} />
		</div>
	) }

export default PartnerRow