import {
  LOGIN,
  REGISTER,
  LOGOUT,
  UPDATE_PROFILE,
  GET_MATCHES,
  GET_PROFILE,
  LIKE_USER,
  UNLIKE_USER,
  BLOCK_USER,
  REPORT_USER,
  GET_NOTIFICATIONS
} from '../types/index'

const initialState = {
  // to store the token & user into localStorage to solve the refresh problem
  user: JSON.parse(localStorage.getItem('user')) || {},
  token: localStorage.getItem('token') || '',
  isLoggedIn: localStorage.getItem('user') ? true : false

  //notifications: []
  // user: {},
  // token: '',
  // isLoggedIn: false
}

const authReducer = (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
    case LOGIN:
      // console.log(payload);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true
      }

    case GET_NOTIFICATIONS:
      // console.log(payload);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isLoggedIn: true
      }

    case REGISTER:
      return {
        ...state,
        user: payload.user,
        token: payload.token
      }

    case LOGOUT:
      return {
        ...state,
        user: {},
        token: '',
        isLoggedIn: false
      }

    case UPDATE_PROFILE:
      return {
        ...state,
        user: payload
      }

    // case PASSWORD_RESET:
    //     return {
    //         ...state,
    //         email:
    //     }

    case GET_MATCHES:
      // console.log(payload);
      return {
        ...state,
        matches: payload
      }
    case LIKE_USER:
      // console.log(payload);
      return {
        ...state,
        profile_id: payload
      }
    case UNLIKE_USER:
      // console.log(payload);
      return {
        ...state,
        profile_id: payload
      }
    case GET_PROFILE:
      // console.log(payload);
      return {
        ...state,
        profile: payload
      }
    case BLOCK_USER:
      // console.log(payload);
      return {
        ...state,
        profile_id: payload
      }
    case REPORT_USER:
      // console.log(payload);
      return {
        ...state,
        profile_id: payload
      }

    default: {
      return state
    }
  }
}

export default authReducer
