import React, { Component } from 'react';
import './SignIn.css';

class Signin extends Component {

  render() {
    const { handleSignIn } = this.props;

    return (
      <div className="SignIn">
        <h1 className="header-logo">Study Oasis</h1>
        <button onClick={handleSignIn}>sign in with blockstack</button>
      </div>
    );
  }
}

export default Signin