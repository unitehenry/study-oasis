import React, { useState, useEffect } from 'react';
import './Dashboard.css';

// Components
import SwipeWindow from './SwipeWindow';
import AskQuestion from './AskQuestion';
import Answers from './Answers';
import Curate from './Curate';

const Dashpane = ({ handleSignOut, setCurrentView, answers }) => {

    return (
        <div className="Dashpane">
            {/* <div className="option disable-option"> */}
            {/* <p>My Points: {1000}</p> */}
            {/* </div> */}
            <div className="option" onClick={() => setCurrentView('askquestion')}>
                <p>ask a question</p>
            </div>
            <div className="option" onClick={() => setCurrentView('answers')}>
                <p>answers</p>
                {answers && <span>{answers}</span>}
            </div>
            <div className="option" onClick={() => setCurrentView('questions')}>
                <p>questions</p>
            </div>
            <div className="option" onClick={() => setCurrentView('curate')}>
                <p>curate results</p>
            </div>
            <div className="option" onClick={(e) => handleSignOut(e)}>
                <p>sign out</p>
            </div>
        </div>
    )
}

const Dashboard = ({ userSession, handleSignOut }) => {
    // const blockstackId = 'unitehenry.id.blockstack'; // answer user id
    console.log(userSession.loadUserData().username, 'signed in');

    const [currentView, setCurrentView] = useState('questions');
    const [answers, setAnswers] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);
    const [curation, setCuration] = useState('None');

    useEffect(() => {
        if (initialLoad) {
            // get initial count of answers (setAnswers)
                // set initial load to false
        }
    })

    return (
        <div className="Dashboard">
            <div className="container">
                <Dashpane handleSignOut={handleSignOut} setCurrentView={(view) => setCurrentView(view)} answers={answers && answers.length} />
                {currentView === 'askquestion' && <AskQuestion userSession={userSession} />}
                {currentView === 'answers' && <Answers userSession={userSession} />}
                {currentView === 'questions' && <SwipeWindow userSession={userSession} curation={curation} />}
                {currentView === 'curate' && <Curate curation={curation} setCuration={(c) => setCuration(c)}/>}
                <div className="Menu">
                    <span className="hamburger"></span>
                    <span className="hamburger"></span>
                    <span className="hamburger"></span>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;