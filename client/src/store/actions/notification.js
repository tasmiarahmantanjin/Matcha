import NotificationService from '../../services/notificationService'

import { GET_NOTIFICATIONS, POST_NOTIFICATION, PATCH_NOTIFICATION, PATCH_NOTIFICATION_ID } from '../types/index'


export const getNotifications = (params) => dispatch => {
	//console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
	return NotificationService.getNotifications(params)
		.then(data => {
			console.log("From getNotifications store", data);
			dispatch({ type: GET_NOTIFICATIONS, payload: data })
		})
		.catch(err => {
			throw err
		})
}

export const sendNotifications = (params) => dispatch => {
	//console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
	return NotificationService.sendNotifications(params)
		.then(data => {
			dispatch({ type: POST_NOTIFICATION, payload: data })
		})
		.catch(err => {
			throw err
		})
}

export const notification3 = (params) => dispatch => {
	//console.log(`Data in auth.js: ${params.get('id')}`)
	return NotificationService.notification3(params)
		.then(data => {
			dispatch({ type: PATCH_NOTIFICATION, payload: data })
		})
		.catch(err => {
			throw err
		})
}

export const notification4 = (params) => dispatch => {
	//console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
	return NotificationService.notification4(params)
		.then(data => {
			dispatch({ type: PATCH_NOTIFICATION_ID, payload: data })
		})
		.catch(err => {
			throw err
		})
}


