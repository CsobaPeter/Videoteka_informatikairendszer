// src/ClientF/ClientUpdate.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientService from './ClientService';
import AddForm from '../components/AddForm';
import {wait} from "@testing-library/user-event/dist/utils";

const ClientUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // Using useNavigate hook for navigation
    const [client, setClient] = useState({ name: '', address: '', email: '', phoneNumber: '' });

    useEffect(() => {
        ClientService.getById(id).then((response) => setClient(response.data));
    }, [id]);

    const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

    const emailValidation = (value) => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address.';
    };

    const phoneValidation = (value) => {
        const phoneNumberRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?(\d{2,4}[-. ]*\d{2,4}[-. ]*\d{2,4})\s*$/gm;
        return phoneNumberRegex.test(value) ? '' : 'Please enter a valid phone number.';
    };

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        ClientService.update(id, client);
        timeout(100).then(() => navigate('/client/list'));
    };

    return (
        <AddForm
            fields={[
                { label: 'Name', name: 'name', type: 'text', value: client.name, onChange: handleChange, required: true },
                { label: 'Address', name: 'address', type: 'text', value: client.address, onChange: handleChange, required: true },
                { label: 'Email', name: 'email', type: 'email', value: client.email, onChange: handleChange, required: true, validation: emailValidation },
                { label: 'Phone Number', name: 'phoneNumber', type: 'text', value: client.phoneNumber, onChange: handleChange, required: true, validation: phoneValidation },
            ]}
            onSubmit={handleSubmit}
        />
    );
};

export default ClientUpdate;