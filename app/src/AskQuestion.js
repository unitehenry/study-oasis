import React, { useState } from 'react';
import './AskQuestion.css';

const Choice = ({ choice, removeChoice }) => {
    return (
        <div className="option">
            <p>{choice}</p>
            <span onClick={removeChoice}>X</span>
        </div>
    )
}

const AskQuestion = () => {
    // const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);

    const addChoice = (e) => {
        if (e.keyCode === 13) {
            setChoices([...choices, e.target.value]);
            e.target.value = '';
        }
    }

    const removeChoice = (i) => {
        setChoices(choices.filter((c, index) => index !== i));
    }

    return (
        <div className="AskQuestion">
            <div className="question-card">
                <input type="text" placeholder="ask a question" />
                <div className="choice">
                    <input type="text" placeholder="add a choice" onKeyUp={e => addChoice(e)} />
                </div>
                <div className="options">
                    { choices.map((choice, i) => <Choice key={`${i}${choice}`} choice={choice} removeChoice={() => removeChoice(i)}/> ) }
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