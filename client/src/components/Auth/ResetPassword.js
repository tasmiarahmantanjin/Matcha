import React, { useState } from 'react'
import loginImage from "../../assets/images/forgotPassword.svg";
import { Link } from "react-router-dom";

import './Auth.scss';
import { useDispatch } from 'react-redux'
// import the login action
import { resetPassword } from '../../store/actions/auth'


const ResetPassword = ({ history }) => {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  /*const query = new URLSearchParams(this.props.location.search);

  const token = query.get('token')
  console.log(token) //Token*/
  
  const dispatch = useDispatch()
  var query = window.location.search.substring(1);
  console.log(query)//"token=..."
  var pair = query.split("=");
  console.log(pair)
  if (pair[0] === 'token') {
    var token = pair[1]
  }

const submitForm = (e) => {
  e.preventDefault()
  // dispatch the event action
  dispatch(resetPassword({ password, confirmPassword, token }, history))
}
    return (
        <div id='auth-container'>
            <div id='auth-card'>
                <div className='card-shadow'>

                    <div id='image-section'>
                        <img src={loginImage} alt="Login"/>
                    </div>

                    <div id='form-section'>
                        <h2>Create new password</h2>
                        <p>Please enter a new password and confirm it.</p>
                        <form onSubmit={submitForm}>

                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    required='required'
                                    type='password'
                                    placeholder='Password' />
                            </div>
                            <div className='input-field mb-1'>
                                <input
                                    onChange={e => setConfirmPassword(e.target.value)}
                                    value={confirmPassword}
                                    required='required'
                                    type='password'
                                    placeholder='Confirm password' />  
                            </div>
                            <input type="hidden" value={token}/>
                            <button>Reset Password</button>
                            <p>Back to Login <Link to='./login'>Login</Link></p>
                        </form>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword