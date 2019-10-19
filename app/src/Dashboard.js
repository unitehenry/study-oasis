import React from 'react';
import './Dashboard.css';

// Components
import SwipeWindow from './SwipeWindow';
import AskQuestion from './AskQuestion';

const Dashpane = ({ handleSignOut }) => {
    return (
        <div className="Dashpane">
            <div className="option">
                <p>ask a question</p>
            </div>
            <div className="option">
                <p>answers</p>
            </div>
            <div className="option">
                <p>questions</p>
            </div>
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
                <AskQuestion />
                {/* <SwipeWindow /> */}
            </div>
        </div>
    )
}

export default Dashboard;