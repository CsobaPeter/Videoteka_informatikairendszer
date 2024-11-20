import React, { useState } from 'react';
import ClientService from './ClientService';
import AddForm from '../components/AddForm';
import {useNavigate} from "react-router-dom";
import '../App.css';

const ClientAdder = () => {
    const navigate = useNavigate(); // Using useNavigate hook for navigation
    const [client, setClient] = useState({ name: '', address: '', email: '', phoneNumber: '' });
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

    const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

    const emailValidation = (value) => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address.';
    };

    const phoneValidation = (value) => {
        const phoneNumberRegex = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?(\d{2,4}[-. ]*\d{2,4}[-. ]*\d{2,4})\s*$/gm;
        return phoneNumberRegex.test(value) ? '' : 'Please enter a valid phone number.';
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        ClientService.create(client);

        setIsModalOpen(true);
    };

    const handleAddMore = () => {
        // Close the modal and reset the form to add more media
        setIsModalOpen(false);
        setClient({ name: '', address: '', email: '', phoneNumber: ''});
    };

    const handleGoToClientList = () => {
        // Navigate to /media/list
        setIsModalOpen(false);
        navigate('/client/list');
    };

    return (
        <div>
            <AddForm
                fields={[
                    { label: 'Name', name: 'name', type: 'text', value: client.name, onChange: handleChange, required: true },
                    { label: 'Address', name: 'address', type: 'text', value: client.address, onChange: handleChange, required: true },
                    { label: 'Email', name: 'email', type: 'email', value: client.email, onChange: handleChange, required: true, validation: emailValidation },
                    { label: 'Phone Number', name: 'phoneNumber', type: 'text', value: client.phoneNumber, onChange: handleChange, required: true, validation: phoneValidation },
                ]}
                onSubmit={handleSubmit}
            />

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Success!</h2>
                        <p>Your media has been added successfully.</p>
                        <div className="modal-buttons">
                            <button onClick={handleAddMore}>I want to add more</button>
                            <button onClick={handleGoToClientList}>Media List Page</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ClientAdder;
