import React, { useState } from 'react';
import './Dashboard.css';

// Components
import SwipeWindow from './SwipeWindow';
import AskQuestion from './AskQuestion';
import Answers from './Answers';

const Dashpane = ({ handleSignOut, setCurrentView }) => {
    return (
        <div className="Dashpane">
            <div className="option" onClick={() => setCurrentView('askquestion')}>
                <p>ask a question</p>
            </div>
            <div className="option" onClick={() => setCurrentView('answers')}>
                <p>answers</p>
            </div>
            <div className="option" onClick={() => setCurrentView('questions')}>
                <p>questions</p>
            </div>
            <div className="option" onClick={(e) => handleSignOut(e)}>
                <p>sign out</p>
            </div>
        </div>
    )
}

const Dashboard = ({ userSession, handleSignOut }) => {
    const [ currentView, setCurrentView ] = useState('questions');

    return (
        <div className="Dashboard">
            <div className="container">
                <Dashpane handleSignOut={handleSignOut} setCurrentView={(view) => setCurrentView(view)}/>
                { currentView === 'askquestion' && <AskQuestion userSession={userSession} />}
                { currentView === 'answers' && <Answers userSession={userSession} />}
                { currentView === 'questions' && <SwipeWindow userSession={userSession} /> }
            </div>
        </div>
    )
}

export default Dashboard;