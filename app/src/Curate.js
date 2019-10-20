import React, { useState } from 'react';
import './Curate.css';

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

const CurateOption = ({ selected, option, setSubject }) => {
    const selectOption = () => {
        // get question
        setSubject(option)
    }

    return (
        <div className={selected ? 'curate-option selected' : 'curate-option'} onClick={selectOption}>
            <h2>{ option }</h2>
        </div>
    )
}

const Curate = ({ curation, setCuration }) => {
    const [ selectedSubject, setSelectedSubject ] = useState(curation);

    const selectSubject = (subject) => {
        setCuration(subject);
        setSelectedSubject(subject);
    }

    return (
        <div className="Curate">
            <h1>Curate Questions</h1>
            {
                subjectCurations.map((subject, i) => <CurateOption key={`${i}${subject}`} selected={subject === selectedSubject} option={subject} setSubject={selectSubject}/>)
            }
        </div>
    )
}

export default Curate;