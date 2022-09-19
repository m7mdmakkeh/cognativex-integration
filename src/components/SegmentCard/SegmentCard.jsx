import React from 'react';
import './SegmentCard.css'



const SegmentCard = () => {
    return (
        <div className="segment-card-container">
            <i className='segment-card-container__status'></i>
            <div className="segment-card-container__title">
                Title of segment 
            </div>
            <div className="segment-card-container__dimensions">
                12 dimensions
            </div>
            <div className="segment-card-container__users">
                Users <span>723</span>
            </div>
        </div>
    );
}

export default SegmentCard;
