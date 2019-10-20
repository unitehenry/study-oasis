import React, { useState } from 'react';
import './AskQuestion.css';

const Choice = ({ choice, removeChoice }) => {
    return (
        <div className="option">
            <p>{choice}</p>
            <span onClick={removeChoice}>X</span>
        </div>
    )
}

const AskQuestion = ({ userSession }) => {
    const [question, setQuestion] = useState('');
    const [choices, setChoices] = useState([]);

    const addChoice = (e) => {
        if (e.keyCode === 13) {
            setChoices([...choices, e.target.value]);
            e.target.value = '';
        }
    }

    const removeChoice = (i) => {
        setChoices(choices.filter((c, index) => index !== i));
    }

    const submitQuestion = () => {
        userSession.getFile('/questions.json', { decrypt: false })
            .then(contents => {
                const questions = JSON.parse(contents);
                question && questions && questions.push({ question, choices });

                questions ? userSession.putFile('/questions.json', JSON.stringify(questions), { encrypt: false }) : userSession.putFile('/questions.json', JSON.stringify([{ question, choices }]), { encrypt: false })

                // API Call here
                
                setQuestion('');
                setChoices([]);

                console.log({ question, choices });
            })
    }

    // const getFile = () => {
    //     userSession.getFile('/questions.json', { decrypt: false })
    //         .then(contents => {
    //             console.log(JSON.parse(contents))
    //         })
    // }

    return (
        <div className="AskQuestion">
            <div className="question-card">
                <input type="text" placeholder="ask a question" value={question} onChange={e => setQuestion(e.target.value)} />
                <div className="choice">
                    <input type="text" placeholder="add a choice" onKeyUp={e => addChoice(e)} />
                </div>
                <div className="options">
                    {choices.map((choice, i) => <Choice key={`${i}${choice}`} choice={choice} removeChoice={() => removeChoice(i)} />)}
                </div>
                <button className="submit-btn" onClick={submitQuestion}>submit</button>
                <p className="footnote">
                    <i>just submit if non multiple-choice question</i>
                    {/* <button onClick={getFile}>get file</button> */}
                </p>
            </div>
        </div>
    )
}

export default AskQuestion;