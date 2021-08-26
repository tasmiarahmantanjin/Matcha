import NotificationService from '../../services/notificationService'

import { GET_NOTIFICATIONS, POST_NOTIFICATION, PATCH_NOTIFICATION, PATCH_NOTIFICATION_ID } from '../types/index'


export const notification1 = (params) => dispatch => {
	//console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
	return NotificationService.notification1(params)
		.then(data => {
			console.log("From notification1 store",data);
			dispatch({ type: GET_NOTIFICATIONS, payload: data })
		})
		.catch(err => {
			throw err
		})
}

export const notification2 = (params) => dispatch => {
	//console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
	return NotificationService.notification2(params)
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


