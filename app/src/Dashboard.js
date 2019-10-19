import React from 'react';
import './Dashboard.css';

// Components
import Navbar from './Navbar';
import SwipeWindow from './SwipeWindow';

const Dashpane = () => {
    return (
        <div className="Dashpane">
            <div className="option">
                <p>tutors</p>
            </div>
            <div className="option">
                <p>buddies</p>
            </div>
            <div className="option">
                <p>questions</p>
            </div>
        </div>
    )
}

const Dashboard = () => {
    return (
        <div className="Dashboard">
            {/* <Navbar /> */}
            <div className="container">
                <Dashpane />
                <SwipeWindow />
            </div>
        </div>
    )
}

export default Dashboard;