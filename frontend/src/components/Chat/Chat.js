import React from 'react'
import { useSelector} from 'react-redux'
// import useSocket from './hooks/socketConnect'
import Navbar from '../Navbar/Navbar'
// import { fetchChats } from '../../store/actions/chat'
// import FriendList from './components/FriendList/FriendList'
// import Messenger from './components/Messenger/Messenger'
// import './Chat.scss'

const Chat = () => {

    // const dispatch = useDispatch()
    const user = useSelector(state => state.authReducer.user)

    return (
        <div id='chat-container'>
            <div id='chat-wrap'>
                <Navbar />
            </div>
        </div>
    );
}

export default Chat