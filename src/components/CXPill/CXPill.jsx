import React from 'react';
import "./CXPill.css"

const CXPill = ({ background, text, close, className }) => {
    return (
        <span className={`cx-pill ${className??''}`}  style={background&&{background}}>
            <span>{text}</span>
            {
                close &&
                <i className="fa fa-times" onClick={close}></i>
            }
        </span>
    );
}

export default CXPill;