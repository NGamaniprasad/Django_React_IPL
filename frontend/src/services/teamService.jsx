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

const getTeam = (teamId) => {
    return axios.get(
        `${API_URL}/teams/${teamId}/`,
        getAuthConfig()
    );
};

const getTeamPlayers = (teamId) => {
    return axios.get(
        `${API_URL}/players/team/${teamId}/`,
        getAuthConfig()
    );
};

export default {
    getTeams,
    getTeam,
    getTeamPlayers,
};