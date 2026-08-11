import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddPointsTable.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AddPointsTable() {
    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);

    const [formData, setFormData] = useState({
        tournament: "",
        team: "",
        matches_played: 0,
        wins: 0,
        losses: 0,
        no_results: 0,
        points: 0,
        net_run_rate: 0,
        position: 0,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {
            const [tournamentResponse, teamResponse] =
                await Promise.all([
                    axios.get(
                        `${API_BASE_URL}/tournaments/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    ),

                    axios.get(
                        `${API_BASE_URL}/teams/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    ),
                ]);

            const tournamentData = tournamentResponse.data;
            const teamData = teamResponse.data;

            setTournaments(
                Array.isArray(tournamentData)
                    ? tournamentData
                    : tournamentData.results || []
            );

            setTeams(
                Array.isArray(teamData)
                    ? teamData
                    : teamData.results || []
            );

        } catch (err) {
            console.error(err);

            if (err.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                navigate("/admin-login");
                return;
            }

            setError("Unable to load tournaments or teams.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        if (!formData.tournament) {
            setError("Please select a tournament.");
            return;
        }

        if (!formData.team) {
            setError("Please select a team.");
            return;
        }

        try {
            setSaving(true);
            setError("");

            await axios.post(
                `${API_BASE_URL}/points-table/`,
                {
                    tournament: Number(formData.tournament),
                    team: Number(formData.team),
                    matches_played: Number(formData.matches_played),
                    wins: Number(formData.wins),
                    losses: Number(formData.losses),
                    no_results: Number(formData.no_results),
                    points: Number(formData.points),
                    net_run_rate: Number(formData.net_run_rate),
                    position: Number(formData.position),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            navigate("/admin/points-table");

        } catch (err) {
            console.error(err);

            if (err.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                navigate("/admin-login");
                return;
            }

            const data = err.response?.data;

            if (data && typeof data === "object") {
                const messages = Object.entries(data).map(
                    ([field, message]) =>
                        `${field}: ${
                            Array.isArray(message)
                                ? message.join(", ")
                                : message
                        }`
                );

                setError(messages.join(" | "));
            } else {
                setError("Unable to add points table entry.");
            }

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="points-loading">
                <h2>🏆 Loading...</h2>
            </div>
        );
    }

    return (
        <div className="add-points-page">

            <header className="add-points-header">
                <div>
                    <h1>🏏 CricketHub Admin</h1>
                    <p>Add Points Table Entry</p>
                </div>

                <Link
                    to="/admin/points-table"
                    className="back-button"
                >
                    ← Back
                </Link>
            </header>

            <main className="add-points-container">

                <div className="add-points-card">

                    <div className="card-header">
                        <h2>Add Points Table</h2>
                        <p>
                            Add team standings for a tournament.
                        </p>
                    </div>

                    {error && (
                        <div className="points-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label>Tournament</label>

                            <select
                                name="tournament"
                                value={formData.tournament}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Tournament
                                </option>

                                {tournaments.map((tournament) => (
                                    <option
                                        key={tournament.id}
                                        value={tournament.id}
                                    >
                                        {tournament.name} -{" "}
                                        {tournament.season}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Team</label>

                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleChange}
                            >
                                <option value="">
                                    Select Team
                                </option>

                                {teams.map((team) => (
                                    <option
                                        key={team.id}
                                        value={team.id}
                                    >
                                        {team.name ||
                                            team.full_name ||
                                            team.short_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-grid">

                            <div className="form-group">
                                <label>Matches Played</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="matches_played"
                                    value={formData.matches_played}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Wins</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="wins"
                                    value={formData.wins}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Losses</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="losses"
                                    value={formData.losses}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>No Results</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="no_results"
                                    value={formData.no_results}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Points</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="points"
                                    value={formData.points}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Net Run Rate</label>
                                <input
                                    type="number"
                                    step="0.001"
                                    name="net_run_rate"
                                    value={formData.net_run_rate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Position</label>
                                <input
                                    type="number"
                                    min="0"
                                    name="position"
                                    value={formData.position}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="save-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Saving..."
                                    : "Add Points Table"}
                            </button>

                            <Link
                                to="/admin/points-table"
                                className="cancel-button"
                            >
                                Cancel
                            </Link>

                        </div>

                    </form>

                </div>

            </main>
        </div>
    );
}

export default AddPointsTable;