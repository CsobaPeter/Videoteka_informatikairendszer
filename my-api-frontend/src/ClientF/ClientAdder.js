// src/ClientF/ClientAdder.js
import React, { useState } from 'react';
import ClientService from './ClientService';
import AddForm from '../components/AddForm';

const ClientAdder = () => {
    const [client, setClient] = useState({ name: '', address: '', email: '', phoneNumber: '' });

    const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        ClientService.create(client);
    };

    return (
        <AddForm
            fields={[
                { label: 'Name', name: 'name', value: client.name, onChange: handleChange, required: true },
                { label: 'Address', name: 'address', value: client.address, onChange: handleChange, required: true },
                { label: 'Email', name: 'email', type: 'email', value: client.email, onChange: handleChange, required: true },
                { label: 'Phone Number', name: 'phoneNumber', type: 'number', value: client.phoneNumber, onChange: handleChange, required: true },
            ]}
            onSubmit={handleSubmit}
        />
    );
};

export default ClientAdder;