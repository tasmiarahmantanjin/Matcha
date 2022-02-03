import React from "react";
import "./Match.scss";

const profileCard = ({ person, distance, age }) => {
  console.log("person: ", person);
  return (
    <div className="card_container">
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
        {distance && <p className="grid-child-posts">{distance} km away.</p>}
        <div className="grid-container">
          {age && (
            <p className="grid-child-posts">
              {age} years old {person.gender}
            </p>
          )}

          <p className="grid-child-posts">{person.gender}</p>
        </div>
        <div className="skills">
          {person.sexual_orientation.map((orientation) => (
            <p key={orientation}>Looking for: {orientation}</p>
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
          <button className="btn draw-border">View Profile</button>
        </a>
      </div>
    </div>
  );
};

export default profileCard;
