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
    // const blockstackId = 'unitehenry.id.blockstack'; // answer user id
    const [answers, setAnswers] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            userSession.getFile('/questions.json', { decrypt: true })
                .then(contents => {
                    setAnswers(JSON.parse(contents));
                    setInitialLoad(false);
                })
                .catch(() => setInitialLoad(false))
        }
    })

    const removeAnswer = (i) => {
        const currentAnswers = answers.filter((a, index) => index !== i); 
        setAnswers(currentAnswers);

        (currentAnswers && currentAnswers.length) ? userSession.putFile('/questions.json', JSON.stringify(currentAnswers), { encrypt: false }) : userSession.deleteFile('/questions.json');
    }

    return (
        <div className="Answers">
            {
                answers ?
                    answers.map((answer, i) => <Answer key={`${i}${answer.answer}`} answer={answer} removeAnswer={() => removeAnswer(i)} />)
                    :
                    <p style={{ textAlign: 'center' }}>no one has answered your questions</p>
            }
        </div>
    )
}

export default Answers;