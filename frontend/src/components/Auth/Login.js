import React, { useState } from 'react'
import loginImage from '../../assets/images/login.svg'
import { Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
// import the login action
import { login } from '../../store/actions/auth'

import './Auth.scss'

const Login = ({ history }) => {

    const dispatch = useDispatch()

    const [userName, setUserName] = useState('admin')
    const [password, setPassword] = useState('1234Aa')

    const submitForm = (e) => {
        e.preventDefault()

        // dispatch the event action
        dispatch(login({ userName, password }, history))
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={loginImage} alt='Login' />
                    </div>

                    <div id='form-section'>
                        <h2>MATCHA</h2>

                        <form onSubmit={submitForm}>

                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setUserName(e.target.value)}
                                    value={userName}
                                    required='required'
                                    type='text'
                                    placeholder='User Name' />
                            </div>

                            <div className='input-field mb-2'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Password' />
                            </div>

                            <button>LOGIN</button>
                        </form>

                        <p>Don't have an account? <Link to='/register'>Sign up</Link></p>
                        <p>Forgot Password? <Link to='/forgotPassword'>Reset</Link></p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login