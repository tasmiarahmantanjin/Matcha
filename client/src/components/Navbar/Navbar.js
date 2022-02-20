import React, { useState, Fragment, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { logout } from '../../store/actions/auth'
import logoImage from '../../assets/images/logo_matcha.svg'

import Modal from '../Modal/Modal'
import GalleryModal from '../GalleryModal/GalleryModal'
import { updateProfile } from '../../store/actions/auth'
import { uploadToGallery } from '../../store/actions/auth'
import galleryService from '../../services/galleryService'
import notificationsService from '../../services/notificationsService'

import { useHistory } from 'react-router-dom'

import chatService from '../../services/chatService'
import io from 'socket.io-client'

import './Navbar.scss'

const Navbar = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)

  const [showProfileOptions, setShowProfileOptions] = useState(false)
  const [showChatOptions, setShowChatOptions] = useState(false)
  const [showNotificationOptions, setShowNotificationOptions] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [uploadFile, setUploadFile] = useState('')
  const [galleryImages, setGalleryImages] = useState([])

  const user_id = user.user_id
  const [first_name, setFirst_name] = useState(user.first_name)
  const [last_name, setLast_name] = useState(user.last_name)
  const [email, setEmail] = useState(user.email)
  const [gender, setGender] = useState(user.gender)

  const [sexual_orientation, setSexual_orientation] = useState(user.sexual_orientation)
  const [bio, setBio] = useState(user.bio)

  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(user.avatar)
  const [uploadAvatar, setUploadAvatar] = useState(user.avatar)

  const [blockedUsers, setBlockedUsers] = useState(user.blocked_users)
  const [interest, setInterest] = useState(user.interest)
  const [birthdate, setBirthdate] = useState(formatDate(new Date(user.birthdate)))

  const [female, setFemale] = useState(false)
  const [male, setMale] = useState(false)
  const [other, setOther] = useState(false)
  const [interestArr, setInterestArr] = useState([])

  const [conversationsArr, setConversationsArr] = useState([])
  const [partnersIdArr, setPartnersIdArr] = useState([])
  const [partnersArr, setPartnersArr] = useState([])
  const [messageArr, setMessageArr] = useState()

  const [notifications, setNotifications] = useState([])

  const unblockUser = (unblockedUser) => {
    console.log('Unblock button clicked.');
    const newBlockedUsers = blockedUsers.filter(function(value, index, arr){ 
      return value !== unblockedUser;
    })
    console.log(newBlockedUsers);
    setBlockedUsers(newBlockedUsers)
    }

  /**
   * Chat code starts here
   */
  const [yourID, setYourID] = useState(user.user_id)

  const socketRef = useRef()

  const receivedMessage = message => {
    toast(`${message.sender_name.charAt(0).toUpperCase() + message.sender_name.slice(1)} says: ${message.message_text}`) // Alert user to new message!
  }
  const receivedLike = message => {
    toast(`Liked by ${message.sender_name.charAt(0).toUpperCase() + message.sender_name.slice(1)}`) // Alert user to new like! WORKS!
  }
  const receivedUnlike = message => {
    toast(`Un-liked by ${message.sender_name.charAt(0).toUpperCase() + message.sender_name.slice(1)}`) // Alert user to new unlike! WORKS!
  }
  const receivedMatch = match => {
    toast(`Match between ${match.sender_name.charAt(0).toUpperCase() + match.sender_name.slice(1)} and ${match.partner_name.charAt(0).toUpperCase() + match.partner_name.slice(1)}`) // Alert user to new unlike! WORKS!
  }

  useEffect(() => {
    socketRef.current = io.connect('localhost:3001/')
    socketRef.current.emit('create', user.user_id)
    socketRef.current.on('your id', id => {
      setYourID(id)
      console.log(`yourID: ${yourID}`)
    })

    socketRef.current.on('message', message => {
      console.log('Message.')
      console.log(message)
      receivedMessage(message)
    })

    socketRef.current.on('like', like => {
      console.log('Received like.')
      console.log(like)
      receivedLike(like)
    })

    socketRef.current.on('unlike', unlike => {
      console.log('Received unlike.')
      console.log(unlike)
      receivedUnlike(unlike)
    })

    socketRef.current.on('match', match => {
      console.log('Match!')
      console.log(match)
      receivedMatch(match)
    })
  }, [])

  useEffect(() => {
    const requestObject = {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
      },

      user: user
    }
    console.log('User: ')
    console.log(user)
    notificationsService.getNotifications(requestObject).then(initialNotifications => {
      console.log(initialNotifications)
      setNotifications(initialNotifications)
    })
  }, [user])

  useEffect(() => {
    const requestObject = {
      user: user
    }
    chatService.getConversationsArray(requestObject).then(initialConversations => {
      console.log(initialConversations)
      setConversationsArr(initialConversations.rows)
    })
  }, [user])

  useEffect(() => {
    const requestObject = {
      user: user
    }
    galleryService.getUserGallery(requestObject).then(initialImages => {
      console.log(initialImages)
      setGalleryImages(initialImages.rows)
    })
  }, [user])

  useEffect(() => {
    const requestObject = {
      user: user
    }
    chatService.getConversationsArray(requestObject).then(initialConversations => {
      console.log(initialConversations)
      setConversationsArr(initialConversations.rows)
    })
  }, [user])

  // For each conversation fetched, make an array of objects with conversation ID and partner ID.
  useEffect(() => {
    let conversationPartners = []
    for (let i = 0; i < conversationsArr.length; i++) {
      if (conversationsArr[i].user_one_id === user.user_id) {
        console.log('User is user one.')
        let currentConversation = {
          conversation: conversationsArr[i].id,
          partnerId: conversationsArr[i].user_two_id
        }
        conversationPartners.push(currentConversation)
      } else {
        console.log('User is user two.')
        let currentConversation = {
          conversation: conversationsArr[i].id,
          partnerId: conversationsArr[i].user_one_id
        }
        conversationPartners.push(currentConversation)
      }
    }
    setPartnersIdArr(conversationPartners)
  }, [conversationsArr, user])

  // For each conversation fetched, make an array of objects with partner name, partner ID, partner avatar, conversation ID.
  useEffect(() => {
    let partners = []
    for (let i = 0; i < partnersIdArr.length; i++) {
      const requestObject = {
        profile_id: partnersIdArr[i].partnerId
      }
      chatService.getPartnerProfile(requestObject).then(returnedPartner => {
        let currentPartner = {
          name:
            returnedPartner.rows[0].first_name.charAt(0).toUpperCase() +
            returnedPartner.rows[0].first_name.slice(1),
          partner_id: partnersIdArr[i].partnerId,
          avatar: returnedPartner.rows[0].avatar,
          conversation: partnersIdArr[i].conversation
        }
        console.log(currentPartner)
        partners.push(currentPartner)
      })
    }
    setPartnersArr(partners)
  }, [partnersIdArr, messageArr])

  // For each conversation fetched, make an array of recent messages.
  useEffect(() => {
    let recentMessages = []
    for (let i = 0; i < conversationsArr.length; i++) {
      const requestObject = {
        conversation_id: conversationsArr[i].id
      }
      chatService.getMessages(requestObject).then(returnedMessages => {
        if (returnedMessages.rows > 0) {
          let currentMessage = {
            conversation: conversationsArr[i].id,
            mostRecentMessage: returnedMessages.rows[returnedMessages.rows.length - 1].message_text,
            sender: returnedMessages.rows[returnedMessages.rows.length - 1].sender_id
          }
          recentMessages.push(currentMessage)
        }
      })
    }
    setMessageArr(recentMessages)
  }, [conversationsArr, user])

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
  }, [])

  useEffect(() => {
    if (interest) {
      setInterestArr(interest)
    }
  }, [])

  useEffect(() => {
    setAvatar(user.avatar)
  }, [user])

  useEffect(() => {
    setBlockedUsers(user.blocked_users)
  }, [user])
  

  useEffect(() => {
    if (!bio) {
      setBio('')
    }
  }, [user])

  let checked = []
  if (sexual_orientation !== null) {
    checked = sexual_orientation
  }

  function formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
  }

  const submitForm = e => {
    e.preventDefault()

    const form = {
      user_id,
      first_name,
      last_name,
      email,
      gender,
      sexual_orientation,
      bio,
      interest,
      birthdate,
      uploadAvatar,
      blockedUsers
    }
    if (password.length > 0) form.password = password

    const formData = new FormData()

    for (const key in form) {
      formData.append(key, form[key])
    }
    dispatch(updateProfile(formData)).then(() => setShowProfileModal(false))
  }

  const submitGalleryForm = e => {
    e.preventDefault()

    const form = { uploadFile }

    const formData = new FormData()

    for (const key in form) {
      formData.append(key, form[key])
    }

    dispatch(uploadToGallery(formData)).then(() => setShowGalleryModal(false))
  }

  // Hashtag code
  const removeTag = i => {
    const newTags = [...interestArr]
    newTags.splice(i, 1)

    // Call the defined function setTags which will replace tags with the new value.
    setInterestArr(newTags)
    setInterest(interestArr)
  }

  // Trims character from string; in this case hashtags from interests input
  function trim(str, ch) {
    var start = 0,
      end = str.length
    while (start < end && str[start] === ch) ++start
    while (end > start && str[end - 1] === ch) --end
    return start > 0 || end < str.length ? str.substring(start, end) : str
  }

  // Puts interest into array on enter press, and resets the input field.
  const inputKeyDown = e => {
    if (e.target.value === '#') {
      console.log('Hashtag detected')
      return
    }
    const val = '#' + trim(e.target.value, '#')
    console.log(`val = ${val}`)
    if (e.key === 'Enter' && val !== '#') {
      if (interest && interestArr.find(interest => interest.toLowerCase() === val.toLowerCase())) {
        console.log('Duplicate detected.')
        return
      }
      // console.log(val)
      setInterestArr([...interestArr, val])
      setInterest([...interestArr, val])
      // console.log('InterestArr:')
      // console.log(interestArr)
      // console.log('Interest:')
      // console.log(interest)
      var inputTag = document.getElementById('input-tag')
      inputTag.value = ''
    } else if (e.key === 'Backspace' && val === '#') {
      removeTag(interestArr.length - 1)
    }
    // console.log(interestArr)
    // console.log(interest)

    return
  }

  function getSexOrientation(checkmark) {
    if (checked && !checked.includes(checkmark)) {
      checked.push(checkmark)
      if (checkmark === 'female') {
        setFemale(true)
      }
      if (checkmark === 'male') {
        setMale(true)
      }
      if (checkmark === 'other') {
        setOther(true)
      }
    } else {
      for (var j = 0; j < checked.length; j++) {
        if (checked[j] === checkmark) {
          checked.splice(j, 1)
          j--
        }
        if (checkmark === 'female') {
          setFemale(false)
        }
        if (checkmark === 'male') {
          setMale(false)
        }
        if (checkmark === 'other') {
          setOther(false)
        }
      }
    }

    setSexual_orientation(checked)
  }

  const inArray = option => {
    if (sexual_orientation.includes(option)) {
      return true
    } else {
      return false
    }
  }

  const imageDeleteButtonHandler = img => {
    const requestObject = {
      user: user,
      image: img
    }
    galleryService.deleteGalleryImage(requestObject).then(returnedImages => {
      setGalleryImages(returnedImages.rows)
    })
  }

  const makeAvatarButtonHandler = img => {
    console.log('Image avatar button clicked.')
    console.log(`image path: ${img.path}`)

    const requestObject = {
      user: user,
      image: img
    }
    galleryService.makeAvatarImage(requestObject)
  }

  const galleryImagesToShow = galleryImages
    ? galleryImages.map((image, index) => {
        if (image.path === user.avatar) {
          return (
            <div key={`${image.path}_container`} className="gallery-image-container">
              <img
                width="25%"
                height="25%"
                src={`http://localhost:5000/uploads/user/${user.user_id}/${image.path}`}
                alt={`${image.path}`}
                key={`${image.path}`}
              />
              <button
                title="Delete image"
                className="delete-btn"
                key={`${image.path}_deleteButton`}
                onClick={() => imageDeleteButtonHandler(image)}
              >
                X
              </button>
            </div>
          )
        }
        return (
          <div key={`${image.path}_container`} className="gallery-image-container">
            <img
              width="25%"
              height="25%"
              src={`http://localhost:5000/uploads/user/${user.user_id}/${image.path}`}
              alt={`${image.path}`}
              key={`${image.path}`}
            />
            <button
              className="delete-btn"
              key={`${image.path}_deleteButton`}
              onClick={() => imageDeleteButtonHandler(image)}
            >
              X
            </button>
            <button
              title="Make avatar"
              className="avatar-btn"
              key={`${image.path}_avatarButton`}
              onClick={() => makeAvatarButtonHandler(image)}
            >
              *
            </button>
          </div>
        )
      })
    : null

  const conversationsToShow = partnersArr
    ? partnersArr.map((conversation, index) => {
        return (
          <a key={index} href={`http://localhost:3000/conversations/${conversation.conversation}`}>
            <div className="chat-items">
              <img
                className="avatar"
                width="40"
                height="40"
                src={`http://localhost:5000/uploads/user/${conversation.partner_id}/${conversation.avatar}`}
                alt="partner-avatar"
              />
              <p>{conversation.name}</p>
            </div>
          </a>
        )
      })
    : null

  const notificationsToShow = notifications
    ? notifications.map((notification, index) => {
        return (
          <div key={index}>
            <p>{notification.notification}</p>
          </div>
        )
      })
    : null

  const galleryImagePicker =
    galleryImages && galleryImages.length < 5 ? (
      <form>
        <div className="input-field mb-2">
          <label htmlFor="gallery-upload-input">Upload image to gallery:</label>
          <input
            onChange={e => setUploadFile(e.target.files[0])}
            type="file"
            name="gallery-upload-input"
            id="gallery-upload-input"
            accept="image/*"
          />
        </div>
      </form>
    ) : (
      <p className="delete-img-msg">5 images in gallery; delete at least one to make space!</p>
    )

  const avatarImagePicker =
    galleryImages.length < 5 ? (
      <div className="input-field mb-2">
        <label htmlFor="avatar">Profile picture:</label>
        <input
          onChange={e => setUploadAvatar(e.target.files[0])}
          type="file"
          id="avatar"
          name="avatar"
        />
      </div>
    ) : (
      <div className="input-field mb-2">
        <label htmlFor="avatar">Profile picture:</label>
        <p className="delete-img-msg" id="avatar" name="avatar">
          5 images in gallery; delete at least one to make space!
        </p>
      </div>
    )

  const logOut = history => {
    dispatch(logout())
    history.push('/login')
  }

  return (
    <div style={{display: 'flex', justifyContent: 'space-between',  background: '#42b983' }} className="card-shadow">
      <div>
        <div id="navbar" className="nav-child-1">
          <a className="nav-title" href="http://localhost:3000">
            <img width="100" height="80" src={logoImage} alt="Logo" />
          </a>
        </div>
      </div>

      <div>
        <div id="navbar" className="nav-child-2">
          <div onClick={() => setShowProfileOptions(!showProfileOptions)} id="profile-menu">
            <img
              className="avatar"
              width="40"
              height="40"
              src={`http://localhost:5000/uploads/user/${
                user.avatar === 'default.png' ? '/default.png' : `${user.user_id}/${avatar}`
              }`}
              alt="Avatar"
            />
            <p className="user-name">{user.user_name}</p>
            <FontAwesomeIcon icon="caret-down" className="fa-icon" />

            {showProfileOptions && (
              <div id="profile-options">
                <p onClick={() => setShowProfileModal(true)}>Update profile</p>
                <p onClick={() => setShowGalleryModal(true)}>Image gallery</p>
              </div>
            )}

            {showProfileModal && (
              <Modal click={() => setShowProfileModal(false)}>
                <Fragment key="header">
                  <h3 className="m-0">Update profile</h3>
                </Fragment>

                <Fragment key="body">
                  <form>
                    <div className="input-field mb-1">
                      <input
                        onChange={e => setFirst_name(e.target.value)}
                        value={first_name}
                        required="required"
                        type="text"
                        placeholder="First name"
                      />
                    </div>

                    <div className="input-field mb-1">
                      <input
                        onChange={e => setLast_name(e.target.value)}
                        value={last_name}
                        required="required"
                        type="text"
                        placeholder="Last name"
                      />
                    </div>

                    <div className="input-field mb-1">
                      <input
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        required="required"
                        type="text"
                        placeholder="Email"
                      />
                    </div>

                    <div className="input-field mb-1">
                      <h3>I am ...</h3>
                      <select
                        onChange={e => setGender(e.target.value)}
                        value={gender}
                        required="required"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="others">Other</option>
                      </select>
                    </div>

                    <div className="input-field mb-1">
                      <h3>Looking for...</h3>
                      <label htmlFor="sex-or-male">Male</label>
                      <input
                        type="checkbox"
                        value="male"
                        id="sex-or-male"
                        name="sex-or-male"
                        checked={male}
                        onChange={e => getSexOrientation(e.target.value)}
                      />
                      <label htmlFor="sex-or-female">Female</label>
                      <input
                        type="checkbox"
                        value="female"
                        id="sex-or-female"
                        name="sex-or-female"
                        checked={female}
                        onChange={e => getSexOrientation(e.target.value)}
                      />
                      <label htmlFor="sex-or-other">Other</label>
                      <input
                        type="checkbox"
                        value="other"
                        id="sex-or-other"
                        name="sex-or-other"
                        checked={other}
                        onChange={e => getSexOrientation(e.target.value)}
                      />
                    </div>

                    <div className="input-field mb-1">
                      <input
                        onChange={e => setBio(e.target.value)}
                        value={bio}
                        type="text"
                        placeholder="Bio"
                        autoComplete="off"
                      />
                    </div>

                    <div className="input-field mb-2">
                      <input
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        required="required"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </div>
                    <div className="input-field mb-2">
                      <label htmlFor="birthdate">Birthdate:</label>
                      <input
                        type="date"
                        id="birthdate"
                        onChange={e => setBirthdate(e.target.value)}
                        name="birthdate"
                        value={birthdate}
                      ></input>
                    </div>
                    {avatarImagePicker}
                    <div className="input-tag">
                      <ul className="input-tag__tags">
                        {interest &&
                          interest.map((tag, i) => (
                            <li key={tag}>
                              {tag}
                              <button
                                type="button"
                                onClick={() => {
                                  removeTag(i)
                                }}
                              >
                                +
                              </button>
                            </li>
                          ))}
                        <li className="input-tag__tags__input">
                          <input
                            id="input-tag"
                            type="text"
                            onKeyDown={inputKeyDown}
                            placeholder="Interests (write one at a time and press enter...)"
                          />
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h3>Blocked users</h3>
                      {blockedUsers &&
                        blockedUsers.map((blockedUser, i) => (
                          <li key={blockedUser}>{blockedUser} <button onClick={() => unblockUser(blockedUser)}>
                          Unblock user
                        </button></li>
                        ))}
                    </div>
                  </form>
                </Fragment>

                <Fragment key="footer">
                  <button className="btn-success" onClick={submitForm}>
                    UPDATE
                  </button>
                </Fragment>
              </Modal>
            )}
            {showGalleryModal && (
              <GalleryModal click={() => setShowGalleryModal(false)}>
                <img
                  width="40"
                  height="40"
                  src={`http://localhost:5000/uploads/user/${user.user_id}/${avatar}`}
                  alt="Avatar"
                />
                <Fragment key="gallery-header">
                  <h3 className="m-0">Image Gallery</h3>
                </Fragment>

                <Fragment key="gallery-images">
                  {galleryImagesToShow}
                  {galleryImagePicker}
                </Fragment>
                <Fragment key="gallery-footer">
                  <button className="btn-success" onClick={submitGalleryForm}>
                    Upload
                  </button>
                </Fragment>
              </GalleryModal>
            )}
          </div>
          <div onClick={() => setShowChatOptions(!showChatOptions)} id="chat-menu">
            <FontAwesomeIcon icon="comment-dots" className="fa-icon" size="2x" />
            {showChatOptions && <div id="chat-options">{conversationsToShow}</div>}
          </div>
          <div onClick={() => setShowNotificationOptions(!showNotificationOptions)} id="chat-menu">
            <FontAwesomeIcon icon="bell" className="fa-icon" size="2x" />
            {showNotificationOptions && <div id="notify-options">{notificationsToShow}</div>}
          </div>
          <ToastContainer />
          <div onClick={() => logOut(history)} id="chat-menu">
            {/* <p className="user-name">LogOut</p> */}
            <FontAwesomeIcon icon="sign-out-alt" className="fa-icon" size="2x" title="Log out" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
