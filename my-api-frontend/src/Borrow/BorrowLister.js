import React, { useState, useEffect } from 'react';
import BorrowService from './BorrowService';
import ClientService from '../ClientF/ClientService';
import MediaService from '../Media/MediaService';
import ListHeader from '../components/ListHeader';

const BorrowLister = () => {
  const [borrows, setBorrows] = useState([]);
  const [clients, setClients] = useState([]);
  const [medias, setMedias] = useState([]);
  const [filters, setFilters] = useState({
    borrowDate: '',
    returnDate: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'borrowDate', direction: 'asc' });

  useEffect(() => {
    BorrowService.getAll().then(response => setBorrows(response.data));
    ClientService.getAll().then(response => setClients(response.data));
    MediaService.getAll().then(response => setMedias(response.data));
  }, []);

  const getClientName = (clientId) => clients.find(client => client.clientId === clientId)?.name || '';
  const getMediaName = (mediaId) => medias.find(media => media.mediaId === mediaId)?.name || '';

  const handleDelete = (borrowId) => {
    BorrowService.delete(borrowId).then(() => {
      setBorrows(borrows.filter(borrow => borrow.borrowId !== borrowId));
    }).catch(error => console.error("Error deleting borrow:", error));
  };

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const handleSort = (key) => setSortConfig(prev => ({
    key,
    direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
  }));

  return (
    <div className="list-page">
      <ListHeader
        headers={[
          { key: 'borrowDate', label: 'Borrow Date' },
          { key: 'returnDate', label: 'Return Date' },
          { key: 'clientId', label: 'Client Name' },
          { key: 'mediaId', label: 'Media Name' }
        ]}
        onFilter={handleFilterChange}
        onSort={handleSort}
      />
      <div className="table">
        {borrows.map(borrow => (
          <div key={borrow.borrowId} className="table-row">
            <div className="form-field">{borrow.borrowDate}</div>
            <div className="form-field">{borrow.returnDate}</div>
            <div className="form-field">{getClientName(borrow.clientId)}</div>
            <div className="form-field">{getMediaName(borrow.mediaId)}</div>
            <div className="form-field">
              <button className="modify-button">Edit</button>
              <button className="delete-button" onClick={() => handleDelete(borrow.borrowId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BorrowLister;