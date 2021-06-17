import React from 'react';
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import ForgotPassword from './components/Auth/ForgotPassword'
import ResetPassword from './components/Auth/ResetPassword'
import Chat from './components/Chat/Chat'
import MatchesPage from './components/MatchesPage/MatchesPage'


import ProtectedRoute from './components/Router/ProtectedRouter'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import './App.scss';

// font-awesome imports
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSmile, faImage } from '@fortawesome/free-regular-svg-icons'
import { faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell } from '@fortawesome/free-solid-svg-icons'
library.add(faSmile, faImage, faSpinner, faEllipsisV, faUserPlus, faSignOutAlt, faTrash, faCaretDown, faUpload, faTimes, faBell)


function App() {
  return (
      <Router>
          <div className="App">
              <Switch>
                  <ProtectedRoute exact path='/' component={Chat} />
                  <Route path='/login' component={Login} />
                  <Route path='/matches' component={MatchesPage} />
                  <Route path='/register' component={Register} />
                  <Route path='/forgotPassword' component={ForgotPassword} />
                  <Route path='/resetPassword' component={ResetPassword} />
                  <Route render={() => <h1>404 page not found</h1>} />
              </Switch>
          </div>
      </Router>
  );
}

export default App;
