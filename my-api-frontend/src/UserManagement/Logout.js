import { useNavigate } from 'react-router-dom';
import UserManagementService from './UserManagementService';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        UserManagementService.logout();
        localStorage.removeItem('userId'); // Clear the ID from localStorage
        localStorage.removeItem('userRole'); // Clear the role from localStorage
        localStorage.removeItem('username'); // Optional: Clear username
        navigate('/'); // Redirect to the login page
    };

    return (
        <button onClick={handleLogout} className="logout-button">
            Logout
        </button>
    );
}

export default Logout;