import axios from 'axios'
const baseUrl = 'http://localhost:5000'

const getUserLikes = (reqObject) => {
  //console.log('In matches service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}/getUserLikes`, reqObject)
	return request.then(response => response.data)
}

const exp = { getUserLikes }
export default exp