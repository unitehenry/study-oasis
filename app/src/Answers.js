import React from 'react';
import './Answers.css';

const Answers = () => {
    return (
        <div className="Answers">
            <div className="answer">
                <p><strong>This is you question</strong></p>
                <p>here is your answer</p>
                <div className="actions">
                    <button>correct</button>
                    <button>incorrect</button>
                </div>
            </div>
        </div>
    )
}

export default Answers;