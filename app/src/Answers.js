import React, { useState, useEffect } from 'react';
import './Answers.css';

import axios from 'axios';

const Answer = ({ /*answer, */ userSession, removeAnswer, ans }) => {

    const [answer, setAnswer] = useState({});

    const correctClick = () => {
        // remove from db
        removeAnswer();
    }

    const incorrectClick = () => {
        // remove from db
        removeAnswer();
    }

    useEffect(() => {
        userSession.getFile(`/answers/${ans.question}.json`, { username: ans.answerer, decrypt: false })
            .then(contents => {
                contents && setAnswer(JSON.parse(contents));
            }).catch(err => (err && console.log(err)))
    })

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
    const [answers, setAnswers] = useState([]);
    // const [ answerIteration, setAnswerIteration ] = useState(0);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            axios.post('https://studyoasis.herokuapp.com/question/list', { user: userSession.loadUserData().username })
            .then((res) => {
                setAnswers(res.data.questions);
            })
        }
    })

    const removeAnswer = (i) => {
        const currentAnswers = answers.filter((a, index) => index !== i);
        setAnswers(currentAnswers);
    }

    return (
        <div className="Answers">
            {
                answers ?
                    answers.map((answer, i) => <Answer userSession={userSession} key={`${i}${answer.question}`} ans={answer} removeAnswer={() => removeAnswer()}/>)
                    :
                    <p style={{ textAlign: 'center' }}>no one has answered your questions</p>
            }
        </div>
    )
}

export default Answers;