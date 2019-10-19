import React from 'react';
import './SwipeWindow.css';

const Question = () => {
    return (
        <div className="Question">
            <p>If Log 4 (x) = 12, then log 2 (x / 4) is equal to?</p>
            {/* <ul> */}
                {/* <li> <input type="checkbox" /> 11</li> */}
                {/* <li> <input type="checkbox" /> 48</li> */}
                {/* <li> <input type="checkbox" /> -12</li> */}
                {/* <li> <input type="checkbox" /> 22</li> */}
            {/* </ul> */}

            <textarea rows={10} />

            <div className="actions">
                <button>skip</button>
                <button>submit</button>
            </div>
        </div>
    )
}

const SwipeWindow = () => {
    return (
        <div className="SwipeWindow">
            {/* <div className="swipe left-swipe"><p>left</p></div> */}

            <div className="swipe-card">
                <Question />
            </div>

            {/* <div className="swipe right-swipe"><p>right</p></div> */}
        </div>
    )
}

export default SwipeWindow;