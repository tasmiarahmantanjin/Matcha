import React from 'react'
import UserMessage from '../UserMessage/UserMessage'
import './UserRow.css'

const UserRow = ({ index, image, sender, timestamp, message }) =>{
	return (
		<div className="UserRow">
			<UserMessage image={image} sender={sender} timestamp={timestamp} message={message} />
		</div>
	) }

export default UserRow