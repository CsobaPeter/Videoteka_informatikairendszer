import React, { useState } from "react";
import auth from "../UserManagement/AuthContext";



const TableRow = ({ media, onEdit, onDelete, onBorrow, showBorrowButton }) => {
    return (
        <div className="table-row">
            <div className="form-field">{media.name}</div>
            <div className="form-field">{media.description}</div>
            <div className="form-field">{media.genre}</div>
            <div className="form-field">{media.rating}</div>
            <div className="form-field">{indexToMediaType(media.type)}</div>
            <div className="form-field">{media.duration}</div>
            <div className="form-field">{media.stock}</div>
            <div className="form-buttons">
                <button className="modify-button" onClick={() => onEdit(media.mediaId)}>
                    Edit
                </button>
                <button className="delete-button" onClick={() => onDelete(media.mediaId)}>
                    Delete
                </button>
                {showBorrowButton && (
                    <button
                        className="borrow-button"
                        onClick={() => onBorrow(media.mediaId)}
                    >
                        Borrow Now
                    </button>
                )}
            </div>
        </div>
    );
};

export default TableRow;