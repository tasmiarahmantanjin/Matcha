import React, { useState, useEffect } from 'react'

// import useSelector to connect the store with the component
import { useSelector} from 'react-redux'
import Navbar from '../Navbar/Navbar'
//import Match from './Match'
import {withRouter} from 'react-router';

import { useDispatch } from 'react-redux'
// import the login action
import { getUser } from '../../store/actions/auth'
import { likeUser } from '../../store/actions/auth'
import { unlikeUser } from '../../store/actions/auth'

//import { getUserById } from '../../../../server/controllers/profileController';



const ProfilePage = ( { id } ) => {

  
  const [profile, setProfile] = useState()
  const [liked, setLiked] = useState()
  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  
  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile_id: id })
    };
    fetch('http://localhost:5000/profile', requestOptions)
        .then(response => response.json())
        .then(data =>{
          //console.log(data.rows) 
          setProfile(data.rows[0])
        });
    
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);

useEffect(() => {
  // POST request using fetch inside useEffect React hook
  const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile_id: id, user_id: user.user_id })
  };
  //console.log(requestOptions.body)
  fetch('http://localhost:5000/getLike', requestOptions)
      .then(response => response.json())
      .then(data =>{
        //console.log('Like data: ')
        //console.log(data.rows)
        if (data.rows[0]) {
          setLiked(data.rows[0])}
      });
  
// empty dependency array means this effect will only run once (like componentDidMount in classes)
}, []);
//console.log(`Data now in profile: `) 
//console.log(profile);

const likeButtonClickHandler = ( id ) => {
  //console.log(`Like button clicked. ${user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)} likes ${profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)}.`)
  const formData = new FormData()

  formData.append('profile_id', profile.user_id)
  formData.append('user_id', user.user_id)
  //console.log(`id in formData: ${formData.get('profile_id')}`)
  // dispatch the event action
  const values = Object.fromEntries(formData.entries());
  dispatch(likeUser(values))
  setLiked(1)
}

const unlikeButtonClickHandler = ( id ) => {
  //console.log(`Unlike button clicked. ${user.first_name.charAt(0).toUpperCase() + user.first_name.slice(1)} unliked ${profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)}.`)
  const formData = new FormData()

  formData.append('profile_id', profile.user_id)
  formData.append('user_id', user.user_id)
  //console.log(`id in formData: ${formData.get('profile_id')}`)
  // dispatch the event action
  const values = Object.fromEntries(formData.entries());
  dispatch(unlikeUser(values))
  setLiked()
}
const date1 = new Date(Date.UTC(2021, 4, 11, 0, 0, 0));
const date2 = new Date(Date.UTC(2021, 4, 12, 0, 0, 0));
const diffInMilliseconds = date2 - date1;
const diffInHours = diffInMilliseconds / 1000 / 60 / 60;
//console.log(diffInHours); // 24


var profileToShow
var online
var d = new Date();
let now = Math.floor(Date.now() / 1000)
console.log(`d: ${d}`)
//var now = d.getTime();
console.log(`now: ${now}`)
//var nowUtc = new Date(Date.UTC(now));
//now.toUTCString();
//console.log(`Date to UTC: ${now}`)

function timeDiffCalc(dateFuture, dateNow) {
  let diffInMilliSeconds = Math.abs(dateFuture - dateNow) / 1000;

  // calculate days
  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;
  //console.log('calculated days', days);

  // calculate hours
  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;
  //console.log('calculated hours', hours);

  // calculate minutes
  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;
  //console.log('minutes', minutes);

  let difference = '';
  if (days > 0) {
    difference += (days === 1) ? `${days} day, ` : `${days} days, `;
  }

  difference += (hours === 0 || hours === 1) ? `${hours} hour, ` : `${hours} hours, `;

  difference += (minutes === 0 || hours === 1) ? `${minutes} minutes` : `${minutes} minutes`; 

  return difference;
}

var dateLastSeen
  if (profile !== undefined) {
    console.log(profile)
    if (profile.online === 1){
      online = <div><p>User is currently online!</p></div>
    } else {
      dateLastSeen = new Date(profile.last_online)
      const timediff = (timeDiffCalc(dateLastSeen, d))
      online = <div><p>User last seen {timediff} ago.</p></div>
    }
    profileToShow = <div>
                <img width="150" height="150" src={`http://localhost:5000/uploads/user/${profile.user_id}/${profile.avatar}`} alt='profile_avatar' />
                {online}
          <h2>{profile.first_name.charAt(0).toUpperCase() + profile.first_name.slice(1)} {profile.last_name.charAt(0).toUpperCase() + profile.last_name.slice(1)}</h2>
          <p>{profile.gender} located {getDistanceFromLatLonInKm(profile.latitude, profile.longitude, user.latitude, user.longitude)} km away.</p>
          {profile.interest.map(interest_sing => 
                  <li key={interest_sing}> {interest_sing}
                  </li>
          )}
          <p>SEXUAL PREFERENCES</p>
          <p>Fame rating: {profile.fame}</p>
          <p>ONLINE STATUS</p>
          <p>LAST ONLINE</p>
          <p>BLOCK</p>
          <p>REPORT FAKE ACCOUNT</p>
          </div>
    
  }

  var likeButton
  if (liked === undefined) {
    likeButton = <div><button onClick={likeButtonClickHandler}>Like</button></div>
  }
  if (liked !== undefined) {
    likeButton = <div><button onClick={unlikeButtonClickHandler}>Unlike</button></div>
  }
  //console.log(`liked = ${liked}`)

  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    var rounded = Math.round(d * 10) / 10 // Distance rounded to one decimal
    return rounded;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }

  /*const submitForm = (e) => {
      e.preventDefault()
      const form = { ageRangeMax, ageRangeMin, distance, gender, sexual_orientation, interest }
      //console.log(form)

      const formData = new FormData()

      for (const key in form) {
          formData.append(key, form[key])
      }
      //console.log(`ageRangeMax in formData: ${formData.get('ageRangeMax')}`)
      // dispatch the event action
      const values = Object.fromEntries(formData.entries());
      dispatch(getMatches(values))
      //console.log(matches)
  }*/

    return (
        <div id='chat-container'>
            <div id='chat-wrap'>
                <Navbar />
            </div>
            {profileToShow}
            {likeButton}
        </div>
    );
}

export default withRouter(ProfilePage)