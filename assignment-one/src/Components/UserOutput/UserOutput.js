import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {
    return (
        <div className="UserOutput">
            <p>{ props.p1 }</p>
            <p>{ props.username }</p>
        </div>
    )
}

export default userOutput;
