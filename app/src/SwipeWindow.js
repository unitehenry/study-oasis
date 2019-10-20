import React, { useState, useEffect } from 'react';
import './SwipeWindow.css';

const Choices = ({ choices }) => {
    return (
        <ul>
            {choices.map((choice, i) => <li key={`${i}${choice}`}> <input type="checkbox" />{choice}</li>)}
        </ul>

    )
}

const Question = ({ question }) => {
    return (
        <div className="Question">
            <p>{question && question.question}</p>

            {question && (question.choices ? <Choices choices={question.choices} /> : <textarea rows={10} />)}

            {
                question && (
                    <div className="actions">
                        <button>skip</button>
                        <button>submit</button>
                    </div>
                )
            }

            { !question && <p style={{textAlign: 'center'}}>getting a question...</p> }
        </div>
    )
}

const SwipeWindow = ({ userSession }) => {
    const [questions, setQuestions] = useState([]);

    const blockstackId = 'unitehenry.id.blockstack';

    useEffect(() => {
        if (questions.length === 0) {
            userSession.getFile('/questions.json', { username: blockstackId, decrypt: false })
                .then(contents => setQuestions(JSON.parse(contents)))
        }
    })

    return (
        <div className="SwipeWindow">
            {/* <div className="swipe left-swipe"><p>left</p></div> */}

            <div className="swipe-card">
                <Question question={questions && questions[0]} />
            </div>

            {/* <div className="swipe right-swipe"><p>right</p></div> */}
        </div>
    )
}

export default SwipeWindow;