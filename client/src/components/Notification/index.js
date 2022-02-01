import React from 'react'
import { NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faCircle } from '@fortawesome/free-solid-svg-icons'
import Notification from './Notification'

const Notifications = ({ notifications, handleNotificationClick, markAllNotificationsRead }) => {

	const notificationsToRender = () => notifications
		? notifications.slice(0, 8)
		: []

	const unreadNotifications = () => notifications
		? notifications.find(n => !n.read) !== undefined
		: false

	const dropDownButton = () => <>
		<FontAwesomeIcon icon={faBell} size='sm' />
		{unreadNotifications()
			? <FontAwesomeIcon icon={faCircle} color='gold' size='xs' className='unreadNotifications' />
			: null
		}
	</>

	return notifications
		? <NavDropdown title={dropDownButton()} id="nav-dropdown" alignRight>
			<NavDropdown.Header>Notifications</NavDropdown.Header>
			{
				notificationsToRender()
					.map(n => <NavDropdown.Item key={n.id} onClick={() => handleNotificationClick(n)}>
						<Notification data={n} handleClick={handleNotificationClick} />
					</NavDropdown.Item>)
			}
			<NavDropdown.Divider className='p-0' />
			<NavDropdown.Item as={Link} to='/notifications' className='text-primary'>View all</NavDropdown.Item>
			<NavDropdown.Item onClick={markAllNotificationsRead} className='text-primary'>Mark all as read</NavDropdown.Item>
		</NavDropdown>
		: null

}

export default Notifications
