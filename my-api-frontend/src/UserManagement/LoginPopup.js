import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserManagementService from "./UserManagementService";
import { AuthContext } from "./AuthContext";

const LoginPopup = ({ modalOpen, setIsModalOpen }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const userManagementService = UserManagementService(login);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userresp = await userManagementService.login(username, password);

            // Trigger login in AuthContext
            await login(userresp.userid, userresp.username, userresp.userrole);

            navigate(userresp.userrole === 1 ? "/media/list" : "/admin/dashboard");
            handleCloseModal();
        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div>
            {modalOpen && (
                <div className="modal">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label>Username:</label>
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Login</button>
                    </form>
                    <button onClick={handleCloseModal} className="close-modal">
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default LoginPopup;