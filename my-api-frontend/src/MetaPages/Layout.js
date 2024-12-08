import React, {useContext, useState} from "react";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../UserManagement/AuthContext";
import RegisterPage from "../UserManagement/RegisterPage";
import LoginPopup from "../UserManagement/LoginPopup";

const Layout = () => {
    const { auth, logout } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const pageNames = {
        "/media/list": "Medias",
        "/borrow/list": "My Borrows",
        "/login": "Login",
        "/register": "Register",
        "/": "Home",
        "/unauthorized": "Unauthorized",
        "/notfound": "Page Not Found",
    };

    const currentPage = pageNames[location.pathname] || "Page Not Found";

    const loggingOut = () => {
        (auth.userRole === 0 || auth.userRole === 2) ? navigate('/') : navigate('/media/list');
        logout();
    };

    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    const handleLoginButtonCLick  = () => {
        setIsLoginModalOpen(true);
    }

    return (
        <div>
            <nav className="navbar">
                <div>
                    {auth.userRole === 1 ? (
                        <>
                            <Link to="/"><h2 className="navbar-title">Videoteka</h2></Link>
                            <h4 className="navbar-username">Welcome, {auth.username}</h4>
                            <h4 className="navbar-title">{currentPage}</h4>
                        </>
                    ) : auth.userRole === 0 || auth.userRole === 2 ? (
                        <>
                            <Link to="/admin/dashboard"><h2 className="navbar-title">Videoteka - Admin dashboard</h2></Link>
                            <h3 className="navbar-username">Welcome, {auth.username}</h3>
                        </>
                    ) : (
                        <>
                            <Link to="/"><h2 className="navbar-title">Videoteka</h2></Link>
                            <h4 className="navbar-title">{currentPage}</h4>
                        </>
                    )}
                </div>
                <div className="navbar-links">
                    {(auth.userRole === 0 || auth.userRole === 2) ? (
                        <div>
                            {(auth.userRole === 2) ? (
                            <Link className="link" to="/client/add">Add Client</Link>
                        ) : (
                            <>
                            <Link className="link" to="/client/list">Clients</Link>
                            <Link className="link" to="/media/add">Add Media</Link>
                            <Link className="link" to="/media/list">Medias</Link>
                            <Link className="link" to="/borrow/add">Initiate Borrow</Link>
                            <Link className="link" to="/borrow/list">Borrows</Link>
                            <Link className="link" to="/registerUser">Register a User</Link>
                            </>
                        )}
                        </div>
                    ) : auth.userRole === 1 ? (
                        <div>
                            <Link className="link" to="/media/list">Medias</Link>
                            <Link className="link" to="/borrow/list">Borrows</Link>
                        </div>
                    ) : (
                        <Link className="link" to="/media/list">Medias</Link>
                    )}
                </div>
                <div className="navbar-actions">
                    {auth.username ? (
                        <button onClick={loggingOut} className="logout-button">
                            Logout
                        </button>
                    ) : (
                        <>
                            <button onClick={handleLoginButtonCLick}>Login</button>
                            <RegisterPage />
                        </>
                    )}
                </div>
            </nav>
            <div className="container">
                <Outlet />
            </div>
            {isLoginModalOpen && (
                <LoginPopup modalOpen={isLoginModalOpen} setIsModalOpen={setIsLoginModalOpen} />
            )}
        </div>
    );
};

export default Layout;
