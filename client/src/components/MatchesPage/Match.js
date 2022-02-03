import React from "react";
import "./Match.scss";

// To-do: account for distance and age range filters, and for any ordering.
// getDistanceFromLatLonInKm(person.longitude, person.latitude, user.longitude, user.latitude)
const Match = ({ person, distance, age }) => {
  console.log("person: ", person);
  return (
    <div class="card">
      <img
        className="card__image"
        src={`http://localhost:5000/uploads/user/${person.user_id}/${person.avatar}`}
        alt="match_avatar"
      />
      <p className="card__name">
        {person?.first_name &&
          person.first_name.charAt(0).toUpperCase() +
            person.first_name.slice(1)}
      </p>
      {distance && <p className="card__text">{distance} km away.</p>}

      <div className="grid-container">
        {age && <p>{age} years old</p>}
        <p>{person.gender}</p>
      </div>

      <div className="grid-container-skills">
        <p>Looking for:</p>
        {person.sexual_orientation.map((orientation) => (
          <p key={orientation}>{orientation}</p>
        ))}
      </div>

      <div className="skills">
        <ul>
          {person.interest.map((interest_sing) => (
            <li key={interest_sing}> {interest_sing}</li>
          ))}
        </ul>
      </div>

      <a href={`http://localhost:3000/users/${person.user_id}`}>
        <button className="profile-view-button draw-border">
          View Profile
        </button>
      </a>
    </div>
  );
};

export default Match;
