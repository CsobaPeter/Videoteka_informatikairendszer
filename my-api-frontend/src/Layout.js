import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div>
      <nav className="container">
        <h1>Admin Dashboard</h1>
        <div>
          <Link to="/borrow/list">Borrows</Link>
          <Link to="/client/list">Clients</Link>
          <Link to="/media/list">Medias</Link>
          <Link to="/borrow/initiate">Initiate Borrow</Link>
          <Link to="/client/add">Add Client</Link>
          <Link to="/media/add">Add Media</Link>
        </div>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  );
};

export default Layout;