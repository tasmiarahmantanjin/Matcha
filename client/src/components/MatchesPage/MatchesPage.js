import React, { useState } from 'react'

// import useSelector to connect the store with the component
import { useSelector} from 'react-redux'
import Navbar from '../Navbar/Navbar'
import Match from './Match'


import { useDispatch } from 'react-redux'
// import the login action
import { getMatches } from '../../store/actions/auth'

const MatchesPage = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.authReducer.user)
  const matches = useSelector(state => state.authReducer.matches)
  const [ageRangeMax, setAgeRangeMax] = useState(100)
  const [ageRangeMin, setAgeRangeMin] = useState(22)
  const [distance, setDistance] = useState(5)
  const gender = user.gender
  const sexual_orientation = user.sexual_orientation
  const interest = user.interest
  //const [matches, setMatches] = useState([])
  var matchList
  if (matches !== undefined) {
    matchList = matches.rows.map(match => 
              <Match key={match.first_name}
              person={match}
              user={user}
              />
            )
  }


  const submitForm = (e) => {
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
  }

    return (
        <div id='chat-container'>
            <div id='chat-wrap'>
                <Navbar />
            </div>
            <div>
            <form>
              <div className='input-field mb-1'>
              <label htmlFor="ageRangeMax">Age range maximum (between 18 and 120):</label>
                  <input
                      onChange={e => setAgeRangeMax(e.target.value)}
                      id="ageRangeMax" name="ageRangeMax" 
                      min="18" 
                      max="120"
                      value={ageRangeMax}
                      required='required'
                      type='range' />
                      <span>{ageRangeMax}</span>
              </div>
              <div className='input-field mb-1'>
              <label htmlFor="ageRangeMin">Age range minimum (between 18 and 120):</label>
                  <input
                      onChange={e => setAgeRangeMin(e.target.value)}
                      id="ageRangeMin" name="ageRangeMin" 
                      min="18" 
                      max="120"
                      value={ageRangeMin}
                      required='required'
                      type='range' />
                      <span>{ageRangeMin}</span>
              </div>
              <div className='input-field mb-1'>
              <label htmlFor="distance">Distance (between 1 and 100 km):</label>
                  <input
                      onChange={e => setDistance(e.target.value)}
                      id="distance" name="distance" 
                      min="1" 
                      max="100"
                      value={distance}
                      required='required'
                      type='range' />
                      <span>{distance}</span>
              </div>
              <input
                      id="gender" name="gender" 
                      value={gender}
                      type='hidden' />
                      <input
                      id="sexual_orientation" name="sexual_orientation" 
                      value={sexual_orientation}
                      type='hidden' />
            </form>
            <button className='btn-success' onClick={submitForm}>GET MATCHES</button>
            </div>
            <div id="match_list">{matchList}</div>
        </div>
        
    );
}

export default MatchesPage