import React, {useContext, useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/form/Modal";
import {AuthContext} from "./AuthContext";

const RegisterUser = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        roleOfUser: 1,
    });

    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const [clientData, setClientData] = useState({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
    });

    const { auth } = useContext(AuthContext)
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: name === "roleOfUser" ? parseInt(value, 10) : value,
        }));
    };

    const handleClientChange = (e) => {
        const { name, value, type, checked } = e.target;
        setClientData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        try {
            // Step 1: RegisterPage User
            const userResponse = await axios.post("http://localhost:8080/auth/register", userData);
            const { userId } = userResponse.data;

            // Step 2: Create Client linked to the User
            const clientPayload = { ...clientData, userId };
            await axios.post("http://localhost:8080/client/add", clientPayload);

            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage("Failed to register user and client.");
        }
    };


    const handleGoToClientList = () => {
        setIsSuccessModalOpen(false);
        navigate("/client/list");
    };

    const handleAddMore = () => {
        setIsSuccessModalOpen(false);
        setUserData({
            username: "",
            password: "",
            roleOfUser: 0,
        })
        setClientData({
            name: "",
            address: "",
            email: "",
            phoneNumber: "",
        });
    };

    return (
        <div>
            <div>
                <h2>Register</h2>
                {errorMessage && <p className="error">{errorMessage}</p>}
                <form onSubmit={handleSubmit}>
                    <h3>User Information</h3>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={userData.username}
                            onChange={handleUserChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={userData.password}
                            onChange={handleUserChange}
                            required
                        />
                    </div>

                    {auth.userRole === 2 && (
                    <div className="form-group">
                        <label htmlFor="roleOfUser">Role:</label>
                        <select
                            id="roleOfUser"
                            name="roleOfUser"
                            value={userData.roleOfUser}
                            onChange={handleUserChange}
                        >
                            <option value={1}>Registered User</option>
                            <option value={0}>Admin</option>
                        </select>
                    </div>
                    )}
                    <h3>Client Information</h3>
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={clientData.name}
                            onChange={handleClientChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={clientData.address}
                            onChange={handleClientChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={clientData.email}
                            onChange={handleClientChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number:</label>
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={clientData.phoneNumber}
                            onChange={handleClientChange}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
            </div>
            <Modal
                isOpen={isSuccessModalOpen}
                title="Success!"
                message="Your registration was succesful!."
                onAction={handleAddMore}
                actionText="Add more"
                onClose={handleGoToClientList}
                type="add"
            />
        </div>
    );
};

export default RegisterUser;