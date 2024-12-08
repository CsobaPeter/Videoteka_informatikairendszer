import React from "react";

const Modal = ({ isOpen, title, message, onClose, onAction, actionText, children, type, futurePrices }) => {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                {message && <p>{message}</p>}
                {children && <div className="modal-children">{children}</div>}
                <div className="modal-buttons">
                    {type === "add" ? (
                        <div>
                            <button onClick={onAction}>{actionText}</button>
                            <button onClick={onClose}>Close</button>
                        </div>
                    ) : (type === "update" ? (
                        <div>
                            <button onClick={onAction}>{actionText}</button>
                        </div>
                    ) : (type === "extend" ? (
                        <div>
                            <button onClick={() => onAction(1, futurePrices.oneWeek)}>
                                1 Week - New Price: ${futurePrices.oneWeek}
                            </button>
                            <button onClick={() => onAction(2, futurePrices.twoWeeks)}>
                                2 Weeks - New Price: ${futurePrices.twoWeeks}
                            </button>
                            <button onClick={() => onAction(3, futurePrices.oneMonth)}>
                                1 Month - New Price: ${futurePrices.oneMonth}
                            </button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    ) : (type === "return" ? (
                        <div>
                            <button className="confirm-button" onClick={onAction}>Yes</button>
                            <button className="cancel-button" onClick={onClose}>No</button>
                        </div>
                    ) : (
                        <button onClick={onClose}>Close</button>
                    ))))
                    }

                </div>
            </div>
        </div>
    );
};

export default Modal;