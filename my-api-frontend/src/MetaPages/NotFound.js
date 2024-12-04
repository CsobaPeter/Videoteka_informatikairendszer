import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <h1>404 - Page Not Found</h1>
            <p>Oops! The page you're looking for doesn't exist.</p>
            <button className="go-home-button" onClick={() => navigate("/")}>
                Go Back to Home
            </button>
        </div>
    );
};

export default NotFound;