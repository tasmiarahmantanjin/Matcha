import axios from 'axios'
const baseUrl = 'http://localhost:5000/users/getGallery'

// get gallery by user
const getUserGallery = (reqObject) => {
  //console.log('In service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}`, reqObject)
	return request.then(response => response.data)
}

/*// get chapters
const getChapters = () => {
	const request = axios.get(`${baseUrl}/chapters`)
	return request.then(response => response.data)
}*/

const exp = { getUserGallery }
export default exp