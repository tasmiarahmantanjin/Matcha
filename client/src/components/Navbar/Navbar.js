import React, { useState, Fragment, useEffect } from 'react'
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
    const [sexual_orientation, setSexual_orientation] = useState(user.sexual_orientation) // null
    const [bio, setBio] = useState(user.bio) // null
    //const [interest, setInterest] = useState(user.interest)

    const [password, setPassword] = useState('')
    const [avatar, setAvatar] = useState(user.avatar)
    const [uploadAvatar, setUploadAvatar] = useState(user.avatar)

    const [interest, setInterest] = useState(user.interest) // null
    const [birthdate, setBirthdate] = useState(formatDate(new Date(user.birthdate))) // null
    //console.log(`Birthdate: ${birthdate}`);
    //console.log(user)
    const [female, setFemale] = useState(false)
    const [male, setMale] = useState(false)
    const [other, setOther] = useState(false)
    const [interestArr, setInterestArr] = useState([])

    //const [female, setFemale] = useState(inArray('female'))
    //const [male, setMale] = useState(inArray('male'))
    //const [other, setOther] = useState(inArray('other'))

    

    useEffect(() => {
      if (sexual_orientation) {
        if (inArray('female')) {
          console.log('Female preference detected.')
          setFemale(true)
        }
        if (inArray('male')) {
          console.log('Male preference detected.')
          setMale(true)
        }
        if (inArray('other')) {
          console.log('Other preference detected.')
          setOther(true)
        }
        
      }
  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => {
    if (interest) {
     setInterestArr(interest)
    }
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
    
    //console.log(`female = ${female}`)
    //console.log(`male = ${male}`)
    //console.log(`other = ${other}`)


    //var male = inArray('male')
    //var female = inArray('female')
    //var other = inArray('other')
    var checked = []
    if (sexual_orientation !== null){
      checked = sexual_orientation;
    }
    //console.log(checked)


    function formatDate(date) {
      var d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
  
      if (month.length < 2)
          month = '0' + month;
      if (day.length < 2)
          day = '0' + day;
  
      return [year, month, day].join('-');
  }
    const submitForm = (e) => {
        e.preventDefault()

        const form = { first_name, last_name, email, gender, sexual_orientation, bio, interest, birthdate, uploadAvatar }
        //console.log(interest)
        if (password.length > 0) form.password = password

        const formData = new FormData()

        for (const key in form) {
            formData.append(key, form[key])
        }
        dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))
    }

    // Hashtag code

    const removeTag = (i) => {
      const newTags = [ ...interestArr ];
      newTags.splice(i, 1);
  
      // Call the defined function setTags which will replace tags with the new value.
      setInterestArr(newTags);
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
      console.log('Key pressed');
      if (e.target.value === "#") {
        return
      }
      const val = "#" + trim(e.target.value, '#')
      if (e.key === 'Enter' && val !== "#") {
        if (interestArr.find(interest => interest.toLowerCase() === val.toLowerCase())) {
          return;
        }
        setInterestArr([...interestArr, val]);
        setInterest(interestArr)
        var inputTag = document.getElementById('input-tag')
        inputTag.value = ''
      } else if (e.key === 'Backspace' && val === "#") {
        removeTag(interestArr.length - 1);
        setInterest(interestArr)
      }
      console.log(interestArr)
      console.log(interest)
      
      return 
    }

    // End of hashtag code


    // Checkbox code
    function getSexOrientation(checkmark) {
        if (checked && !checked.includes(checkmark)/* && (checkmark === 'male' || checkmark === 'female' || checkmark === 'other')*/) {
          checked.push(checkmark)
          if (checkmark === 'female'){
            setFemale(true)
          }
          if (checkmark === 'male'){
            setMale(true)
          }
          if (checkmark === 'other'){
            setOther(true)
          }
         } else {
            for (var j = 0; j < checked.length; j++){                            
              if ( checked[j] === checkmark) { 
                //console.log(`Removing ${checkmark} from array: ${checked}.`)
                  checked.splice(j, 1); 
                  j--; 
              }
              if (checkmark === 'female'){
                setFemale(false)
              }
              if (checkmark === 'male'){
                setMale(false)
              }
              if (checkmark === 'other'){
                setOther(false)
              }
          }
        }
        //if (checkmark === 'male' ) checked.push(checkmark) LOOP!
        //if (checkmark === 'other' ) checked.push(checkmark)
      //checked.push(checkmark)
      //console.log(checked)
      setSexual_orientation(checked)
  }

    function inArray(option) {
      if (sexual_orientation.includes(option)){
        return true
      }
      else {
        return false
      }
    }

    // End of checkbox code

    // Start of logout function
function logOut() {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_id: user.user_id })
};
//console.log(requestOptions.body)
fetch('http://localhost:5000/logout', requestOptions)
    /*.then(response =>{
      console.log('Response: ')
      console.log(response)}
    )*/
  dispatch(logout())
    }
    
    return (
        <div id='navbar' className='card-shadow'>
            <a  href="http://localhost:3000" ><img width="100" height="80" src={logoImage} alt='Logo'/></a>
            <div><a href="http://localhost:3000/matches">Find match</a></div>

            <div onClick={() => setShowProfileOptions(!showProfileOptions)} id='profile-menu'>
                <img width="40" height="40" src={`http://localhost:5000/uploads/user/${user.user_id}/${avatar}`} alt='Avatar' />
                <p>{user.user_name}</p>
                <FontAwesomeIcon icon='caret-down' className='fa-icon' />

                {
                    showProfileOptions &&
                    <div id='profile-options'>
                        <p onClick={() => setShowProfileModal(true)}>Update profile</p>
                        <p onClick={() => logOut()}>Logout</p>
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
                                <h3>I am ...</h3>
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
                                  <h3>Looking for...</h3>
                                    <label htmlFor="sex-or-male">Male</label><input type="checkbox" value="male" id="sex-or-male" name="sex-or-male" checked={male} onChange={e => getSexOrientation(e.target.value)}/>
                                    <label htmlFor="sex-or-female">Female</label><input type="checkbox" value="female" id="sex-or-female" name="sex-or-female" checked={female} onChange={e => getSexOrientation(e.target.value)}/>
                                    <label htmlFor="sex-or-other">Other</label><input type="checkbox" value="other" id="sex-or-other" name="sex-or-other" checked={other} onChange={e => getSexOrientation(e.target.value)}/>
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
                                  <label htmlFor="birthdate">Birthdate:</label>
                                  <input type="date" id="birthdate"
                                  onChange={e => setBirthdate(e.target.value)}
                                  name="birthdate"
                                  value={birthdate}>
                                  </input>
                                </div>
                                <div className='input-field mb-2'>
                                    <input
                                        onChange={e => setUploadAvatar(e.target.files[0])}
                                        type='file' />
                                </div>
                                <div className="input-tag">
                        <ul className="input-tag__tags">
                          { interest && interest.map((tag, i) => ( // ALWAYS DO THIS!
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
