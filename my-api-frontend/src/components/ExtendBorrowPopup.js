import React from 'react';

const ExtendBorrowPopup = ({ onExtend, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Select Extension Duration</h3>
                <button onClick={() => onExtend(7)}>1 Week</button>
                <button onClick={() => onExtend(14)}>2 Weeks</button>
                <button onClick={() => onExtend(1)}>1 Month (30 days)</button>
                <button onClick={onClose}>Cancel</button>
            </div>
        </div>
    );
};

export default ExtendBorrowPopup;