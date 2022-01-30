import AuthService from '../../services/authService'

import { LOGIN, GET_NOTIFICATIONS, REGISTER, LOGOUT, UPDATE_PROFILE, PASSWORD_RESET, GET_MATCHES, LIKE_USER, UNLIKE_USER, BLOCK_USER, REPORT_USER, UPLOAD_TO_GALLERY } from '../types/index'

export const login = (params, history) => dispatch => {
    return AuthService.login(params)
        .then(data => {
            dispatch({ type: LOGIN, payload: data })
            history.push('/')
        })
        .catch(err => {

        })
}

/* export const getNotifications = (params, history) => dispatch => {
  return AuthService.getNotifications(params)
      .then(data => {
          dispatch({ type: GET_NOTIFICATIONS, payload: data })
          //history.push('/')
      })
      .catch(err => {

      })
} */

export const register = (params, history) => dispatch => {
    return AuthService.register(params)
    .then(data => {
        dispatch({ type: REGISTER, payload: data })
        //! Need to add a message like: An verification email has been sent to your email
        history.push('/login')
    })
    .catch(err => {
    })
}

export const logout = () => dispatch => {
    AuthService.logout()
    dispatch({ type: LOGOUT })
}

export const updateProfile = (params) => dispatch => {
    return AuthService.updateProfile(params)
        .then(data => {
            dispatch({ type: UPDATE_PROFILE, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const uploadToGallery = (params) => dispatch => {
  console.log('In actions/auth.uploadToGallery');
    return AuthService.uploadToGallery(params)
        .then(data => {
            dispatch({ type: UPLOAD_TO_GALLERY, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const getMatches = (params) => dispatch => {
  //console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
    return AuthService.getMatches(params)
        .then(data => {
            dispatch({ type: GET_MATCHES, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const likeUser = (params) => dispatch => {
  //console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
    return AuthService.likeUser(params)
        .then(data => {
            dispatch({ type: LIKE_USER, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const unlikeUser = (params) => dispatch => {
  //console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
    return AuthService.unlikeUser(params)
        .then(data => {
            dispatch({ type: UNLIKE_USER, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const getUser = (params) => dispatch => {
  //console.log(`Data in auth.js: ${params.get('id')}`)
    return AuthService.getProfile(params)
        .then(data => {
            dispatch({ type: GET_MATCHES, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const blockUser = (params) => dispatch => {
  //console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
    return AuthService.blockUser(params)
        .then(data => {
            dispatch({ type: BLOCK_USER, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const reportUser = (params) => dispatch => {
  //console.log(`Data in auth.js: ${params.get('ageRangeMax')}`) // Form data is still available here.
    return AuthService.reportUser(params)
        .then(data => {
            dispatch({ type: REPORT_USER, payload: data })
        })
        .catch(err => {
            throw err
        })
}

export const forgotPassword = (params, history) => dispatch => {
  return AuthService.forgotPassword(params)
  .then(data => {
      dispatch({ type: PASSWORD_RESET, payload: data })
      // Message saying email has been sent?
      // Redirect to home.
      history.push('/')
  })
  .catch(err => {
  })
}

export const resetPassword = (params, history) => dispatch => {
  return AuthService.resetPassword(params)
  .then(data => {
      dispatch({ type: PASSWORD_RESET, payload: data })
      // Redirect to home.
      history.push('/')
  })
  .catch(err => {
  })
}