import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";

const getAuthConfig = () => {
    const token = localStorage.getItem("access");
    
    

    return {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
};

const getTeams = () => {
    return axios.get(
        `${API_URL}/teams/`,
        getAuthConfig()
    );
};

const getPlayers = () => {
    return axios.get(
        `${API_URL}/players/`,
        getAuthConfig()
    );
};

const getTournaments = () => {
    return axios.get(
        `${API_URL}/tournaments/`,
        getAuthConfig()
    );
};

const getMatches = () => {
    return axios.get(
        `${API_URL}/matches/`,
        getAuthConfig()
    );
};

export default {
    getTeams,
    getPlayers,
    getTournaments,
    getMatches,
};
