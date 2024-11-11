// MediasService.js
import axios from 'axios';

const API_BASE = 'http://localhost:8080';

const MediasService = {
  getAll: () => axios.get(`${API_BASE}/media/Medias`),
  getById: (id) => axios.get(`${API_BASE}/media/Medias/${id}`),
  create: (data) => axios.post(`${API_BASE}/media/Medias`, data),
  update: (id, data) => axios.put(`${API_BASE}/media/Medias/${id}`, data),
  delete: (id) => axios.delete(`${API_BASE}/media/Medias/${id}`)
};

export default MediasService;