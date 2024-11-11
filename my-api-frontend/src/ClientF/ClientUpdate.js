// src/ClientF/ClientUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ClientService from './ClientService';
import AddForm from '../components/AddForm';

const ClientUpdate = () => {
    const { id } = useParams();
    const [client, setClient] = useState({ name: '', address: '', email: '', phoneNumber: '' });

    useEffect(() => {
        ClientService.getById(id).then((response) => setClient(response.data));
    }, [id]);

    const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        ClientService.update(id, client);
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

export default ClientUpdate;