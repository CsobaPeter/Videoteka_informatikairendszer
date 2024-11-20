import React, { useState, useEffect } from 'react';
import ClientService from './ClientService';
import ListHeader from '../components/ListHeader';

// Filter logic
const filterClientList = (clients, filters) => {
    let filtered = [...clients];

    if (filters.name) {
        filtered = filtered.filter(client =>
            client.name.toLowerCase().includes(filters.name.toLowerCase())
        );
    }

    if (filters.address) {
        filtered = filtered.filter(client =>
            client.address.toLowerCase().includes(filters.address.toLowerCase())
        );
    }

    if (filters.email) {
        filtered = filtered.filter(client =>
            client.email.toLowerCase().includes(filters.email.toLowerCase())
        );
    }

    if (filters.phoneNumber) {
        filtered = filtered.filter(client =>
            client.phoneNumber.toLowerCase().includes(filters.phoneNumber.toLowerCase())
        );
    }

    return filtered;
};

// Sort logic
const sortClientList = (clients, sortConfig) => {
    const sorted = [...clients];
    const { key, direction } = sortConfig;

    return sorted.sort((a, b) => {
        if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
        return 0;
    });
};

// Table row component
const TableRow = ({ client, onEdit, onDelete }) => (
    <div className="table-row">
        <div className="form-field">{client.name}</div>
        <div className="form-field">{client.address}</div>
        <div className="form-field">{client.email}</div>
        <div className="form-field">{client.phoneNumber}</div>
        <div className="form-buttons">
            <button className="modify-button" onClick={() => onEdit(client.clientId)}>
                Edit
            </button>
            <button className="delete-button" onClick={() => onDelete(client.clientId)}>
                Delete
            </button>
        </div>
    </div>
);

const ClientLister = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
  });
  const [sortConfig, setSortConfig] = useState({
      key: 'name',
      direction: 'asc'
  });

  // Fetch all clients once when the component mounts
  useEffect(() => {
    ClientService.getAll()
      .then(response => {
        setClients(response.data);
        setFilteredClients(response.data);
      })
      .catch(error => console.error(error));
  }, []);

    useEffect(() => {
        const filtered = filterClientList(clients, filters);
        const sorted = sortClientList(filtered, sortConfig);
        setFilteredClients(sorted);
    }, [filters, sortConfig, clients]);

  const handleDelete = (clientId) => {
    ClientService.delete(clientId)
      .then(() => {
          setClients(clients.filter(client => client.clientId !== clientId));
      })
      .catch(error => console.error("Error deleting client:", error));
  };
  const handleEdit = (clientId) => {
      window.location.href = `/client/update/${clientId}`;
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
                  {key: 'name', label: 'Name'},
                  {key: 'address', label: 'Address'},
                  {key: 'email', label: 'Email'},
                  {key: 'phoneNumber', label: 'Phone Number'},
              ]}
              onFilter={handleFilterChange}
              onSort={handleSortChange}
              filters={filters}
              sortConfig={sortConfig}
          />
          <div className="table">
              {filteredClients.map(client => (
                  <TableRow
                      key={client.clientId}
                      client={client}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                  />
              ))}
          </div>
      </div>
  );
};

export default ClientLister;