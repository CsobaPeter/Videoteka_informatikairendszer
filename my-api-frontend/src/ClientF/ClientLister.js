import React, { useState, useEffect } from 'react';
import ClientService from './ClientService';
import ListHeader from '../components/ListHeader';

const ClientLister = () => {
  const [clients, setClients] = useState([]);
  const [displayedClients, setDisplayedClients] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    email: '',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  // Fetch all clients once when the component mounts
  useEffect(() => {
    ClientService.getAll()
      .then(response => {
        setClients(response.data);
        setDisplayedClients(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (clientId) => {
    ClientService.delete(clientId)
      .then(() => {
        const updatedClients = clients.filter(client => client.clientId !== clientId);
        setClients(updatedClients);
        applyFiltersAndSorting(updatedClients);
      })
      .catch(error => console.error("Error deleting client:", error));
  };

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...filters, [key]: value };
    setFilters(updatedFilters);
    applyFiltersAndSorting(clients, updatedFilters, sortConfig);
  };

  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    const updatedSortConfig = { key, direction };
    setSortConfig(updatedSortConfig);
    applyFiltersAndSorting(clients, filters, updatedSortConfig);
  };

  const applyFiltersAndSorting = (data, filters = filters, sortConfig = sortConfig) => {
    let filteredClients = data;

    // Apply filtering
    filteredClients = filteredClients.filter(client =>
      Object.keys(filters).every(key =>
        client[key].toString().toLowerCase().includes(filters[key].toLowerCase())
      )
    );

    // Apply sorting
    filteredClients = filteredClients.sort((a, b) => {
      const order = sortConfig.direction === 'asc' ? 1 : -1;
      if (a[sortConfig.key] < b[sortConfig.key]) return -1 * order;
      if (a[sortConfig.key] > b[sortConfig.key]) return 1 * order;
      return 0;
    });

    setDisplayedClients(filteredClients);
  };

  return (
    <div className="list-page">
      <ListHeader
        headers={[
          { key: 'name', label: 'Name' },
          { key: 'address', label: 'Address' },
          { key: 'email', label: 'Email' },
          { key: 'phoneNumber', label: 'Phone Number' },
        ]}
        onFilter={handleFilterChange}
        onSort={handleSort}
        filters={filters}
      />
      <div className="table">
        {displayedClients.map(client => (
          <div key={client.clientId} className="table-row">
            <div className="form-field">{client.name}</div>
            <div className="form-field">{client.address}</div>
            <div className="form-field">{client.email}</div>
            <div className="form-field">{client.phoneNumber}</div>
            <div className="form-field">
              <button className="modify-button">Edit</button>
              <button className="delete-button" onClick={() => handleDelete(client.clientId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClientLister;