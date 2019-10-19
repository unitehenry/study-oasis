import React from 'react';
import './AskQuestion.css';

const AskQuestion = () => {
    return (
        <div className="AskQuestion">
            <div className="question-card">
                <h3>Ask a Question</h3>
                <div className="choice">
                    <input type="text" placeholder="add a choice" />
                </div>
                <div className="options">
                    <div className="option">
                        <p>option</p>
                        <span>X</span>
                    </div>
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