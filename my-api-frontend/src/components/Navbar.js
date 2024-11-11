import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => (
    <nav className="navbar">
        <div className="navbar-title">Admin Dashboard</div>
        <div className="navbar-links">
            <Link to="/media/list">Media List</Link>
            <Link to="/media/add">Add Media</Link>
            <Link to="/client/list">Client List</Link>
            <Link to="/client/add">Add Client</Link>
            <Link to="/borrow/list">Borrow List</Link>
            <Link to="/borrow/add">Initiate Borrow</Link>
        </div>
    </nav>
);

export default Navbar;