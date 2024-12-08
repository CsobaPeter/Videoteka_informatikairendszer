import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserManagement/AuthContext";
import ClientsService from "./ClientsService";
import TextInput from "../components/form/TextInput";
import Modal from "../components/form/Modal";
import UserSelect from "../components/form/UserSelect";
import UserManagementService from "../UserManagement/UserManagementService";
import PhoneInput from "../components/form/PhoneInput";
import EmailInput from "../components/form/EmailInput"; // Reusable Modal

const ClientAdder = () => {
    const { auth } = useContext(AuthContext);
    const clientService = ClientsService(auth.username);
    const userManagementService = UserManagementService(auth.username);
    const navigate = useNavigate();
    const [client, setClient] = useState({ name: "", email: "", phoneNumber: "", address: "" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState([]);

    useEffect(() => {
        userManagementService.getAll().then((response) => setUsers(response.data));
    }, []);

    const handleUserChange = (selected) => {
        if (selected.length > 0) {
            setClient({ ...client, userId: selected[0].id });
            setSelectedUser(selected);
        } else {
            setClient({ ...client, userId: "" });
            setSelectedUser([]);
        }
    };

    // Handle form field changes
    const handleChange = (e) => {
        setClient({ ...client, [e.target.name]: e.target.value });
    };

    // Validation Functions
    const nameValidation = (value) => {
        if (!value.trim()) return "Name is required.";
        return "";
    };

    const emailValidation = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) return "Email is required.";
        if (!emailRegex.test(value)) return "Invalid email format.";
        return "";
    };

    const addressValidation = (value) => {
        if (!value.trim()) return "Address is required.";
        return "";
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = [
            nameValidation(client.name),
            emailValidation(client.email),
            addressValidation(client.address),
        ].filter((error) => error);

        if (errors.length > 0) {
            alert(errors.join("\n"));
            return;
        }
        clientService.create(client).then(() => {
            setIsModalOpen(true);
        });
    };

    const handleAddMore = () => {
        setIsModalOpen(false);
        setClient({ name: "", email: "", phoneNumber: "", address: "" });
    };

    const handleGoToClientList = () => {
        setIsModalOpen(false);
        navigate("/client/list");
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
                    validation={nameValidation}
                />

                <EmailInput
                    label="Email"
                    name="email"
                    value={client.email}
                    onChange={handleChange}
                    required
                />

                <PhoneInput
                    label="Phone"
                    name="phoneNumber"
                    value={client.phoneNumber}
                    onChange={handleChange}
                    required
                />

                <TextInput
                    label="Address"
                    name="address"
                    value={client.address}
                    onChange={handleChange}
                    required
                    validation={addressValidation}
                />

                <UserSelect
                    users={users}
                    selectedUser={selectedUser}
                    onUserChange={handleUserChange}
                />

                <button type="submit">Submit</button>
            </form>

            <Modal
                isOpen={isModalOpen}
                title="Success!"
                message="Your client has been added successfully."
                onAction={handleAddMore}
                actionText="Add More"
                onClose={handleGoToClientList}
                type="add"
            />
        </div>
    );
};

export default ClientAdder;