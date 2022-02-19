import React, { useState, useEffect, useRef } from 'react'

// import useSelector to connect the store with the component
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import { withRouter } from 'react-router'

import { useDispatch } from 'react-redux'

import { likeUser } from '../../store/actions/auth'
import { unlikeUser } from '../../store/actions/auth'
import { blockUser } from '../../store/actions/auth'
import { reportUser } from '../../store/actions/auth'
import galleryService from '../../services/galleryService'
import io from 'socket.io-client'

import './ProfilePage.scss'

const ProfilePage = ({ id }) => {
  const [profile, setProfile] = useState()
  const [liked, setLiked] = useState()
  const [likedUser, setLikedUser] = useState()
  const [uploadFile, setUploadFile] = useState('')
  const [galleryImages, setGalleryImages] = useState([])
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  const [yourID, setYourID] = useState(user.user_id)
  const socketRef = useRef()

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
      //receivedMessage(message);
    })

    socketRef.current.on('like', like => {
      console.log('Received like.')
      console.log(like)
      //receivedMessage(message);
    })
  }, [])

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: id })
    }
    fetch('http://localhost:5000/profile', requestOptions)
      .then(response => response.json())
      .then(data => {
        setProfile(data.rows[0])
      })
  }, [id])

  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: id, user_id: user.user_id })
    }
    fetch('http://localhost:5000/visitUser', requestOptions)
  }, [id])

  useEffect(() => {
    if (profile) {
      const requestObject = {
        user: profile
      }
      galleryService.getUserGallery(requestObject).then(initialImages => {
        setGalleryImages(initialImages.rows)
      })
    }
  }, [profile])

  // This fetch if user has liked the profile
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: id, user_id: user.user_id })
    }

    fetch('http://localhost:5000/getLike', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log('getLike HIT', data)
        // FIXME: May be i need to comment two lines below
        if (data.rows[0]) {
          setLiked(data.rows[0])
        }
      })
  }, [])

  // This checks if the profile has liked the user!
  useEffect(() => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: user.user_id, user_id: id })
    }

    fetch('http://localhost:5000/getLike', requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.rows[0]) {
          setLikedUser(data.rows[0])
        }
      })
  }, [])

  const likeButtonClickHandler = () => {
    console.log(
      `Like button clicked. ${
        user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
      } likes ${profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)}.`
    )

    const formData = new FormData()

    formData.append('first_name', user.user_id)
    formData.append('user_id', user.user_id)
    formData.append('profile_id', profile.user_id)

    const values = Object.fromEntries(formData.entries())
    dispatch(likeUser(values))
    setLiked(1)
    const messageObject = {
      sender_id: user.user_id,
      timestamp: new Date(),
      partner: profile.user_id
    }
    socketRef.current.emit('like', messageObject)
    if (likedUser !== undefined) {
      const messageObject = {
        sender_id: user.user_id,
        timestamp: new Date(),
        partner: profile.user_id
      }
      socketRef.current.emit('match', messageObject)
    }
  }

  const unlikeButtonClickHandler = () => {
    console.log(
      `Unlike button clicked. ${
        user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)
      } unliked ${profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)}.`
    )
    const formData = new FormData()

    formData.append('profile_id', profile.user_id)
    formData.append('user_id', user.user_id)
    formData.append('first_name', user.first_name)

    const values = Object.fromEntries(formData.entries())
    dispatch(unlikeUser(values))
    setLiked()
    const messageObject = {
      sender_id: user.user_id,
      timestamp: new Date(),
      partner: profile.user_id
    }
    socketRef.current.emit('unlike', messageObject)
  }

  const blockButtonClickHandler = () => {
    let confirm = window.confirm(
      'Are you sure you want to block ' +
        profile.first_name.charAt(0).toUpperCase() +
        profile.first_name.slice(1) +
        '? You will no longer be able to see them in your matches, nor receive messages from them. They will also be unable to see your profile.'
    )
    if (confirm === true) {
      console.log(
        `${user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)} blocked ${
          profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)
        }.`
      )
    }
    const formData = new FormData()

    formData.append('profile_id', profile.user_id)
    formData.append('user_id', user.user_id)
    const values = Object.fromEntries(formData.entries())
    dispatch(blockUser(values))
    // TODO: Redirect to home.
  }

  const reportButtonClickHandler = () => {
    var confirm = window.confirm(
      'Your are about to report ' +
        profile.first_name.charAt(0).toUpperCase() +
        profile.first_name.slice(1) +
        ' as a fake account. Do you wish to proceed?'
    )
    if (confirm === true) {
      console.log(
        `${user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)} reported ${
          profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)
        } as a fake account.`
      )
    }
    const formData = new FormData()

    formData.append('profile_id', profile.user_id)
    formData.append('user_id', user.user_id)
    const values = Object.fromEntries(formData.entries())
    dispatch(reportUser(values))
    // TODO: Redirect to home.
  }

  const uploadButtonClickHandler = () => {
    var confirm = window.confirm('Are you sure you want to upload this image?')
    if (confirm === true) {
      console.log(`Photo upload button clicked and confirmed.`)
    }
    //const formData = new FormData()

    //formData.append('user_id', user.user_id)
    //const values = Object.fromEntries(formData.entries())
    //dispatch(galleryUpload(values))
  }

  let likeButton
  if (profile && user.user_id === profile.user_id) {
    likeButton = null
  } else {
    if (liked === undefined) {
      likeButton = <button onClick={likeButtonClickHandler}>Like</button>
    }
    if (liked !== undefined) {
      likeButton = <button onClick={unlikeButtonClickHandler}>Unlike</button>
    }
  }

  let blockButton
  if (profile && user.user_id === profile.user_id) {
    blockButton = null
  } else {
    blockButton = (
      <button className="button" onClick={blockButtonClickHandler}>
        Block
      </button>
    )
  }

  let reportButton
  if (profile && user.user_id === profile.user_id) {
    reportButton = null
  } else {
    reportButton = (
      <button className="button" onClick={reportButtonClickHandler}>
        Report
      </button>
    )
  }

  let uploadButton
  if (profile && user.user_id === profile.user_id) {
    uploadButton = (
      <div>
        <button onClick={uploadButtonClickHandler}>Upload image to gallery</button>
      </div>
    )
  } else {
    uploadButton = null
  }

  var d = new Date()

  function timeDiffCalc(dateFuture, dateNow) {
    let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000

    // calculate days
    const days = Math.floor(diffInMilliSeconds / 86400)
    diffInMilliSeconds -= days * 86400

    // calculate hours
    const hours = Math.floor(diffInMilliSeconds / 3600) % 24
    diffInMilliSeconds -= hours * 3600

    const minutes = Math.floor(diffInMilliSeconds / 60) % 60
    diffInMilliSeconds -= minutes * 60
    let difference = ''
    if (days > 0) {
      difference += days === 1 ? `${days} day, ` : `${days} days, `
    }
    difference += hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `
    difference += minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`
    return difference
  }

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371 // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1) // deg2rad below
    var dLon = deg2rad(lon2 - lon1)
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    var d = R * c // Distance in km
    var rounded = Math.round(d * 10) / 10 // Distance rounded to one decimal
    return rounded
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180)
  }

  const galleryImagesToShow = galleryImages
    ? galleryImages.map((image, index) => {
        return (
          <img
            className="gallery-image"
            width="25%"
            height="25%"
            src={`http://localhost:5000/uploads/user/${profile.user_id}/${image.path}`}
            alt={`${image.path}`}
            key={`${image.path}`}
          />
        )
      })
    : null

  let profileToShow
  let online
  let dateLastSeen
  if (profile !== undefined) {
    console.log('profile', profile)
    if (profile.online === 1) {
      online = (
        <div>
          <p>
            {profile.first_name.charAt(0).toLowerCase() + profile.first_name.slice(1)} is currently
            online!
          </p>
          {/* // TODO: I can add a icon here with green light */}
        </div>
      )
    } else {
      dateLastSeen = new Date(profile.last_online)
      const timediff = timeDiffCalc(dateLastSeen, d)
      online = (
        <div>
          <p>User last seen {timediff} ago.</p>
        </div>
      )
    }
    profileToShow = (
      <div>
        <div className="card">
          <img
            className="card__image"
            width="150"
            height="150"
            src={`http://localhost:5000/uploads/user/${profile.user_id}/${profile.avatar}`}
            alt="profile_avatar"
          />
          {online}
          <h2>
            {profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)}{' '}
            {profile.last_name.charAt(0).toUpperCase() + profile.last_name.slice(1)}
          </h2>

          <p>
            {profile.gender} located{' '}
            {getDistanceFromLatLonInKm(
              profile.latitude,
              profile.longitude,
              user.latitude,
              user.longitude
            )}
            km away.
          </p>
          {profile.interest.map(interest_sing => (
            <li key={interest_sing}> {interest_sing}</li>
          ))}

          <div className="skills">
            <p>Looking for...</p>
            <ul>
              {profile.sexual_orientation.map(orientation => (
                <li key={orientation}>{orientation}</li>
              ))}
            </ul>
          </div>
          <p>Fame rating: {profile.fame}</p>
          <div class="gallery">
            <p>
              {profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)}
              's Images
            </p>
            <p>{galleryImagesToShow}</p>
            <p>{uploadButton}</p>
          </div>
          <div className="flex-container">
            {blockButton}
            {reportButton}
            {likeButton}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div id="chat-container">
      <div id="chat-wrap">
        <Navbar />
      </div>
      {profileToShow}
    </div>
  )
}

export default withRouter(ProfilePage)
