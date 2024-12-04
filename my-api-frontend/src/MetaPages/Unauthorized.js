import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div className="unauthorized-page">
            <h1>403 - Unauthorized</h1>
            <p>You do not have permission to access this page.</p>
            <button className="go-home-button" onClick={() => navigate("/")}>
                Go Back to Home
            </button>
        </div>
    );
};

export default Unauthorized;