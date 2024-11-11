// ClientsService.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080';

const ClientsService = {
  getAll: () => axios.get(`${API_BASE}/client/Clients`),
  getById: (id) => axios.get(`${API_BASE}/client/Clients/${id}`),
  create: (data) => axios.post(`${API_BASE}/client/Clients`, data),
  update: (id, data) => axios.put(`${API_BASE}/client/Clients/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/client/Clients/${id}`)
};

export default ClientsService;