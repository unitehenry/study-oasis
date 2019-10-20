import React, { useState, useEffect } from 'react';
import './Answers.css';

const Answer = ({ answer, removeAnswer }) => {

    const correctClick = () => {
        // remove from db
        removeAnswer();
    }

    const incorrectClick = () => {
        // remove from db
        removeAnswer();
    }

    return (
        <div className="Answer">
            <p><strong>{answer.question && answer.question}</strong></p>
            <p>{answer.answer && answer.answer}</p>
            <div className="actions">
                <button onClick={correctClick}>correct</button>
                <button onClick={incorrectClick}>incorrect</button>
            </div>
        </div>
    )
}

const Answers = ({ userSession }) => {
    const blockstackId = 'unitehenry.id.blockstack';
    const [answers, setAnswers] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            userSession.getFile('/questions.json', { username: blockstackId, decrypt: false })
                .then(contents => {
                    setAnswers(JSON.parse(contents));
                    setInitialLoad(false);
                })
        }
    })

    const removeAnswer = (i) => {
        setAnswers(answers.filter((a, index) => index !== i));
    }

    return (
        <div className="Answers">
            {
                answers ? 
                answers.map((answer, i) => <Answer key={`${i}${answer.answer}`} answer={answer} removeAnswer={() => removeAnswer(i)} />) 
                :
                <p style={{textAlign: 'center'}}>no one has answered your questions</p>
            }
        </div>
    )
}

export default Answers;