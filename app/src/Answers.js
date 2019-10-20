import React, { useState, useEffect } from 'react';
import './Answers.css';

import axios from 'axios';

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
    const [answers, setAnswers] = useState([]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (initialLoad) {
            axios.post('https://studyoasis.herokuapp.com/question/list', { user: userSession.loadUserData().username })
                .then((res) => {
                    console.log(res.data.questions)

                    function getQuestion(i) {
                        if (i < res.data.questions.length) {
                            userSession.getFile(`/questions/${res.data.questions[i].question}.json`, { decrypt: true })
                                .then(contents => {
                                    contents && setAnswers([ ...answers, JSON.parse(contents) ]);
                                    getQuestion(i+1);
                                })
                        } else {
                            setInitialLoad(false);
                        }
                    }

                    getQuestion(0);

                })
                .catch(() => setInitialLoad(false))
            // userSession.getFile('/questions.json', { decrypt: true })
            //     .then(contents => {
            //         setAnswers(JSON.parse(contents));
            //         setInitialLoad(false);
            //     })
            //     .catch(() => setInitialLoad(false))
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
                    answers.map((answer, i) => <Answer key={`${i}${answer.answer}`} answer={answer} removeAnswer={() => removeAnswer(i)} />)
                    :
                    <p style={{ textAlign: 'center' }}>no one has answered your questions</p>
            }
        </div>
    )
}

export default Answers;