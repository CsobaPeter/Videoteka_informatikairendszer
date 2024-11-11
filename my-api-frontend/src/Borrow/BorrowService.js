import axios from 'axios';

const API_BASE = 'http://localhost:8080';

const BorrowsService = {
  getAll: () => axios.get(`${API_BASE}/borrow/Borrows`),
  getById: (id) => axios.get(`${API_BASE}/borrow/Borrows/${id}`),
  getByClientId: (clientId) => axios.get(`${API_BASE}/borrow/Borrows/client/${clientId}`),
  create: (data) => axios.post(`${API_BASE}/borrow/Borrows`, data),
  update: (id, data) => axios.put(`${API_BASE}/borrow/Borrows/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/borrow/Borrows/${id}`)
};

export default BorrowsService;