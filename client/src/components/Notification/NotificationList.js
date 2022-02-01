import React from 'react'
import { ListGroup, Button } from 'react-bootstrap'
import Notification from './Notification'

const NotificationsList = ({ notifications, handleClick, markAllAsRead }) => {

	return notifications
		? <>
			<div className="text-right mb-3" >
				<Button variant="link" className="text-primary" onClick={markAllAsRead}>
					Mark all as read
				</Button>
			</div>
			<ListGroup className="text-left cursor-pointer" variant="flush">
				{notifications.map(n =>
					<ListGroup.Item key={n.id} onClick={() => handleClick(n)} >
						<Notification data={n} />
					</ListGroup.Item>)
				}
			</ListGroup>
		</>
		: null
}

export default NotificationsList