import React, { useState, useEffect } from 'react';
import './SwipeWindow.css';

import axios from 'axios';

const Choices = ({ choices, setChoice }) => {

    const selectChoice = (e, choice) => e.target.checked ? setChoice(choice) : setChoice('');

    return (
        <ul>
            {choices.map((choice, i) => <li key={`${i}${choice}`}> <input type="checkbox" onChange={e => selectChoice(e, choice)}/>{choice}</li>)}
        </ul>
    )
}

const Question = ({ question, userSession, questionUser, newQuestion, questionId }) => {
    const [ choice, setChoice ] = useState(false);
    const [ answer, setAnswer ] = useState('');

    const submitAnswer = () => {
        axios.post('https://studyoasis.herokuapp.com/question/answer', { question: questionId, user: questionUser, answer: userSession.loadUserData().username })
            .then((res) => {
                userSession.putFile(`/answers/${questionId}.json`, JSON.stringify({ question: questionId, answer: choice || answer }), { encrypt: false })
                    .then(() => newQuestion())
                    .catch(() => newQuestion())
            })
    }

    const skipQuestion = (e) => {
        newQuestion();
        e.target.blur();
    }

    return (
        <div className="Question">
            <p>{question && question.question}</p>

            {question && ( (question.choices && question.choices.length) ? <Choices choices={question.choices} setChoice={(choices) => setChoice(choices)}/> : <textarea value={answer} onChange={e => setAnswer(e.target.value)} rows={10} />)}
 
            {
                question && (
                    <div className="actions">
                        <button onClick={skipQuestion}>skip</button>
                        <button onClick={submitAnswer}>submit</button>
                    </div>
                )
            }

            {!question && <p style={{ textAlign: 'center' }}>looking for a question...</p>}
        </div>
    )
}

const SwipeWindow = ({ userSession, curation }) => {
    const [questionUser, setQuestionUser] = useState('');
    const [question, setQuestion] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true);
    const [ questionId, setQuestionId ] = useState('');

    function getQuestion() {
        setQuestion(false);
        axios.post('https://studyoasis.herokuapp.com/question/get', curation !== 'None' ? {subject: curation} : {})
            .then((res) => {
                if (res.data.question === '') {
                    return false      
                }
                userSession.getFile(`/questions/${res.data.question}.json`, { username: res.data.user, decrypt: false })
                    .then(contents => {
                        setQuestionUser(res.data.user);
                        setQuestionId(res.data.question);
                        if(contents) {
                            contents && setQuestion(JSON.parse(contents));
                            contents && setInitialLoad(false);
                        } else{
                            // setTimeout(() => getQuestion(), 5000);
                        }
                    })
                    .catch(() => setTimeout(() => getQuestion(), 5000))
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
                <Question question={question} questionUser={questionUser} userSession={userSession} newQuestion={() => getQuestion()} questionId={questionId}/>
            </div>

            {/* <div className="swipe right-swipe"><p>right</p></div> */}
        </div>
    )
}

export default SwipeWindow;