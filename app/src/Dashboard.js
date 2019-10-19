import React from 'react';
import './Dashboard.css';

// Components
import SwipeWindow from './SwipeWindow';

const Dashpane = ({ handleSignOut }) => {
    return (
        <div className="Dashpane">
            <div className="option">
                <p>tutors</p>
            </div>
            {/* <div className="option"> */}
                {/* <p>buddies</p> */}
            {/* </div> */}
            {/* <div className="option"> */}
                {/* <p>questions</p> */}
            {/* </div> */}
            <div className="option" onClick={(e) => handleSignOut(e)}>
                <p>sign out</p>
            </div>
        </div>
    )
}

const Dashboard = ({ userSession, handleSignOut }) => {
    return (
        <div className="Dashboard">
            <div className="container">
                <Dashpane handleSignOut={handleSignOut} />
                <SwipeWindow />
            </div>
        </div>
    )
}

export default Dashboard;