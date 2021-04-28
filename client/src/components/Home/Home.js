import React from 'react'
import { useSelector} from 'react-redux'
// import useSocket from './hooks/socketConnect'
// import Navbar from './components/Navbar/Navbar'
// import { fetchChats } from '../../store/actions/chat'
// import FriendList from './components/FriendList/FriendList'
// import Messenger from './components/Messenger/Messenger'
// import './Chat.scss'

const Home = () => {

    // const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    return (
        <div id='chat-container'>
            <div id='chat-wrap'>
				<h1>Welcome Home: {user.first_name}</h1>
				<p>This means our redux store is working</p>
            </div>
        </div>
    );
}

export default Home