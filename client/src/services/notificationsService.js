import axios from 'axios'
const baseUrl = 'http://localhost:5000'



const getNotifications = (reqObject) => {
  console.log('In notifications service.');
  //console.log(reqObject);
	//const request = axios.post(`${baseUrl}/notifications/getNotifications`, reqObject)
   const request = axios.post(`${baseUrl}/notifications/getNotifications`,
    reqObject, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
    }
  })
	return request.then(response => response.data)
}

const setNotificationsAsRead = (reqObject) => {
  //console.log('In notifications service.');
  //console.log(reqObject);
	//const request = axios.post(`${baseUrl}/notifications/getNotifications`, reqObject)
   const request = axios.post(`${baseUrl}/notifications/setNotificationsAsRead`,
    reqObject, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
    }
  })
	return request.then(response => response.data)
}

const exp = { getNotifications }
export default exp