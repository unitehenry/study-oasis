import React, { Component } from 'react';

import Profile from './Profile.js';
import Signin from './Signin.js';
import { UserSession } from 'blockstack';
import { appConfig } from './assets/constants'


import './App.css';

// Components
// import SignIn from './Signin';
import Dashboard from './Dashboard';
import SignIn from './Signin';

const userSession = new UserSession({ appConfig })


export default class App extends Component {

  handleSignIn(e) {
    e.preventDefault();
    userSession.redirectToSignIn();
  }

  handleSignOut(e) {
    e.preventDefault();
    userSession.signUserOut(window.location.origin);
  }

  render() {
    return (
      
      <div className="site-wrapper">
        <Dashboard />
        {/* <div className="site-wrapper-inner"> */}
          {/* { !userSession.isUserSignedIn() ? <Signin userSession={userSession} handleSignIn={ this.handleSignIn } />: <Profile userSession={userSession} handleSignOut={ this.handleSignOut } />} */}
        {/* </div> */}
      {/* </div> */}
      </div>
    );
  }

  componentWillMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        //if (!userData.username) {
        //  throw new Error('This app requires a username.')
        //}
        window.location = window.location.origin;
      });
    }
  }

}