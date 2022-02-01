import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect, useHistory } from 'react-router-dom'

import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import Chat from './components/Chat/Chat'
import Home from './components/Home/Home'
import MatchesPage from './components/MatchesPage/MatchesPage'
import ProfilePage from './components/ProfilePage/ProfilePage'
import ProtectedRoute from './components/Router/ProtectedRouter'
// Notifications
import NotificationService from './services/notificationService';
import NotificationList from './components/Notification/NotificationList'
// import socket from "./socket/index";


import './App.scss';

// font-awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faSmile, faImage, faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell)


const App = () => {

  // const [user, setUser] = useState({})
  // const [notifications, setNotifications] = useState(null)

  // var wsClient = useRef({})

  // const props = { user, setUser, notifications, setNotifications, wsClient }
  const history = useHistory()

  // useEffect(({user}) => {
  //   if(user.user_id) {
  //     NotificationService
  //       .getNotification(user.user_id)
  //       .then(res => {
  //         NotificationService.sendNotifications(res.data)
  //     })
  //     .catch(err => {
  //       console.log('Database Error', err)
  //     })
  //   }
  // }, [user.user_id, NotificationService.sendNotifications])

  // const handleNotificationClick = data => {
  //   NotificationService
  //     .markAsRead(data.id)
  //     .then(() => {
  //       if (data.notification.endsWith('viewed your profile') ||
  //         data.notification.endsWith('likes you'))
  //         history.push(`browse/?user_id=${data.from_id}`)
  //       else if (data.notification.startsWith('New message from') ||
  //         data.notification.startsWith('New match with') ||
  //         data.notification.startsWith('No longer match with'))
  //         history.push('/matches')
  //       NotificationService.setNotifications(notifications.map(n => n.id === data.id ? ({ ...n, read: 1 }) : n))
  //     })
  // }

  // const markAllNotificationsRead = () => {
  //   NotificationService
  //     .markAllAsRead(user.user_id)
  //     .then(() => {
  //       setNotifications(notifications.map(n => ({ ...n, read: 1 })))
  //     })
  //     .catch(e => {
  //       console.log('Database error', e)
  //     })
  // }


  return (
    <Router>
      <div className="App">
        <Switch>
          <ProtectedRoute exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/matches' component={MatchesPage} />
          <Route path='/register' component={Register} />
          <Route path='/forgotPassword' component={ForgotPassword} />
          <Route path='/resetPassword' component={ResetPassword} />

          <Route path="/notifications" render={({ user }) => user.user_id
            ? <NotificationList />
            : <Redirect to="/" />
          } />

          <Route path="/users/:id" render={({ match }) => (
            <ProfilePage
              id={match.params.id}
            />
          )} />
          <Route path="/conversations/:id" render={({ match }) => (
            <Chat
              id={match.params.id}
            />
          )} />
          <Route render={() => <h1>404 page not found</h1>} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
