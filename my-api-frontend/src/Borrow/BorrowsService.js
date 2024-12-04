import axios from "axios";

const API_BASE = "http://localhost:8080/borrow";

const BorrowsService = (identity) => ({
    getAll: () =>
        axios.get(`${API_BASE}/getall`, {
            headers: { Identity: identity },
        }),
    getById: (id) =>
        axios.get(`${API_BASE}/get/${id}`, {
            headers: { Identity: identity },
        }),
    create: (data) =>
        axios.post(`${API_BASE}/add`, data, {
            headers: { Identity: identity },
        }),
    update: (id, data) =>
        axios.put(`${API_BASE}/update/${id}`, data, {
            headers: { Identity: identity },
        }),
    delete: (id) =>
        axios.delete(`${API_BASE}/delete/${id}`, {
            headers: { Identity: identity },
        }),
    getAllForUser: (id) =>
        axios.get(`${API_BASE}/user/getall/${id}`, {
            headers: { Identity: identity },
        }),
});

export default BorrowsService;
