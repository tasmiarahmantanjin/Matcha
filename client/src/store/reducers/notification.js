import { GET_NOTIFICATIONS, POST_NOTIFICATION, PATCH_NOTIFICATION, PATCH_NOTIFICATION_ID } from '../types/index'

const initialState = {
	// to store the token & user into localStorage to solve the refresh problem
	user: JSON.parse(localStorage.getItem('user')) || {},
	token: localStorage.getItem('token') || '',
	isLoggedIn: localStorage.getItem('user') ? true : false
}

const notificationReducer = (state = initialState, action) => {

	const { type, payload } = action

	switch (type) {
		case GET_NOTIFICATIONS:
			// console.log(payload);
			return {
				...state,
				// user: payload.user,
				// token: payload.token,
				isLoggedIn: true,
				profile_id: payload.profile_id
			}

		case POST_NOTIFICATION:
			return {
				...state,
				// user: payload.user,
				token: payload.token,
				isLoggedIn: true
			}
		case PATCH_NOTIFICATION:
			return {
				...state,
				user: payload.user,
				// token: payload.token,
				isLoggedIn: true
			}
		case PATCH_NOTIFICATION_ID:
			return {
				...state,
				user: payload.user,
				// token: payload.token,
				isLoggedIn: true
			}
		default: {
			return state
		}
	}

}

export default notificationReducer