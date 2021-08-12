import API from './api'

const AuthService = {
    login: (data) => {
        return API.post('/login', data)
            .then(({ data }) => {
                setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    register: (data) => {
        return API.post('/register', data)
            .then(({ data }) => {
                setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    logout: () => {
      //return API.get('/logout', data)
        API.defaults.headers['Authorization'] = ''
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    },

    updateProfile: (data) => {
      //console.log(`Data in updateProfile (authService): ${data}`)
        const headers = {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }
        return API.post('/users/update', data, headers)
            .then(({ data }) => {
                localStorage.setItem('user', JSON.stringify(data))
                return data
            })
            .catch(err => {
                console.log("Auth service err in updateProfile", err);
                throw err
            })
    },

    
    getMatches: (data) => {
      //console.log(`Data in getMatches (authService): ${data}`)
      //console.log(`Data in authService: ${data.get('ageRangeMax')}`) // Form data is still available here; header problem?
      /*const headers = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }*/
        return API.post('/matches/match', data/*, headers*/)
            .then(({ data }) => {
              //console.log(data)
                //setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    likeUser: (data) => {
      console.log(`Data in likeUser (authService): ${data}`)
      //console.log(`Data in authService: ${data.get('ageRangeMax')}`) // Form data is still available here; header problem?
      /*const headers = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }*/
        return API.post('/like', data/*, headers*/)
            .then(({ data }) => {
              //console.log(data)
                //setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    unlikeUser: (data) => {
      console.log(`Data in unlikeUser (authService): ${data}`)
      //console.log(`Data in authService: ${data.get('ageRangeMax')}`) // Form data is still available here; header problem?
      /*const headers = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }*/
        return API.post('/unlike', data/*, headers*/)
            .then(({ data }) => {
              //console.log(data)
                //setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    getProfile: (data) => {
      //console.log(`Data in getProfile (authService): ${data.id}`)
      //console.log(`Data in authService: ${data.get('ageRangeMax')}`) // Form data is still available here; header problem?
      /*const headers = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }*/
        return API.get(`/profile/${data.id}}`/*, data, headers*/)
            .then(({ data }) => {
              //console.log(data)
                //setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    blockUser: (data) => {
      console.log(`Data in blockUser (authService): ${data}`)
      //console.log(`Data in authService: ${data.get('ageRangeMax')}`) // Form data is still available here; header problem?
      /*const headers = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }*/
        return API.post('/block', data/*, headers*/)
            .then(({ data }) => {
              //console.log(data)
                //setHeadersAndStorage(data)
                localStorage.setItem('user', JSON.stringify(data))
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },

    reportUser: (data) => {
      console.log(`Data in reportUser (authService): ${data}`)
      //console.log(`Data in authService: ${data.get('ageRangeMax')}`) // Form data is still available here; header problem?
      /*const headers = {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }*/
        return API.post('/report', data/*, headers*/)
            .then(({ data }) => {
              //console.log(data)
                //setHeadersAndStorage(data)
                return data
            })
            .catch(err => {
                console.log("Auth service err", err);
                throw err
            })
    },
    

    forgotPassword: (data) => {
      return API.post('/forgotPassword', data)
          .then(({ data }) => {
              setHeadersAndStorage(data)
              return data
          })
          .catch(err => {
              console.log("Auth service (forgot password) err", err);
              throw err
          })
    },

    resetPassword: (data) => {
      return API.post('/resetPassword', data)
          .then(({ data }) => {
              setHeadersAndStorage(data)
              return data
          })
          .catch(err => {
              console.log("Auth service (reset password) err", err);
              throw err
          })
    },
}


const setHeadersAndStorage = ({ user, token }) => {
    API.defaults.headers['Authorization'] = `Bearer ${token}`
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
}

export default AuthService