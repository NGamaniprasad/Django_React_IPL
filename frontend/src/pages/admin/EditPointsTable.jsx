import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditPointsTable.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function EditPointsTable() {

    const { id } = useParams();
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
    }, [id]);

    const loadData = async () => {

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [
                pointsResponse,
                tournamentsResponse,
                teamsResponse,
            ] = await Promise.all([
                axios.get(
                    `${API_BASE_URL}/points-table/${id}/`,
                    { headers }
                ),
                axios.get(
                    `${API_BASE_URL}/tournaments/`,
                    { headers }
                ),
                axios.get(
                    `${API_BASE_URL}/teams/`,
                    { headers }
                ),
            ]);

            const points = pointsResponse.data;

            const tournamentData =
                tournamentsResponse.data;

            const teamData =
                teamsResponse.data;

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

            setFormData({
                tournament: points.tournament || "",
                team: points.team || "",
                matches_played:
                    points.matches_played ?? 0,
                wins:
                    points.wins ?? 0,
                losses:
                    points.losses ?? 0,
                no_results:
                    points.no_results ?? 0,
                points:
                    points.points ?? 0,
                net_run_rate:
                    points.net_run_rate ?? 0,
                position:
                    points.position ?? 0,
            });

        } catch (err) {

            console.error(
                "Load points table error:",
                err
            );

            if (err.response?.status === 401) {
                navigate("/admin-login");
                return;
            }

            setError(
                "Unable to load points table entry."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        if (!formData.tournament) {
            setError(
                "Please select a tournament."
            );
            return;
        }

        if (!formData.team) {
            setError(
                "Please select a team."
            );
            return;
        }

        try {

            setSaving(true);
            setError("");

            await axios.put(
                `${API_BASE_URL}/points-table/${id}/`,
                {
                    tournament:
                        Number(formData.tournament),

                    team:
                        Number(formData.team),

                    matches_played:
                        Number(formData.matches_played),

                    wins:
                        Number(formData.wins),

                    losses:
                        Number(formData.losses),

                    no_results:
                        Number(formData.no_results),

                    points:
                        Number(formData.points),

                    net_run_rate:
                        Number(formData.net_run_rate),

                    position:
                        Number(formData.position),
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );

            navigate(
                "/admin/points-table"
            );

        } catch (err) {

            console.error(
                "Update points table error:",
                err
            );

            if (err.response?.status === 401) {
                navigate("/admin-login");
                return;
            }

            const data =
                err.response?.data;

            if (
                data &&
                typeof data === "object"
            ) {

                const messages =
                    Object.entries(data).map(
                        ([field, message]) =>
                            `${field}: ${
                                Array.isArray(message)
                                    ? message.join(", ")
                                    : message
                            }`
                    );

                setError(
                    messages.join(" | ")
                );

            } else {

                setError(
                    "Unable to update points table."
                );
            }

        } finally {

            setSaving(false);
        }
    };

    if (loading) {

        return (
            <div className="edit-points-loading">

                <div>
                    🏆
                </div>

                <h2>
                    Loading Points Table...
                </h2>

            </div>
        );
    }

    return (
        <div className="edit-points-page">

            <header className="edit-points-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Edit Points Table
                    </p>

                </div>

                <Link
                    to="/admin/points-table"
                    className="edit-points-back"
                >
                    ← Back to Points Table
                </Link>

            </header>


            <main className="edit-points-content">

                <section className="edit-points-card">

                    <div className="edit-points-title">

                        <span>
                            IPL MANAGEMENT
                        </span>

                        <h2>
                            Edit Points Table
                        </h2>

                        <p>
                            Update team standings and statistics.
                        </p>

                    </div>


                    {error && (

                        <div className="edit-points-error">
                            {error}
                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="edit-points-form"
                    >

                        <div className="form-group">

                            <label>
                                Tournament
                            </label>

                            <select
                                name="tournament"
                                value={formData.tournament}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Tournament
                                </option>

                                {tournaments.map(
                                    (tournament) => (

                                        <option
                                            key={tournament.id}
                                            value={tournament.id}
                                        >
                                            {tournament.name}
                                            {" - "}
                                            {tournament.season}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Team
                            </label>

                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Team
                                </option>

                                {teams.map(
                                    (team) => (

                                        <option
                                            key={team.id}
                                            value={team.id}
                                        >
                                            {team.name ||
                                                team.full_name ||
                                                team.short_name}
                                        </option>

                                    )
                                )}

                            </select>

                        </div>


                        <div className="form-grid">

                            <div className="form-group">

                                <label>
                                    Matches Played
                                </label>

                                <input
                                    type="number"
                                    name="matches_played"
                                    min="0"
                                    value={
                                        formData.matches_played
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Wins
                                </label>

                                <input
                                    type="number"
                                    name="wins"
                                    min="0"
                                    value={
                                        formData.wins
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Losses
                                </label>

                                <input
                                    type="number"
                                    name="losses"
                                    min="0"
                                    value={
                                        formData.losses
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    No Results
                                </label>

                                <input
                                    type="number"
                                    name="no_results"
                                    min="0"
                                    value={
                                        formData.no_results
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Points
                                </label>

                                <input
                                    type="number"
                                    name="points"
                                    min="0"
                                    value={
                                        formData.points
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Net Run Rate
                                </label>

                                <input
                                    type="number"
                                    name="net_run_rate"
                                    step="0.001"
                                    value={
                                        formData.net_run_rate
                                    }
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Position
                                </label>

                                <input
                                    type="number"
                                    name="position"
                                    min="0"
                                    value={
                                        formData.position
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        <div className="form-actions">

                            <button
                                type="submit"
                                className="update-points-btn"
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update Points Table"
                                }
                            </button>

                            <Link
                                to="/admin/points-table"
                                className="cancel-points-btn"
                            >
                                Cancel
                            </Link>

                        </div>

                    </form>

                </section>

            </main>

        </div>
    );
}

export default EditPointsTable;