import React from 'react';
import './SignIn.css';

const SignIn = () => {
    return (
        <div className="SignIn">
            <h1 className="header-logo">Study Oasis</h1>
            <form>
                <div className="field">
                    <label>Username</label>
                    <input type="text" />
                </div>

                <div className="field">
                    <label>Password</label>
                    <input type="password" />
                </div>

                <div className="actions">
                    <button>Sign In</button>
                </div>
            </form>

        </div>
    )
}

export default SignIn;