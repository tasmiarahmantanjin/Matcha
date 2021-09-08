import axios from 'axios'
const baseUrl = 'http://localhost:5000'

// get conversation messages
const getConversation = (reqObject) => {
  //console.log('In service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}/conversation`, reqObject)
	return request.then(response => response.data)
}

const getPartnerProfile = (reqObject) => {
  //console.log('In service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}/profile`, reqObject)
	return request.then(response => response.data)
}

const getMessages = (reqObject) => {
  //console.log('In service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}/messages`, reqObject)
	return request.then(response => response.data)
}

const getConversationsArray = (reqObject) => {
  //console.log('In service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}/users/getConversationsArray`, reqObject)
	return request.then(response => response.data)
}

const exp = { getConversation, getPartnerProfile, getMessages, getConversationsArray }
export default exp