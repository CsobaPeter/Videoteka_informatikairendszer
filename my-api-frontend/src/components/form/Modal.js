import React from "react";

const Modal = ({ isOpen, title, message, onClose, onAction, actionText, children, type }) => {
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
                            <button onClick={() => onAction(1)}>1 Week</button>
                            <button onClick={() => onAction(2)}>2 Weeks</button>
                            <button onClick={() => onAction(3)}>1 Month</button>
                            <button onClick={onClose}>Cancel</button>
                        </div>
                    ) : ( type === "return" ? (
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