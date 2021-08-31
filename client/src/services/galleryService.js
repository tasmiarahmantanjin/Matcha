import axios from 'axios'
const baseUrl = 'http://localhost:5000/users'

// get gallery for user
const getUserGallery = (reqObject) => {
  //console.log('In service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}/getGallery`, reqObject)
	return request.then(response => response.data)
}

// get gallery for profile; not in use, delete if not necessary.
const getProfileGallery = (reqObject) => {
  //console.log('In service.');
  //console.log(reqObject);
	const request = axios.post(`${baseUrl}`, reqObject)
	return request.then(response => response.data)
}

const deleteGalleryImage = (reqObject) => {
  const request = axios.post(`${baseUrl}/deleteGalleryImage`, reqObject)
	return request.then(response => response.data)
}

const makeAvatarImage = (reqObject) => {
  const request = axios.post(`${baseUrl}/makeAvatarImage`, reqObject)
	return request.then(response => response.data)
}

/*// get chapters
const getChapters = () => {
	const request = axios.get(`${baseUrl}/chapters`)
	return request.then(response => response.data)
}*/

const exp = { getUserGallery, deleteGalleryImage, makeAvatarImage }
export default exp