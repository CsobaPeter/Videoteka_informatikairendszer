import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../UserManagement/Login";
import RegisterPage from "../UserManagement/RegisterPage";
import { AuthContext } from "../UserManagement/AuthContext";

const HomePage = () => {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const toggleRegisterModal = () => {
        setIsRegisterModalOpen((prevState) => !prevState);
    };

    const navigateToMedias = () => {
        navigate("/media/list");
    };

    return (
        <div className="homepage">
            <div className="homepage-left">
                <h1>Videoteka</h1>
                <p>Your ultimate media management system. Explore our vast collection of media today!</p>
                <button onClick={navigateToMedias} className="navigate-button">
                    Browse Media List
                </button>
            </div>
            {auth.username === null && (
                <div className="homepage-right">
                    <Login />
                    <RegisterPage/>
                </div>
            )}
        </div>
    );
};

export default HomePage;