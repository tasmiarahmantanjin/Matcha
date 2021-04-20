import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../store/actions/auth'
import logoImage from "../../assets/images/logo_matcha.svg";
import Modal from '../Modal/Modal'
import { updateProfile } from '../../store/actions/auth'
import './Navbar.scss'

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    const [firstName, setFirstName] = useState(user.firstName)
    const [lastName, setLastName] = useState(user.lastName)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)

    // SexPref, Bio & interest update
    const [sexPref, setSexPref] = useState('')
    const [bio, setBio] = useState('')
    const [interest, setInterest] = useState('')

    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState('')

    const submitForm = (e) => {
        e.preventDefault()

        const form = { firstName, lastName, email, gender, sexPref, bio, interest, avatar }
        if (password.length > 0) form.password = password

        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }

        dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))
    }

    return (
        <div id='navbar' className='card-shadow'>
            <img width="100" height="80" src={logoImage} alt='Logo' />
            
            <div onClick={() => setShowProfileOptions(!showProfileOptions)} id='profile-menu'>
                <img width="40" height="40" src={user.avatar} alt='Avatar' />
                <p>{user.userName}</p>
                <FontAwesomeIcon icon='caret-down' className='fa-icon' />

                {
                    showProfileOptions &&
                    <div id='profile-options'>
                        <p onClick={() => setShowProfileModal(true)}>Update profile</p>
                        <p onClick={() => dispatch(logout())}>Logout</p>
                    </div>
                }

                {
                    showProfileModal &&
                    <Modal click={() => setShowProfileModal(false)}>

                        <Fragment key='header'>
                            <h3 className='m-0'>Update profile</h3>
                        </Fragment>

                        <Fragment key='body'>
                            <form>
                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setFirstName(e.target.value)}
                                        value={firstName}
                                        required='required'
                                        type='text'
                                        placeholder='First name' />
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setLastName(e.target.value)}
                                        value={lastName}
                                        required='required'
                                        type='text'
                                        placeholder='Last name' />
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

                                {/* //! TODO need to add all the needed field and connect the updated data with database */}

                                <p style={{color: "black"}}>Sexual Preference:</p>
                                <div className='input-field mb-1'>
                                    <select
                                        onChange={e => setSexPref(e.target.value)}
                                        // value={''}
                                        required='required'
                                    >
                                        <option value='man'>Man</option>
                                        <option value='women'>Women</option>
                                        <option value='both'>Both</option>
                                    </select>
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setBio(e.target.value)}
                                        // value={''}
                                        required='required'
                                        type='text'
                                        placeholder='Bio' />
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setInterest(e.target.value)}
                                        // value={''}
                                        required='required'
                                        type='text'
                                        placeholder='My Interests' />
                                </div>

                                {/* //! TODO end of newly added code */}

                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        required='required'
                                        type='password'
                                        placeholder='Password' />
                                </div>

                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setAvatar(e.target.files[0])}
                                        type='file' />
                                </div>
                            </form>
                        </Fragment>

                        <Fragment key='footer'>
                            <button className='btn-success' onClick={submitForm}>UPDATE</button>
                        </Fragment>

                    </Modal>
                }

            </div>
        </div>
    );
}

export default Navbar