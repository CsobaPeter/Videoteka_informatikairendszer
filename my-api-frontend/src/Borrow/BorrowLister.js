import React, { useState, useEffect } from 'react';
import BorrowService from './BorrowService';
import ClientService from '../ClientF/ClientService';
import MediaService from '../Media/MediaService';
import ListHeader from '../components/ListHeader';

// Filter logic
const filterBorrowList = (borrows, filters) => {
    let filtered = [...borrows];

    if (filters.clientId) {
        filtered = filtered.filter(borrow =>
            borrow.clientId.toLowerCase().includes(filters.clientId.toLowerCase())
        );
    }

    if (filters.mediaId) {
        filtered = filtered.filter(borrow =>
            borrow.mediaId.toLowerCase().includes(filters.mediaId.toLowerCase())
        );
    }

    if (filters.borrowDate) {
        filtered = filtered.filter(borrow => {
            const borrowBorrowDate = new Date(borrow.borrowDate);
            const filterBorrowDate = new Date(filters.borrowDate);
            return borrowBorrowDate.getTime() === filterBorrowDate.getTime();
        });
    }

    if (filters.returnDate) {
        filtered = filtered.filter(borrow => {
            const borrowReturnDate = new Date(borrow.returnDate);
            const filterReturnDate = new Date(filters.returnDate);
            return borrowReturnDate.getTime() === filterReturnDate.getTime();
        });
    }
    if (filters.returned) {
        filtered = filtered.filter(borrow => borrow.returned === true);
    }

    return filtered;
};

// Sort logic
const sortBorrowList = (borrows, sortConfig) => {
    const sorted = [...borrows];
    const { key, direction } = sortConfig;

    return sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

// Table row component
const TableRow = ({ borrow, onEdit, onDelete }) => (
    <div className="table-row">
        <div className="form-field">{borrow.clientId}</div>
        <div className="form-field">{borrow.mediaId}</div>
        <div className="form-field">{borrow.borrowDate}</div>
        <div className="form-field">{borrow.returnDate}</div>
        <div className="form-field">{borrow.returned}</div>
        <div className="form-buttons">
            <button className="modify-button" onClick={() => onEdit(borrow.borrowId)}>
                Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(borrow.borrowId)}>
                Delete
            </button>
        </div>
    </div>
);

const BorrowLister = () => {
  const [borrows, setBorrows] = useState([]);
  const [filteredBorrows, setFilteredBorrows] = useState([]);
  const [clients, setClients] = useState([]);
  const [medias, setMedias] = useState([]);
  const [filters, setFilters] = useState({
    clientId: '',
      mediaId: '',
      borrowDate: '',
    returnDate: '',
    returned: ''
  });
  const [sortConfig, setSortConfig] = useState({
      key: 'borrowDate', direction: 'asc'
  });

  useEffect(() => {
    BorrowService.getAll().then(response => {setBorrows(response.data); setFilteredBorrows(response.data)});
    //ClientService.getAll().then(response => setClients(response.data));
    //MediaService.getAll().then(response => setMedias(response.data));
  }, []);

    useEffect(() => {
        const filtered = filterBorrowList(borrows, filters);
        const sorted = sortBorrowList(filtered, sortConfig);
        setFilteredBorrows(sorted);
    }, [filters, sortConfig, borrows]);


    const getClientName = (clientId) => clients.find(client => client.clientId === clientId)?.name || '';
  const getMediaName = (mediaId) => medias.find(media => media.mediaId === mediaId)?.name || '';


  const handleDelete = (borrowId) => {
    BorrowService.delete(borrowId).then(() => {
      setBorrows(borrows.filter(borrow => borrow.borrowId !== borrowId));
    }).catch(error => console.error("Error deleting borrow:", error));
  };

    const handleEdit = (borrowId) => {
        window.location.href = `/borrow/update/${borrowId}`;
    };

    const handleFilterChange = (key, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [key]: value,
        }));
    };

    const handleSortChange = (key) => {
        setSortConfig(prevConfig => {
            return prevConfig.key === key
                ? { key, direction: prevConfig.direction === 'asc' ? 'desc' : 'asc' }
                : { key, direction: 'asc' };
        });
    };

  return (
      <div className="list-page">
          <ListHeader
              headers={[
                  {key: 'borrowDate', label: 'Borrow Date'},
                  {key: 'returnDate', label: 'Return Date'},
                  {key: 'clientId', label: 'Client Name'},
                  {key: 'mediaId', label: 'Media Name'},
                  {key: 'returned', label: 'Returned'}
              ]}
              onFilter={handleFilterChange}
              onSort={handleSortChange}
              filters={filters}
              sortConfig={sortConfig}
          />
          <div className="table">
              {filteredBorrows.map(borrow => (
                  <TableRow
                      key={borrow.borrowId}
                      borrow={borrow}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                  />
              ))}
          </div>
      </div>
  );
};

export default BorrowLister;