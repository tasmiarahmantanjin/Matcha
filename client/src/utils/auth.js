let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`
}

const config = () => {
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : ''
		}
	}
}

export { setToken, config };