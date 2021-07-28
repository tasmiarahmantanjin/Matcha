import React from 'react'
import './Match.scss'

// To-do: account for distance and age range filters, and for any ordering.
// getDistanceFromLatLonInKm(person.longitude, person.latitude, user.longitude, user.latitude)
const Match = ({ person, user, distance, age }) =>{
	return (
		<div className="match">
      <img width="150" height="150" src={`http://localhost:5000/uploads/user/${person.user_id}/${person.avatar}`} alt='match_avatar' />
			<h2>{person.first_name.charAt(0).toUpperCase() + person.first_name.slice(1)}</h2>
      <p>{age} years young</p>
      <p>{person.gender} located {distance} km away.</p>
      {person.interest.map(interest_sing => 
              <li key={interest_sing}> {interest_sing}
              </li>
      )}
      <div><a href={`http://localhost:3000/users/${person.user_id}`}>View profile</a></div>
		</div>
	) }

export default Match