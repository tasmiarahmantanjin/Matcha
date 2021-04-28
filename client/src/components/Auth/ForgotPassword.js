import React from 'react'
import loginImage from "../../assets/images/forgotPassword.svg";
import { Link } from "react-router-dom";

import './Auth.scss';

const Login = () => {
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

                        <form>
                            <div className='input-field mb-1'>
                                <input type="text" placeholder='Email'/>
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

export default Login