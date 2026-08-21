


import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditMatch.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function EditMatch() {

    const { id } = useParams();
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
                matchResponse,
                tournamentResponse,
                teamResponse,
            ] = await Promise.all([

                axios.get(
                    `${API_BASE_URL}/matches/${id}/`,
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

            const match =
                matchResponse.data;

            const tournamentData =
                tournamentResponse.data;

            const teamData =
                teamResponse.data;

            const tournamentList =
                Array.isArray(tournamentData)
                    ? tournamentData
                    : tournamentData.results || [];

            const teamList =
                Array.isArray(teamData)
                    ? teamData
                    : teamData.results || [];

            setTournaments(tournamentList);
            setTeams(teamList);

            /*
             * Always convert IDs to strings
             * because select values are strings.
             */

            setFormData({
                tournament:
                    match.tournament
                        ? String(match.tournament)
                        : "",

                team1:
                    match.team1
                        ? String(match.team1)
                        : "",

                team2:
                    match.team2
                        ? String(match.team2)
                        : "",

                venue:
                    match.venue || "",

                match_number:
                    match.match_number
                        ? String(match.match_number)
                        : "",

                match_date:
                    match.match_date || "",

                match_time:
                    match.match_time
                        ? match.match_time.substring(0, 5)
                        : "",

                status:
                    match.status || "UPCOMING",

                winner:
                    match.winner
                        ? String(match.winner)
                        : "",

                team1_score:
                    match.team1_score ?? 0,

                team2_score:
                    match.team2_score ?? 0,

                result:
                    match.result || "",
            });

        } catch (err) {

            console.error(
                "Load match error:",
                err
            );

            if (
                err.response?.status === 401
            ) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                localStorage.removeItem(
                    "admin_logged_in"
                );

                navigate("/admin-login");
                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to load match."
            );

        } finally {

            setLoading(false);
        }
    };

    const handleChange = (event) => {

        const {
            name,
            value,
        } = event.target;

        setFormData((previous) => {

            const updated = {
                ...previous,
                [name]: value,
            };

            /*
             * If Team 1 or Team 2 changes,
             * make sure old winner is still valid.
             */

            if (
                name === "team1" ||
                name === "team2"
            ) {

                if (
                    updated.winner &&
                    updated.winner !== updated.team1 &&
                    updated.winner !== updated.team2
                ) {
                    updated.winner = "";
                }
            }

            return updated;
        });

        setError("");
    };

    const getTeamName = (teamId) => {

        if (!teamId) {
            return "";
        }

        const team = teams.find(
            (item) =>
                String(item.id) === String(teamId)
        );

        if (!team) {
            return `Team ${teamId}`;
        }

        return (
            team.name ||
            team.full_name ||
            team.short_name ||
            `Team ${team.id}`
        );
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        // -----------------------------
        // FRONTEND VALIDATION
        // -----------------------------

        if (!formData.tournament) {
            setError("Tournament is required.");
            return;
        }

        if (!formData.team1) {
            setError("Team 1 is required.");
            return;
        }

        if (!formData.team2) {
            setError("Team 2 is required.");
            return;
        }

        if (
            String(formData.team1) ===
            String(formData.team2)
        ) {
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
            setError(
                "Match number is required."
            );
            return;
        }

        if (!formData.match_date) {
            setError(
                "Match date is required."
            );
            return;
        }

        if (!formData.match_time) {
            setError(
                "Match time is required."
            );
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

        if (
            formData.winner &&
            formData.winner !==
                formData.team1 &&
            formData.winner !==
                formData.team2
        ) {
            setError(
                "Winner must be one of the participating teams."
            );
            return;
        }

        try {

            setSaving(true);
            setError("");

            const payload = {

                tournament:
                    Number(formData.tournament),

                team1:
                    Number(formData.team1),

                team2:
                    Number(formData.team2),

                venue:
                    formData.venue.trim(),

                match_number:
                    Number(formData.match_number),

                match_date:
                    formData.match_date,

                match_time:
                    formData.match_time,

                status:
                    formData.status,

                winner:
                    formData.winner
                        ? Number(formData.winner)
                        : null,

                team1_score:
                    Number(
                        formData.team1_score || 0
                    ),

                team2_score:
                    Number(
                        formData.team2_score || 0
                    ),

                result:
                    formData.result.trim(),
            };

            console.log(
                "Updating match:",
                payload
            );

            await axios.put(
                `${API_BASE_URL}/matches/${id}/`,
                payload,
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
                "Update match error:",
                err
            );

            if (
                err.response?.status === 401
            ) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                localStorage.removeItem(
                    "admin_logged_in"
                );

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
                    "Unable to update match."
                );
            }

        } finally {

            setSaving(false);
        }
    };

    if (loading) {

        return (
            <div className="edit-match-loading">

                <h2>
                    🏏 Loading Match...
                </h2>

            </div>
        );
    }

    return (
        <div className="edit-match-page">

            <header className="edit-match-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Edit Match
                    </p>

                </div>

                <Link to="/admin/matches">
                    ← Back to Matches
                </Link>

            </header>


            <main className="edit-match-content">

                <section className="edit-match-card">

                    <h2>
                        ✏️ Edit Match
                    </h2>


                    {error && (
                        <div className="edit-match-error">
                            {error}
                        </div>
                    )}


                    <form
                        className="edit-match-form"
                        onSubmit={handleSubmit}
                    >

                        {/* TOURNAMENT + MATCH NUMBER */}

                        <div className="form-row">

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


                            <div className="form-group">

                                <label>
                                    Match Number
                                </label>

                                <input
                                    type="number"
                                    name="match_number"
                                    value={
                                        formData.match_number
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    min="1"
                                />

                            </div>

                        </div>


                        {/* TEAMS */}

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
                                                    team.name ||
                                                    team.full_name ||
                                                    team.short_name
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
                                                    team.name ||
                                                    team.full_name ||
                                                    team.short_name
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                        </div>


                        {/* VENUE */}

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


                        {/* DATE + TIME */}

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


                        {/* STATUS + WINNER */}

                        <div className="form-row">

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

                                    {formData.team1 && (
                                        <option
                                            value={
                                                formData.team1
                                            }
                                        >
                                            {
                                                getTeamName(
                                                    formData.team1
                                                )
                                            }
                                        </option>
                                    )}

                                    {formData.team2 && (
                                        <option
                                            value={
                                                formData.team2
                                            }
                                        >
                                            {
                                                getTeamName(
                                                    formData.team2
                                                )
                                            }
                                        </option>
                                    )}

                                </select>

                            </div>

                        </div>


                        {/* SCORES */}

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Team 1 Score
                                </label>

                                <input
                                    type="number"
                                    name="team1_score"
                                    value={
                                        formData.team1_score
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    min="0"
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Team 2 Score
                                </label>

                                <input
                                    type="number"
                                    name="team2_score"
                                    value={
                                        formData.team2_score
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    min="0"
                                />

                            </div>

                        </div>


                        {/* RESULT */}

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
                            />

                        </div>


                        {/* ACTIONS */}

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="update-match-button"
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update Match"}
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

export default EditMatch;