import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ element, allowedRoles }) => {
    const { auth } = useContext(AuthContext);

    console.log("userroleinprot", auth.userRole);
    console.log("allowedroles", allowedRoles);
    console.log("include", allowedRoles.includes(auth.userRole));
    return allowedRoles.includes(auth.userRole) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;