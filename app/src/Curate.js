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

const Curate = () => {
    const [ selectedSubject, setSelectedSubject ] = useState('None');

    return (
        <div className="Curate">
            <h1>Curate Questions</h1>
            {
                subjectCurations.map((subject, i) => <CurateOption key={`${i}${subject}`} selected={subject === selectedSubject} option={subject} setSubject={(subject) => setSelectedSubject(subject)}/>)
            }
        </div>
    )
}

export default Curate;