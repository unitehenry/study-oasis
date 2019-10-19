import React from 'react';
import './Answers.css';

const Answer = () => {
    return (
        <div className="Answer">
            <p><strong>This is you question</strong></p>
            <p>here is your answer</p>
            <div className="actions">
                <button>correct</button>
                <button>incorrect</button>
            </div>
        </div>
    )
}

const Answers = () => {
    return (
        <div className="Answers">
            <Answer />
            <Answer />
            <Answer />
            <Answer />
            <Answer />
            <Answer />

        </div>
    )
}

export default Answers;