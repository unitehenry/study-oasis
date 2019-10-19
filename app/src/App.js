import React, { Component } from 'react';
import './App.css';

import { UserSession } from 'blockstack';
import { appConfig } from './assets/constants'

// Components
import SignIn from './SignIn';
import Dashboard from './Dashboard';

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
      <div>
          {!userSession.isUserSignedIn() ? <SignIn userSession={userSession} handleSignIn={this.handleSignIn} /> : <Dashboard userSession={userSession} handleSignOut={(e) => this.handleSignOut(e)} />}
      </div>
    );
  }

  componentDidMount() {
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