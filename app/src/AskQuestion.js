import React, { useState } from 'react';
import './AskQuestion.css';

const Choice = ({ choice }) => {
    return (
        <div key={`${i}${choice}`} className="option">
            <p>{choice}</p>
            <span>X</span>
        </div>
    )
}

const AskQuestion = () => {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);

    const addChoice = (e) => {
        if (e.keyCode === 13) {
            const newchoices = choices;
            newchoices.push(e.target.value);
            setChoices(newchoices);
            e.target.value = '';
        }
    }

    return (
        <div className="AskQuestion">
            <div className="question-card">
                <input type="text" placeholder="ask a question" />
                <div className="choice">
                    <input type="text" placeholder="add a choice" onKeyUp={e => addChoice(e)} />
                </div>
                <div className="options">
                    {
                        choices.map((choice, i) => <Choice choice={choice} />)
                    }
                </div>
                <button className="submit-btn">submit</button>
                <p className="footnote">
                    <i>just submit if non multiple-choice question</i>
                </p>
            </div>
        </div>
    )
}

export default AskQuestion;