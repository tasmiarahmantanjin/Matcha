import React from 'react'

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

const Match = ({ person, user }) =>{
	return (
		<div>
			<h2>{person.first_name.charAt(0).toUpperCase() + person.first_name.slice(1)}</h2>
      <p>{person.gender} located {getDistanceFromLatLonInKm(person.longitude, person.latitude, user.longitude, user.latitude)} km away.</p>
      {person.interest.map(interest_sing => 
              <li> {interest_sing}
              </li>
      )}
		</div>
	) }

export default Match