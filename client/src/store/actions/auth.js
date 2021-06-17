import AuthService from '../../services/authService'

import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE, PASSWORD_RESET, GET_MATCHES } from '../types/index'

export const login = (params, history) => dispatch => {
    return AuthService.login(params)
        .then(data => {
            dispatch({ type: LOGIN, payload: data })
            history.push('/')
        })
        .catch(err => {

        })
}

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