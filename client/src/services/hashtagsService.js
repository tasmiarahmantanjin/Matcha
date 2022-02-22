import axios from 'axios'
const baseUrl = 'http://localhost:5000'



const getHashtags = (reqObject) => {
  //console.log(reqObject);
	//const request = axios.post(`${baseUrl}/notifications/getNotifications`, reqObject)
   const request = axios.get(`${baseUrl}/hashtags/getHashtags`,
    reqObject, {
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    "Authorization": `Bearer ${localStorage.getItem('token') || ''}`
    }
  })
	return request.then(response => response.data)
}

const exp = { getHashtags }
export default exp