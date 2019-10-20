import React, { useState, useRef } from 'react';
import './AskQuestion.css';

// import axios from 'axios';

const subjectCurations = [
    'None',
    'English',
    'Fine Arts',
    'Applied Arts',
    'Science',
    'Foreign Language',
    'Math',
    'History',
]

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
    const [subject, setSubject] = useState('Science');

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
        // axios.post('http://localhost:8080/question', { blockstackId: userSession.loadUserData().username })
        //     .then((res) => {
        //         console.log(res.data)

        //         userSession.getFile('/questions.json', { decrypt: false })
        //             .then(contents => {
        //                 const questions = JSON.parse(contents);
        //                 question && questions && questions.push({ question, choices });

        //                 questions ? userSession.putFile('/questions.json', JSON.stringify(questions), { encrypt: false }) : userSession.putFile('/questions.json', JSON.stringify([{ question, choices }]), { encrypt: false })

        //                 setQuestion('');
        //                 setChoices([]);

        //                 console.log({ question, choices });
        //             })
        //     })

        userSession.getFile('/questions.json', { decrypt: true })
            .then(contents => {
                const questions = JSON.parse(contents);
                question && questions && questions.push({ question, choices, subject });

                questions ? userSession.putFile('/questions.json', JSON.stringify(questions), { encrypt: true }) : userSession.putFile('/questions.json', JSON.stringify([{ question, choices }]), { encrypt: true })

                setQuestion('');
                setChoices([]);

                console.log({ question, choices, subject });
            })
    }

    // const getFile = () => {
    //     userSession.getFile('/questions.json', { decrypt: false })
    //         .then(contents => {
    //             console.log(JSON.parse(contents))
    //         })
    // }

    const [ currentCuration, setCurrentCuration ] = useState();
    const curationOptions = useRef();
    const filterSelect = useRef();
    const showCurationOptions = () => {
        const display = curationOptions.current.style.display;
        filterSelect.current.style.display = 'none';
        curationOptions.current.style.display = (!display || display === 'none' ? 'block' : 'none');
    }

    const selectCurationOption = (curation) => {
        setCurrentCuration(curation);
        curationOptions.current.style.display = 'none';
        filterSelect.current.style.display = 'block';
    }

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
                <div className="filter">
                    <div className="filter-select" ref={filterSelect} onClick={showCurationOptions}>
                        <p>{currentCuration ? currentCuration : 'select a subject'}</p>
                    </div>
                    <div className="filter-options" ref={curationOptions}>
                        {subjectCurations.map((subject, i) => <p className="option" key={`${i}${subject}`} onClick={() => selectCurationOption(subject)}>{subject}</p>)}        
                    </div>
                </div>                
                {/* <select value={subject} onChange={e => setSubject(e.target.value)}> */}
                    {/* <option>English</option> */}
                    {/* <option>Fine Arts</option> */}
                    {/* <option>Applied Arts</option> */}
                    {/* <option>Science</option> */}
                    {/* <option>Foreign Language</option> */}
                    {/* <option>Math</option> */}
                    {/* <option>History</option> */}
                {/* </select> */}
                <button className="submit-btn" onClick={submitQuestion}>submit</button>
            </div>
            <p className="footnote">
                <i>just submit if non multiple-choice question</i>
                {/* <button onClick={getFile}>get file</button> */}
            </p>
        </div>
    )
}

export default AskQuestion;