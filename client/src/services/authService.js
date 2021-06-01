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