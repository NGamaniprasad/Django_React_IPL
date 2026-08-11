import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminStatistics.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminStatistics() {

    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/admin/statistics/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setPlayers(
                Array.isArray(data)
                    ? data
                    : data.results || []
            );

        } catch (err) {

            console.error(
                "Admin statistics error:",
                err
            );

            if (err.response?.status === 401) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                navigate("/login");
                return;
            }

            if (err.response?.status === 403) {

                setError(
                    "You do not have permission to manage statistics."
                );

                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to load statistics."
            );

        } finally {

            setLoading(false);
        }
    };


    const deleteStatistics = async (id, name) => {

        const confirmDelete = window.confirm(
            `Delete statistics for ${name}?`
        );

        if (!confirmDelete) {
            return;
        }

        const token = localStorage.getItem("access_token");

        try {

            await axios.delete(
                `${API_BASE_URL}/admin/statistics/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPlayers(
                players.filter(
                    player => player.id !== id
                )
            );

        } catch (err) {

            console.error(
                "Delete statistics error:",
                err
            );

            if (err.response?.status === 403) {

                setError(
                    "Only admin can delete statistics."
                );

                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to delete statistics."
            );
        }
    };


    if (loading) {

        return (
            <div className="admin-stat-loading">
                <div>📊</div>
                <h2>
                    Loading Statistics...
                </h2>
            </div>
        );
    }


    return (

        <div className="admin-stat-page">

            {/* HEADER */}

            <header className="admin-stat-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Statistics Management
                    </p>

                </div>

                <Link
                    to="/admin/dashboard"
                    className="admin-stat-home"
                >
                    ← Dashboard
                </Link>

            </header>


            {/* MAIN */}

            <main className="admin-stat-content">

                <section className="admin-stat-title">

                    <div>

                        <span>
                            ADMIN PANEL
                        </span>

                        <h2>
                            Manage Statistics
                        </h2>

                        <p>
                            Edit or delete player performance
                            statistics.
                        </p>

                    </div>

                    <button
                        onClick={loadStatistics}
                        className="refresh-stat-btn"
                    >
                        ↻ Refresh
                    </button>
                    <Link
        to="/admin/statistics/add"
        className="add-statistics-btn"
    >
        + Add Statistics
    </Link>


                </section>


                {/* ERROR */}

                {error && (

                    <div className="admin-stat-error">
                        ⚠️ {error}
                    </div>

                )}


                {/* TABLE */}

                {players.length === 0 ? (

                    <div className="admin-stat-empty">

                        <div>
                            📊
                        </div>

                        <h2>
                            No Statistics Found
                        </h2>

                        <p>
                            No player statistics are available.
                        </p>

                    </div>

                ) : (

                    <section className="admin-stat-card">

                        <div className="admin-stat-table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Player
                                        </th>

                                        <th>
                                            Team
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Matches
                                        </th>

                                        <th>
                                            Runs
                                        </th>

                                        <th>
                                            Wickets
                                        </th>

                                        <th>
                                            Strike Rate
                                        </th>

                                        <th>
                                            Average
                                        </th>

                                        <th>
                                            Economy
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {players.map(
                                        player => (

                                            <tr
                                                key={player.id}
                                            >

                                                <td>
                                                    <strong>
                                                        {player.name}
                                                    </strong>
                                                </td>

                                                <td>
                                                    {
                                                        player.team_name ||
                                                        "—"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        player.role ||
                                                        "—"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        player.matches ??
                                                        0
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        player.runs ??
                                                        0
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        player.wickets ??
                                                        0
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        player.strike_rate ??
                                                        "—"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        player.batting_average ??
                                                        "—"
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        player.economy ??
                                                        "—"
                                                    }
                                                </td>

                                                <td>

                                                    <div className="stat-actions">

                                                        <Link
                                                            to={`/admin/statistics/${player.id}/edit`}
                                                            className="edit-stat-btn"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            className="delete-stat-btn"
                                                            onClick={() =>
                                                                deleteStatistics(
                                                                    player.id,
                                                                    player.name
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


                <div className="admin-stat-back">

                    <Link to="/admin/dashboard">
                        ← Back to Admin Dashboard
                    </Link>

                </div>

            </main>

        </div>
    );
}

export default AdminStatistics;