// src/Borrow/BorrowInitiator.js
import React, { useState, useEffect } from 'react';
import BorrowService from './BorrowService';
import ClientService from '../ClientF/ClientService';
import MediaService from '../Media/MediaService';
import AddForm from '../components/AddForm';

const BorrowInitiator = () => {
    const [borrow, setBorrow] = useState({ clientId: '', mediaId: '', borrowDate: '', returnDate: '', returned: false });
    const [clients, setClients] = useState([]);
    const [medias, setMedias] = useState([]);

    useEffect(() => {
        ClientService.getAll().then((response) => setClients(response.data));
        MediaService.getAll().then((response) => setMedias(response.data));
    }, []);

    const handleChange = (e) => setBorrow({ ...borrow, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        BorrowService.create(borrow);
    };

    return (
        <AddForm
            fields={[
                {
                    label: 'Client',
                    name: 'clientId',
                    value: borrow.clientId,
                    onChange: handleChange,
                    type: 'select',
                    options: clients.map(client => ({ value: client.clientId, label: client.name })),
                    required: true,
                },
                {
                    label: 'Media',
                    name: 'mediaId',
                    value: borrow.mediaId,
                    onChange: handleChange,
                    type: 'select',
                    options: medias.map(media => ({ value: media.mediaId, label: media.name })),
                    required: true,
                },
                { label: 'Borrow Date', name: 'borrowDate', type: 'date', value: borrow.borrowDate, onChange: handleChange, required: true },
                { label: 'Return Date', name: 'returnDate', type: 'date', value: borrow.returnDate, onChange: handleChange, required: true },
                { label: 'Returned', name: 'returned', type: 'checkbox', value: borrow.returned, onChange: handleChange },
            ]}
            onSubmit={handleSubmit}
        />
    );
};

export default BorrowInitiator;