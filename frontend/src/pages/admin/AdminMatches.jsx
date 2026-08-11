import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminMatches.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminMatches() {
    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadMatches();
    }, []);

    const loadMatches = async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/matches/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setMatches(
                Array.isArray(data)
                    ? data
                    : data.results || []
            );

        } catch (err) {
            console.error("Load matches error:", err);

            if (err.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("admin_logged_in");

                navigate("/admin-login");
                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to load matches."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id, matchNumber) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete Match ${matchNumber}?`
        );

        if (!confirmed) {
            return;
        }

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {
            await axios.delete(
                `${API_BASE_URL}/matches/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMatches((previous) =>
                previous.filter(
                    (match) => match.id !== id
                )
            );

        } catch (err) {
            console.error(
                "Delete match error:",
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
                "Unable to delete match."
            );
        }
    };

    const formatDate = (date) => {
        if (!date) {
            return "—";
        }

        const parts = date.split("-");

        if (parts.length !== 3) {
            return date;
        }

        return `${parts[2]}-${parts[1]}-${parts[0]}`;
    };

    const formatTime = (time) => {
        if (!time) {
            return "—";
        }

        return time.substring(0, 5);
    };

    const getStatusClass = (status) => {
        switch (status) {
            case "UPCOMING":
                return "status-upcoming";

            case "LIVE":
                return "status-live";

            case "COMPLETED":
                return "status-completed";

            case "CANCELLED":
                return "status-cancelled";

            default:
                return "";
        }
    };

    if (loading) {
        return (
            <div className="admin-matches-loading">
                <div className="loading-card">
                    <div className="loading-icon">🏏</div>
                    <h2>Loading Matches...</h2>
                    <p>Please wait.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="admin-matches-page">

            {/* HEADER */}

            <header className="admin-matches-header">

                <div>
                    <h1>🏏 CricketHub Admin</h1>
                    <p>Match Management</p>
                </div>

                <div className="matches-header-actions">

                    <Link
                        to="/admin/dashboard"
                        className="dashboard-button"
                    >
                        ← Dashboard
                    </Link>

                    <Link
                        to="/admin/matches/add"
                        className="add-match-button"
                    >
                        + Add Match
                    </Link>

                </div>

            </header>


            {/* MAIN */}

            <main className="admin-matches-content">

                <section className="matches-title-section">

                    <div>

                        <span className="section-label">
                            ADMINISTRATION
                        </span>

                        <h2>Manage Matches</h2>

                        <p>
                            Manage tournament fixtures,
                            teams, venues and match results.
                        </p>

                    </div>

                    <div className="matches-count">

                        <strong>
                            {matches.length}
                        </strong>

                        <span>
                            Matches
                        </span>

                    </div>

                </section>


                {/* ERROR */}

                {error && (
                    <div className="matches-error">
                        ⚠️ {error}
                    </div>
                )}


                {/* EMPTY */}

                {matches.length === 0 ? (

                    <section className="no-matches">

                        <div className="no-matches-icon">
                            🏏
                        </div>

                        <h2>No Matches Found</h2>

                        <p>
                            No matches have been added yet.
                        </p>

                        <Link
                            to="/admin/matches/add"
                            className="empty-add-button"
                        >
                            + Add First Match
                        </Link>

                    </section>

                ) : (

                    <section className="matches-table-card">

                        <div className="matches-table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>ID</th>
                                        <th>Match</th>
                                        <th>Tournament</th>
                                        <th>Teams</th>
                                        <th>Date</th>
                                        <th>Time</th>
                                        <th>Venue</th>
                                        <th>Status</th>
                                        <th>Winner</th>
                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {matches.map(
                                        (match) => (

                                            <tr
                                                key={match.id}
                                            >

                                                <td>
                                                    <span className="match-id">
                                                        #{match.id}
                                                    </span>
                                                </td>


                                                <td>

                                                    <strong>
                                                        Match{" "}
                                                        {
                                                            match.match_number
                                                        }
                                                    </strong>

                                                </td>


                                                <td>

                                                    <span className="tournament-name">
                                                        {
                                                            match.tournament_name ||
                                                            "N/A"
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="teams-cell">

                                                        <strong>
                                                            {
                                                                match.team1_name ||
                                                                "Team 1"
                                                            }
                                                        </strong>

                                                        <span>
                                                            VS
                                                        </span>

                                                        <strong>
                                                            {
                                                                match.team2_name ||
                                                                "Team 2"
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>
                                                    {
                                                        formatDate(
                                                            match.match_date
                                                        )
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        formatTime(
                                                            match.match_time
                                                        )
                                                    }
                                                </td>


                                                <td>

                                                    <span className="venue-name">
                                                        📍{" "}
                                                        {
                                                            match.venue ||
                                                            "N/A"
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    <span
                                                        className={`match-status ${getStatusClass(
                                                            match.status
                                                        )}`}
                                                    >
                                                        {
                                                            match.status
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    {
                                                        match.winner_name
                                                            ? match.winner_name
                                                            : "—"
                                                    }

                                                </td>


                                                <td>

                                                    <div className="match-actions">

                                                        <Link
                                                            to={`/admin/matches/${match.id}/edit`}
                                                            className="edit-match-button"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="delete-match-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    match.id,
                                                                    match.match_number
                                                                )
                                                            }
                                                        >
                                                            Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>

                )}

            </main>

        </div>
    );
}

export default AdminMatches;