import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "../components/form/Modal";
import LoginPopup from "./LoginPopup";

const RegisterPage = () => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        roleOfUser: 1,
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false); // New state

    const [clientData, setClientData] = useState({
        name: "",
        address: "",
        email: "",
        phoneNumber: "",
    });

    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: name === "roleOfUser" ? parseInt(value, 10) : value,
        }));
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
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

            // Success flow
            handleCloseModal();
            setIsSuccessModalOpen(true);
        } catch (error) {
            console.error("Registration failed:", error);
            setErrorMessage("Failed to register user and client.");
        }
    };

    const handleLogin = () => {
        setIsSuccessModalOpen(false);
        setIsLoginPopupOpen(true); // Open the LoginPopup
    };

    const handleGoToClientList = () => {
        setIsSuccessModalOpen(false);
        navigate("/client/list");
    };

    return (
        <div>
            <button className={"reg-button-form"} onClick={handleOpenModal}>Registration</button>
            {isModalOpen && (
                <div className="modal">
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
                    <button onClick={handleCloseModal} className="close-modal">
                        Close
                    </button>
                </div>
            )}
            <Modal
                isOpen={isSuccessModalOpen}
                title="Success!"
                message="Your registration was succesful!."
                onAction={handleLogin}
                actionText="Login"
                onClose={handleGoToClientList}
                type="add"
            />
            {isLoginPopupOpen && <LoginPopup modalOpen={isLoginPopupOpen} setIsModalOpen={setIsLoginPopupOpen}/>}
        </div>
    );
};

export default RegisterPage;