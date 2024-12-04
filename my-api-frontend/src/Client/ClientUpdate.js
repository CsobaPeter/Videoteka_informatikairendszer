import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from "../UserManagement/AuthContext";
import ClientsService from "./ClientsService";
import TextInput from '../components/form/TextInput';  // Reusing TextInput component
import EmailInput from '../components/form/EmailInput';  // Reusable EmailInput component (custom validation)
import PhoneInput from '../components/form/PhoneInput';  // Reusable PhoneInput component (custom validation)
import Modal from '../components/form/Modal';  // Reusable Modal component for success message

const ClientUpdate = () => {
    const { auth } = useContext(AuthContext);
    const clientService = ClientsService(auth.username); // Access identity from AuthContext
    const { id } = useParams();
    const navigate = useNavigate();
    const [client, setClient] = useState({ name: '', address: '', email: '', phoneNumber: '' });
    const [isModalOpen, setIsModalOpen] = useState(false);  // For showing success modal

    // Handle change for form fields
    const handleChange = (e) => setClient({ ...client, [e.target.name]: e.target.value });

    // Fetch the client data based on the provided ID
    useEffect(() => {
        if (!auth.username) {
            navigate('/login'); // Redirect if not logged in
        } else {
            clientService.getById(id) // Pass identity as header
                .then((response) => setClient(response.data));
        }
    }, [auth.username, navigate]);

    // Submit form handler
    const handleSubmit = (e) => {
        e.preventDefault();
        clientService.update(id, client); // Pass identity as header
        setIsModalOpen(true);  // Open success modal
    };

    // Modal close handler
    const handleModalClose = () => {
        setIsModalOpen(false);
        navigate('/client/list');
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="add-form">
                <TextInput
                    label="Name"
                    name="name"
                    value={client.name}
                    onChange={handleChange}
                    required
                />

                <TextInput
                    label="Address"
                    name="address"
                    value={client.address}
                    onChange={handleChange}
                    required
                />

                <EmailInput
                    label="Email"
                    name="email"
                    value={client.email}
                    onChange={handleChange}
                    required
                />

                <PhoneInput
                    label="Phone Number"
                    name="phoneNumber"
                    value={client.phoneNumber}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Update</button>
            </form>

            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    title="Success!"
                    message="Your client details have been updated successfully."
                    onAction={handleModalClose}
                    actionText="Go to Client List"
                    onClose={handleModalClose}
                    type="update"
                />
            )}
        </div>
    );
};

export default ClientUpdate;
