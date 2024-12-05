import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080/auth";

// Create an Axios instance with default headers for endpoints that require identity
const axiosWithIdentity = axios.create();

const UserManagementService = (identity) => {
    // Attach the Identity header to the axios instance
    if (identity) {
        axiosWithIdentity.defaults.headers.common["Identity"] = identity;
    }

    return {
        // These methods do not require the Identity header
        login: async (username, password) => {
            const response = await axios.post("/login", { username, password });
            return response.data;
        },
        logout: async () => {
            const response = await axios.post("/logout", { username: identity });
            return response.data;
        },
        register: async (username, password, userrole) => {
            const response = await axios.post("/register", { username, password, userrole });
            return response.data;
        },

        // These methods use the Axios instance with the Identity header
        getAll: () => axiosWithIdentity.get("/getall"),
        getById: (id) => axiosWithIdentity.get(`/get/${id}`),
        update: (id, data) => axiosWithIdentity.put(`/update/${id}`, data),
        delete: (id) => axiosWithIdentity.delete(`/delete/${id}`),
    };
};

export default UserManagementService;
