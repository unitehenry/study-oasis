import React, { useState } from 'react';
import './SwipeWindow.css';

const Choices = ({ choices }) => {
    return (
        <ul>
            { choices.map((choice, i) => <li key={`${i}${choice}`}> <input type="checkbox" />{choice}</li>) }
        </ul>

    )
}

const Question = () => {
    const [question, setQuestion] = useState({ question: 'If Log 4 (x) = 12, then log 2 (x / 4) is equal to?', choices: ['Hello', 4, 26] })

    return (
        <div className="Question">
            <p>{question.question}</p>

            { question.choices ? <Choices choices={question.choices} /> : <textarea rows={10} /> }

            <div className="actions">
                <button>skip</button>
                <button>submit</button>
            </div>
        </div>
    )
}

const SwipeWindow = () => {
    return (
        <div className="SwipeWindow">
            {/* <div className="swipe left-swipe"><p>left</p></div> */}

            <div className="swipe-card">
                <Question />
            </div>

            {/* <div className="swipe right-swipe"><p>right</p></div> */}
        </div>
    )
}

export default SwipeWindow;