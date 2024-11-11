import React, { useState, useEffect } from 'react';
import BorrowService from './BorrowService';

const BorrowUpdate = ({ borrowId }) => {
    const [borrowData, setBorrowData] = useState({});

    useEffect(() => {
        BorrowService.get(borrowId)
            .then(response => setBorrowData(response.data))
            .catch(error => console.error(error));
    }, [borrowId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBorrowData({ ...borrowData, [name]: value });
    };

    const handleSubmit = () => {
        BorrowService.update(borrowId, borrowData)
            .then(response => console.log('Borrow updated', response))
            .catch(error => console.error(error));
    };

    return (
        <div className="list-page">
            <div className="filter-container">
                <div className="filter-box">
                    <label className="filter-label">Client Name</label>
                    <input
                        type="text"
                        name="clientName"
                        value={borrowData.clientName || ''}
                        onChange={handleInputChange}
                        className="filter-input"
                    />
                </div>
                <div className="filter-box">
                    <label className="filter-label">Media Title</label>
                    <input
                        type="text"
                        name="mediaTitle"
                        value={borrowData.mediaTitle || ''}
                        onChange={handleInputChange}
                        className="filter-input"
                    />
                </div>
                <div className="filter-box">
                    <label className="filter-label">Return Date</label>
                    <input
                        type="date"
                        name="returnDate"
                        value={borrowData.returnDate || ''}
                        onChange={handleInputChange}
                        className="filter-input"
                    />
                </div>
            </div>
            <button className="modify-button" onClick={handleSubmit}>Update Borrow</button>
        </div>
    );
};

export default BorrowUpdate;
