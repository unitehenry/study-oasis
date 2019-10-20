import React, { useState, useEffect } from 'react';
import './SwipeWindow.css';

import axios from 'axios';

const Choices = ({ choices }) => {
    return (
        <ul>
            {choices.map((choice, i) => <li key={`${i}${choice}`}> <input type="checkbox" />{choice}</li>)}
        </ul>

    )
}

const Question = ({ question, userSession, questionUser, newQuestion }) => {
    const submitAnswer = () => {
        axios.post('https://studyoasis.herokuapp.com/question/answer', { question: userSession.loadUserData().username, user: questionUser, answer: userSession.loadUserData().username })
            .then((res) => console.log(res.data))
    }

    const skipQuestion = (e) => {
        newQuestion();
        e.target.blur();
    }

    return (
        <div className="Question">
            <p>{question && question.question}</p>

            {question && (question.choices ? <Choices choices={question.choices} /> : <textarea rows={10} />)}
 
            {
                question && (
                    <div className="actions">
                        <button onClick={skipQuestion}>skip</button>
                        <button onClick={submitAnswer}>submit</button>
                    </div>
                )
            }

            {!question && <p style={{ textAlign: 'center' }}>getting a question...</p>}
        </div>
    )
}

const SwipeWindow = ({ userSession, curation }) => {
    const [questionUser, setQuestionUser] = useState('');
    const [question, setQuestion] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);

    function getQuestion() {
        axios.post('https://studyoasis.herokuapp.com/question/get', curation !== 'None' ? {subject: curation} : {})
            .then((res) => {
                userSession.getFile(`/questions/${res.data.question}.json`, { decrypt: false })
                    .then(contents => {
                        setQuestionUser(res.data.user);
                        if(contents) {
                            contents && setQuestion(JSON.parse(contents));
                            contents && setInitialLoad(false);
                        } else{
                            getQuestion();
                        }
                    })
                    .catch(() => getQuestion())
            })
    }

    useEffect(() => {
        if (initialLoad) {
            getQuestion();
        }
    })

    return (
        <div className="SwipeWindow">
            {/* <div className="swipe left-swipe"><p>left</p></div> */}

            <div className="swipe-card">
                <Question question={question} questionUser={questionUser} userSession={userSession} newQuestion={() => getQuestion()}/>
            </div>

            {/* <div className="swipe right-swipe"><p>right</p></div> */}
        </div>
    )
}

export default SwipeWindow;