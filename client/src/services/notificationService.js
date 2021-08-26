import API from './api'

const NotificationService = {
	notification1: (data) => {
		return API.get('/notifications', data)
			.then(({ data }) => {
				console.log("Data From NotificationAPI", data);
				// setHeadersAndStorage(data)
				return data
			})
			.catch(err => {
				console.log("Notification service err in Notification1", err);
				throw err
			})
	},
	notification2: (data) => {
		return API.post('/notifications', data)
			.then(({ data }) => {
				console.log("Data From NotificationAPI", data);
				// setHeadersAndStorage(data)
				return data
			})
			.catch(err => {
				console.log("Notification service err in Notification2", err);
				throw err
			})
	},
	notification3: (data) => {
		return API.patch('/notifications', data)
			.then(({ data }) => {
				console.log("Data From NotificationAPI", data);
				// setHeadersAndStorage(data)
				return data
			})
			.catch(err => {
				console.log("Notification service err in Notification3", err);
				throw err
			})
	},
	notification4: (data) => {
		return API.post('/notifications/:id', data)
			.then(({ data }) => {
				console.log("Data From API", data);
				// setHeadersAndStorage(data)
				return data
			})
			.catch(err => {
				console.log("Notification service err in Notification", err);
				throw err
			})
	},
}

export default NotificationService
