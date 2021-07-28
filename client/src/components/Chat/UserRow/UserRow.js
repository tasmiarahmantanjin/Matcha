import React from 'react'
import UserMessage from '../UserMessage/UserMessage'
import './UserRow.css'

const UserRow = ({ index, sender, timestamp, message }) =>{
	return (
		<div className="UserRow">
			<UserMessage sender={sender} timestamp={timestamp} message={message} />
		</div>
	) }

export default UserRow