import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddMatch.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AddMatch() {
    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);

    const [formData, setFormData] = useState({
        tournament: "",
        team1: "",
        team2: "",
        venue: "",
        match_number: "",
        match_date: "",
        match_time: "",
        status: "UPCOMING",
        winner: "",
        team1_score: 0,
        team2_score: 0,
        result: "",
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
            setLoading(true);
            setError("");

            const headers = {
                Authorization: `Bearer ${token}`,
            };

            const [tournamentResponse, teamResponse] =
                await Promise.all([
                    axios.get(
                        `${API_BASE_URL}/tournaments/`,
                        { headers }
                    ),
                    axios.get(
                        `${API_BASE_URL}/teams/`,
                        { headers }
                    ),
                ]);

            const tournamentData =
                tournamentResponse.data;

            const teamData =
                teamResponse.data;

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
            console.error(
                "Load match data error:",
                err
            );

            if (err.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("admin_logged_in");

                navigate("/admin-login");
                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to load tournaments and teams."
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
            setError("Please select a tournament.");
            return;
        }

        if (!formData.team1) {
            setError("Please select Team 1.");
            return;
        }

        if (!formData.team2) {
            setError("Please select Team 2.");
            return;
        }

        if (formData.team1 === formData.team2) {
            setError(
                "Team 1 and Team 2 cannot be the same."
            );
            return;
        }

        if (!formData.venue.trim()) {
            setError("Venue is required.");
            return;
        }

        if (!formData.match_number) {
            setError("Match number is required.");
            return;
        }

        if (!formData.match_date) {
            setError("Match date is required.");
            return;
        }

        if (!formData.match_time) {
            setError("Match time is required.");
            return;
        }

        if (
            formData.status === "COMPLETED" &&
            !formData.winner
        ) {
            setError(
                "Completed matches must have a winner."
            );
            return;
        }

        try {
            setSaving(true);
            setError("");

            await axios.post(
                `${API_BASE_URL}/matches/`,
                {
                    tournament: Number(
                        formData.tournament
                    ),

                    team1: Number(
                        formData.team1
                    ),

                    team2: Number(
                        formData.team2
                    ),

                    venue: formData.venue.trim(),

                    match_number: Number(
                        formData.match_number
                    ),

                    match_date:
                        formData.match_date,

                    match_time:
                        formData.match_time,

                    status:
                        formData.status,

                    winner: formData.winner
                        ? Number(formData.winner)
                        : null,

                    team1_score: Number(
                        formData.team1_score || 0
                    ),

                    team2_score: Number(
                        formData.team2_score || 0
                    ),

                    result:
                        formData.result.trim(),
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

            navigate("/admin/matches");

        } catch (err) {
            console.error(
                "Add match error:",
                err
            );

            if (err.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("admin_logged_in");

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
                    "Unable to add match."
                );
            }

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="add-match-loading">
                <h2>🏏 Loading Match Form...</h2>
            </div>
        );
    }

    return (
        <div className="add-match-page">

            <header className="add-match-header">

                <div>
                    <h1>🏏 CricketHub Admin</h1>
                    <p>Add Match</p>
                </div>

                <Link to="/admin/matches">
                    ← Back to Matches
                </Link>

            </header>

            <main className="add-match-content">

                <section className="add-match-card">

                    <h2>🏏 Add New Match</h2>

                    {error && (
                        <div className="add-match-error">
                            {error}
                        </div>
                    )}

                    <form
                        className="add-match-form"
                        onSubmit={handleSubmit}
                    >

                        <div className="form-group">

                            <label>
                                Tournament
                            </label>

                            <select
                                name="tournament"
                                value={
                                    formData.tournament
                                }
                                onChange={
                                    handleChange
                                }
                            >
                                <option value="">
                                    Select Tournament
                                </option>

                                {tournaments.map(
                                    (tournament) => (
                                        <option
                                            key={
                                                tournament.id
                                            }
                                            value={
                                                tournament.id
                                            }
                                        >
                                            {
                                                tournament.name
                                            }{" "}
                                            -{" "}
                                            {
                                                tournament.season
                                            }
                                        </option>
                                    )
                                )}
                            </select>

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Team 1
                                </label>

                                <select
                                    name="team1"
                                    value={
                                        formData.team1
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >
                                    <option value="">
                                        Select Team 1
                                    </option>

                                    {teams.map(
                                        (team) => (
                                            <option
                                                key={
                                                    team.id
                                                }
                                                value={
                                                    team.id
                                                }
                                            >
                                                {
                                                    team.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                            </div>


                            <div className="form-group">

                                <label>
                                    Team 2
                                </label>

                                <select
                                    name="team2"
                                    value={
                                        formData.team2
                                    }
                                    onChange={
                                        handleChange
                                    }
                                >
                                    <option value="">
                                        Select Team 2
                                    </option>

                                    {teams.map(
                                        (team) => (
                                            <option
                                                key={
                                                    team.id
                                                }
                                                value={
                                                    team.id
                                                }
                                            >
                                                {
                                                    team.name
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                            </div>

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Match Number
                                </label>

                                <input
                                    type="number"
                                    name="match_number"
                                    min="1"
                                    value={
                                        formData.match_number
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Example: 1"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Venue
                                </label>

                                <input
                                    type="text"
                                    name="venue"
                                    value={
                                        formData.venue
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Example: M. Chinnaswamy Stadium"
                                />

                            </div>

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Match Date
                                </label>

                                <input
                                    type="date"
                                    name="match_date"
                                    value={
                                        formData.match_date
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Match Time
                                </label>

                                <input
                                    type="time"
                                    name="match_time"
                                    value={
                                        formData.match_time
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={
                                    handleChange
                                }
                            >
                                <option value="UPCOMING">
                                    Upcoming
                                </option>

                                <option value="LIVE">
                                    Live
                                </option>

                                <option value="COMPLETED">
                                    Completed
                                </option>

                                <option value="CANCELLED">
                                    Cancelled
                                </option>
                            </select>

                        </div>


                        <div className="form-group">

                            <label>
                                Winner
                            </label>

                            <select
                                name="winner"
                                value={
                                    formData.winner
                                }
                                onChange={
                                    handleChange
                                }
                            >
                                <option value="">
                                    No Winner
                                </option>

                                {teams.map(
                                    (team) => (
                                        <option
                                            key={
                                                team.id
                                            }
                                            value={
                                                team.id
                                            }
                                        >
                                            {
                                                team.name
                                            }
                                        </option>
                                    )
                                )}

                            </select>

                        </div>


                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Team 1 Score
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="team1_score"
                                    value={
                                        formData.team1_score
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Team 2 Score
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="team2_score"
                                    value={
                                        formData.team2_score
                                    }
                                    onChange={
                                        handleChange
                                    }
                                />

                            </div>

                        </div>


                        <div className="form-group">

                            <label>
                                Result
                            </label>

                            <textarea
                                name="result"
                                value={
                                    formData.result
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: RCB won by 5 wickets"
                                rows="3"
                            />

                        </div>


                        <div className="form-actions">

                            <button
                                type="submit"
                                disabled={saving}
                                className="save-match-button"
                            >
                                {saving
                                    ? "Saving..."
                                    : "Add Match"}
                            </button>

                            <Link
                                to="/admin/matches"
                                className="cancel-match-button"
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

export default AddMatch;