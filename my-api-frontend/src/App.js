// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import MediaLister from './Media/MediaLister';
import MediaAdder from './Media/MediaAdder';
import MediaUpdate from './Media/MediaUpdate';
import ClientLister from './ClientF/ClientLister';
import ClientAdder from './ClientF/ClientAdder';
import ClientUpdate from './ClientF/ClientUpdate';
import BorrowLister from './Borrow/BorrowLister';
import BorrowInitiator from './Borrow/BorrowInitiator';
import BorrowUpdate from './Borrow/BorrowUpdate';

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/media/list" element={<MediaLister />} />
                <Route path="/media/add" element={<MediaAdder />} />
                <Route path="/media/update/:id" element={<MediaUpdate />} />
                <Route path="/client/list" element={<ClientLister />} />
                <Route path="/client/add" element={<ClientAdder />} />
                <Route path="/client/update/:id" element={<ClientUpdate />} />
                <Route path="/borrow/list" element={<BorrowLister />} />
                <Route path="/borrow/add" element={<BorrowInitiator />} />
                <Route path="/borrow/update/:id" element={<BorrowUpdate />} />
            </Routes>
        </Router>
    );
}

export default App;