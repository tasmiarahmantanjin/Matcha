import React from 'react'

import MatchesPage from '../MatchesPage/MatchesPage'
import Navbar from '../Navbar/Navbar'

const Home = () => {

  return (
    <div id="home-container">
      <div id="chat-wrap">
        <Navbar />
      </div>

      <div >
        <MatchesPage />
      </div>
    </div>
  )
}

export default Home
