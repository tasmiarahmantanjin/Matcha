import { w3cwebsocket as W3CWebSocket } from 'websocket'

const createWs = from => {
	const client = new W3CWebSocket('ws://127.0.0.1:3001')
	client.onerror = () => {
		console.log('Websocket connection error')
	}

	client.onopen = () => {
		console.log('Websocket client connected')
		client.send(JSON.stringify({
			type: 'connected',
			from
		}))
	}

	client.onclose = () => {
		console.log('Websocket connection closed')
		client.send(JSON.stringify({
			type: 'closed',
			from
		}))
	}
	return client
}

const sendNewNotification = (wsClient, notification) => {
	if (!wsClient.current) {
		console.log('Error: could not send notification, no websocket connection')
		return
	}

	if (wsClient.current.readyState > 1) {
		console.log('Error: could not send notification, websocket state', wsClient.current.readyState)
		return
	}

	wsClient.current.send(JSON.stringify({
		...notification,
		type: 'notification'
	}))

}

export default { createWs, sendNewNotification }