import React from 'react';

const ReturnConfirmationPopup = ({ onConfirm, onCancel }) => (
    <div className="popup-overlay">
        <div className="popup">
            <h3>Are you sure you want to return this item?</h3>
            <div className="popup-buttons">
                <button className="confirm-button" onClick={onConfirm}>
                    Yes
                </button>
                <button className="cancel-button" onClick={onCancel}>
                    No
                </button>
            </div>
        </div>
    </div>
);

export default ReturnConfirmationPopup;