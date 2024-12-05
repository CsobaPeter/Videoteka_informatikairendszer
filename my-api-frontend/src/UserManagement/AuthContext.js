import React, { createContext, useState, useEffect} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        userid: Number(localStorage.getItem("userid")),
        username: localStorage.getItem("username"),
        userRole: Number(localStorage.getItem("userRole")),
    });

    // Login function
    const login = (userid, username, userRole) => {
        setAuth({ userid, username, userRole });
        localStorage.setItem("userid", userid.toString());
        localStorage.setItem("username", username);
        localStorage.setItem("userRole", userRole.toString());
    };

    // Logout function
    const logout = () => {
        setAuth({ userid: null, username: null, userRole: null });
        localStorage.removeItem("userid");
        localStorage.removeItem("username");
        localStorage.removeItem("userRole");
    };

    // Synchronize `auth` state with `localStorage` on mount
    useEffect(() => {
        const userid = localStorage.getItem("userid");
        const username = localStorage.getItem("username");
        const userRole = localStorage.getItem("userRole");

        if (userid && username && userRole) {
            setAuth({ userid : Number(userid), username, userRole: Number(userRole) });
        }
        else
            setAuth({userid : null, username: null, userRole: null} )
    }, []);

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
