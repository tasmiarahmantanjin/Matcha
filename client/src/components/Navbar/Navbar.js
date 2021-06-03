import React, { useState, Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../store/actions/auth'
import logoImage from "../../assets/images/logo_matcha.svg";
// Import for the user update
import Modal from '../Modal/Modal'
import { updateProfile } from '../../store/actions/auth'
import './Navbar.scss'

const Navbar = () => {

    const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    //console.log(user)

    const [showProfileOptions, setShowProfileOptions] = useState(false)
    const [showProfileModal, setShowProfileModal] = useState(false)

    const [first_name, setFirst_name] = useState(user.first_name)
    const [last_name, setLast_name] = useState(user.last_name)
    const [email, setEmail] = useState(user.email)
    const [gender, setGender] = useState(user.gender)

    // SexPref, Bio & interest update
    const [sex_orientation, setSex_orientation] = useState(user.sex_orientation)
    const [bio, setBio] = useState(user.bio)
    //const [interest, setInterest] = useState(user.interest)

    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(user.avatar)
    const [uploadAvatar, setUploadAvatar] = useState('')

    const [interest, setInterest] = React.useState(user.interest)

    //console.log(user)
    const submitForm = (e) => {
        e.preventDefault()

        const form = { first_name, last_name, email, gender, sex_orientation, bio, interest, uploadAvatar }
        console.log(interest)
        if (password.length > 0) form.password = password

        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }
        dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))
    }

    // Hashtag code

    const removeTag = (i) => {
      const newTags = [ ...interest ];
      newTags.splice(i, 1);
  
      // Call the defined function setTags which will replace tags with the new value.
      setInterest(newTags);
    }

    // Trims character from string; in this case hashtags from interests input
    function trim(str, ch) {
      var start = 0, 
          end = str.length;
      while(start < end && str[start] === ch)
          ++start;
      while(end > start && str[end - 1] === ch)
          --end;
      return (start > 0 || end < str.length) ? str.substring(start, end) : str;
  }
  
    // Puts interest into array on enter press, and resets the input field.
    const inputKeyDown = (e) => {
      if (e.target.value === "#") {
        return
      }
      const val = "#" + trim(e.target.value, '#')
      if (e.key === 'Enter' && val !== "#") {
        if (interest.find(interest => interest.toLowerCase() === val.toLowerCase())) {
          return;
        }
        setInterest([...interest, val]);
        var inputTag = document.getElementById('input-tag')
        inputTag.value = ''
      } else if (e.key === 'Backspace' && val === "#") {
        removeTag(interest.length - 1);
      }
      console.log(interest)
    }

    // End of hashtag code

    return (
        <div id='navbar' className='card-shadow'>
            <img width="100" height="80" src={logoImage} alt='Logo' />
            <div>Find match</div>

            <div onClick={() => setShowProfileOptions(!showProfileOptions)} id='profile-menu'>
                <img width="40" height="40" src={`http://localhost:5000/uploads/user/${user.user_id}/${avatar}`} alt='Avatar' />
                <p>{user.user_name}</p>
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

                                <div className='input-field mb-1'>
                                    <select
                                        onChange={e => setSex_orientation(e.target.value)}
                                        value={sex_orientation}
                                        required='required'
                                    >
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='others'>Others</option>
                                    </select>
                                </div>

                                <div className='input-field mb-1'>
                                    <input
                                        onChange={e => setBio(e.target.value)}
                                        value={bio}
                                        // required='required'
                                        type='text'
                                        placeholder='Bio'
                                        autoComplete="off" />
                                </div>

                                {/* //! TODO end of newly added code */}

                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setPassword(e.target.value)}
                                        value={password}
                                        required='required'
                                        type='password'
                                        placeholder='Password'
                                        autoComplete="current-password" />
                                </div>
                                <div className='input-field mb-2'>
                                <label htmlFor="country">Country:</label>
                                  <select name="country" id="country">
                                  <option>India</option>
                                    <option>China</option>
                                  </select>
                                </div>
                                <div className='input-field mb-2'>
                                  <label htmlFor="birthdate">Birthdate:</label>
                                  <input type="date" id="birthdate" name="birthdate"></input>
                                </div>
                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setUploadAvatar(e.target.files[0])}
                                        type='file' />
                                </div>
                                <div className="input-tag">
                        <ul className="input-tag__tags">
                          { interest.map((tag, i) => (
                            <li key={tag}>
                              {tag}
                              <button type="button" onClick={() => { removeTag(i); }}>+</button>
                            </li>
                          ))}
                          <li className="input-tag__tags__input"><input id="input-tag" type="text" onKeyDown={inputKeyDown} placeholder="Interests (write one at a time and press enter...)" /*ref={c => { tagInput = c; }}*/ /></li>
                        </ul>
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

/*
<div className='input-field mb-1'>
                                    <input
                                        onChange={e => setInterest(e.target.value)}
                                        value={interest}
                                        // required='required'
                                        type='text'
                                        placeholder='My Interests' />
                                </div>
*/