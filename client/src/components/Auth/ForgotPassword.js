import React, { useState } from 'react'
import loginImage from "../../assets/images/forgotPassword.svg";
import { Link } from "react-router-dom";

import './Auth.scss';
import { useDispatch } from 'react-redux'
// import the forgotPassword action
import { forgotPassword } from '../../store/actions/auth'


const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState('')
  
  const dispatch = useDispatch()

const submitForm = (e) => {
  e.preventDefault()
  // dispatch the event action
  dispatch(forgotPassword({ email }, history))
}
    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>

                    <div id='image-section'>
                        <img src={loginImage} alt="Login"/>
                    </div>

                    <div id='form-section'>
                        <h2>Oops! Forgot Your Password?</h2>
                        <p>Please Enter your email address!</p>

                        <form onSubmit={submitForm}>
                            <div className='input-field mb-1'>
                                <input 
                                onChange={e => setEmail(e.target.value)}
                                required='required'
                                type="text" value={email} placeholder='Email'/>
                            </div>

                            <button>Send Login Link</button>
                            <p>Back to Login <Link to='./login'>Login</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ForgotPassword