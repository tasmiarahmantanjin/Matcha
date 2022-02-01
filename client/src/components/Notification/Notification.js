import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const Notification = ({ data }) => <>
	{data.read ? null : <FontAwesomeIcon icon={faCircle} color="gold" size="xs" className="mr-1" />}
	{data.notification}
</>

export default Notification