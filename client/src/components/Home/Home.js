import React from "react";

// import useSelector to connect the store with the component
import { useSelector } from "react-redux";
import MatchesPage from "../MatchesPage/MatchesPage";
import Navbar from "../Navbar/Navbar";
import Nav from "../Navbar/Nav";

const Home = () => {
  const user = useSelector((state) => state.authReducer.user);

  return (
    <div id="chat-container">
      <div id="chat-wrap">
        <Navbar />
      </div>

      {/* <MatchesPage /> */}
      {/* <Nav /> */}
    </div>
  );
};

export default Home;
