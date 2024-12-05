import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserManagementService from "./UserManagementService";
import { AuthContext } from "./AuthContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const userManagementService = UserManagementService(login);

    const handleLogin = async () => {
        try {
            const userresp = await userManagementService.login(username, password);

            // Trigger login in AuthContext
            await login(userresp.userid, userresp.username, userresp.userrole);

            console.log(userresp.userrole);
            // Navigate after login (use a delay to ensure state updates)

            await navigate(userresp.userrole === 1 ? "/media/list" : "/admin/dashboard");

        } catch (error) {
            console.error("Login failed:", error.response?.data || error.message);
            alert("Login failed. Please check your credentials.");
        }
    };


    return (
        <div>
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="login" onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;
