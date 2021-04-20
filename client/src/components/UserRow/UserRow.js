import React from 'react'
import UserMessage from '../UserMessage/UserMessage'
import './UserRow.css'

const UserRow = ({ index, message }) =>{
	return (
		<div className="UserRow">
			<UserMessage message={message} />
		</div>
	) }

export default UserRow