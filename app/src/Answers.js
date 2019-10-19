import React, { useState } from 'react';
import './Answers.css';

const ANSWERS = [
    { question: 'question1', answer: 'hello' },
    { question: 'question2', answer: 'hello' },
    { question: 'question3', answer: 'hello' },
    { question: 'question4', answer: 'hello' },
    { question: 'question5', answer: 'hello' },
    { question: 'question6', answer: 'hello' }
]

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
            <p><strong>{answer.question}</strong></p>
            <p>{answer.answer}</p>
            <div className="actions">
                <button onClick={correctClick}>correct</button>
                <button onClick={incorrectClick}>incorrect</button>
            </div>
        </div>
    )
}

const Answers = () => {
    const [ answers, setAnswers ] = useState(ANSWERS);

    const removeAnswer = (i) => {
        setAnswers(answers.filter((a, index) => index !== i));
    }

    return (
        <div className="Answers">
           { answers && answers.map((answer, i) => <Answer key={`${i}${answer.answer}`} answer={answer} removeAnswer={() => removeAnswer(i)} />) }
        </div>
    )
}

export default Answers;