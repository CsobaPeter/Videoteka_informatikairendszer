import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { auth } = useContext(AuthContext);
    return allowedRoles.includes(auth.userRole) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;