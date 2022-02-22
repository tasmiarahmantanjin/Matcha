import React, { useState } from 'react'
import registerImage from '../../assets/images/register.svg'
import { Link } from 'react-router-dom'

// import store related stuff 
import { useDispatch } from 'react-redux'
// import the register action
import { register } from '../../store/actions/auth'

import './Auth.scss'

const Register = ({ history }) => {

    const dispatch = useDispatch()

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [user_name, setUser_name] = useState('')
    const [email, setEmail] = useState('')
    const [gender, setGender] = useState('male')
    const [password, setPassword] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        dispatch(register({ first_name, last_name, user_name, email, gender, password }, history))
    }

    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>
                    <div id='image-section'>
                        <img src={registerImage} alt='Register' />
                    </div>

                    <div id='form-section'>
                        <h2>Create an account</h2>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setFirst_name(e.target.value)}
                                    value={first_name}
                                    required='required'
                                    type='text'
                                    placeholder='First name' />
                            </div>

                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setLast_name(e.target.value)}
                                    value={last_name}
                                    required='required'
                                    type='text'
                                    placeholder='Last name' />
                            </div>

                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setUser_name(e.target.value)}
                                    value={user_name}
                                    required='required'
                                    type='text'
                                    placeholder='User name' />
                            </div>

                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    required='required'
                                    type='text'
                                    placeholder='Email' />
                            </div>

                            <div className='input-field mb-1'>
                                <select
                                    onChange={e => setGender(e.target.value)}
                                    value={gender}
                                    required='required'
                                >
                                    <option value='male'>Male</option>
                                    <option value='female'>Female</option>
                                    <option value='others'>Others</option>
                                </select>
                            </div>

                            <div className='input-field mb-2'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Password'
                                    autoComplete="off" />
                            </div>

                            <button>REGISTER</button>
                        </form>

                        <p>Already have an account? <Link to='/login'>Login</Link></p>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register