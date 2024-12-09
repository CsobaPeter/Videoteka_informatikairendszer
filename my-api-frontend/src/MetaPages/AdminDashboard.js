import React, {useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../UserManagement/AuthContext";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const navigateTo = (path) => {
        navigate(path);
    };

    const { auth } = useContext(AuthContext);

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Welcome, {auth.username}</h1>
                <p>Manage your media library, clients, and borrows from here.</p>
            </div>
            <div className="dashboard-buttons">
                <button
                    className="dashboard-button"
                    onClick={() => navigateTo("/media/list")}
                >
                    View Media
                </button>
                <button
                    className="dashboard-button"
                    onClick={() => navigateTo("/client/list")}
                >
                    View Clients
                </button>
                <button
                    className="dashboard-button"
                    onClick={() => navigateTo("/borrow/list")}
                >
                    View Borrows
                </button>
                <button
                    className="dashboard-button"
                    onClick={() => navigateTo("/media/add")}
                >
                    Add New Media
                </button>
                <button
                    className="dashboard-button"
                    onClick={() => navigateTo("/borrow/add")}
                >
                    Initiate New Borrow
                </button>
                <button
                    className="dashboard-button"
                    onClick={() => navigateTo("/register")}
                >
                    Register New User
                </button>
            </div>
        </div>
    );
};

export default AdminDashboard;