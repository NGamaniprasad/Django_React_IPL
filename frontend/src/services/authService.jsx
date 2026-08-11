import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api";

const authService = {

    registerUser: async (userData) => {
        const response = await axios.post(
            `${API_BASE_URL}/auth/register/`,
            userData
        );

        return response.data;
    },

    loginUser: async (credentials) => {
        const response = await axios.post(
            `${API_BASE_URL}/auth/login/`,
            credentials
        );

        return response.data;
    },

};

export default authService;