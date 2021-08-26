import React from 'react'

// import useSelector to connect the store with the component
import { useSelector} from 'react-redux'
import Navbar from '../Navbar/Navbar'

const Home = () => {

    const user = useSelector(state => state.authReducer.user)

    return (
        <div id='chat-container'>
            <div id='chat-wrap'>
                <Navbar />
            </div>
            <h1>Welcome to Match, {user.first_name}</h1>
        </div>
    );
}

export default Home