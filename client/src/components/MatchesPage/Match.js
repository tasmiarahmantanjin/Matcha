import React from "react";
import "./Match.scss";
import ProfileCard from "./ProfileCard";

// To-do: account for distance and age range filters, and for any ordering.
// getDistanceFromLatLonInKm(person.longitude, person.latitude, user.longitude, user.latitude)
const Match = ({ person, distance, age }) => {
  console.log("person: ", person);
  return (
    <div className="container">
      <ProfileCard person={person} distance={distance} age={age} />
    </div>
  );
};

export default Match;
