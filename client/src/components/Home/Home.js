import React from 'react'

// import useSelector to connect the store with the component
import { useSelector } from 'react-redux'
import MatchesPage from '../MatchesPage/MatchesPage'
import Navbar from '../Navbar/Navbar'

const Home = () => {
  const user = useSelector(state => state.authReducer.user)

  const container = {
    // marginTop: '10px',
    // borderRadius: '5px'
  }

  return (
    <div id="home-container">
      <div id="chat-wrap">
        <Navbar />
      </div>

      <div style={container}>
        <MatchesPage />
      </div>
    </div>
  )
}

export default Home
