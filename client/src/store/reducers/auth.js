import { LOGIN, REGISTER, LOGOUT, UPDATE_PROFILE, PASSWORD_RESET, GET_MATCHES } from '../types/index'

const initialState = {
    // to store the token & user into localStorage to solve the refresh problem
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    isLoggedIn: localStorage.getItem('user') ? true : false

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

        case REGISTER:
            return {
                ...state,
                user: payload.user,
                token: payload.token,
                isLoggedIn: true
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

  /*      case PASSWORD_RESET:
        return {
            ...state,
            email: 
        }*/

        
        case GET_MATCHES:
            // console.log(payload);
            return {
                ...state,
                matches: payload,
            }

        default: {
            return state
        }
    }

}

export default authReducer