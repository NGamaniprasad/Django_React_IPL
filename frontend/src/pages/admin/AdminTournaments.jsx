import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminTournaments.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminTournaments() {

    const navigate = useNavigate();

    const [tournaments, setTournaments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTournaments();
    }, []);

    const loadTournaments = async () => {

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/tournaments/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setTournaments(
                Array.isArray(data)
                    ? data
                    : data.results || []
            );

        } catch (err) {

            console.error(
                "Load tournaments error:",
                err
            );

            if (err.response?.status === 401) {

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
                "Unable to load tournaments."
            );

        } finally {

            setLoading(false);
        }
    };


    const handleDelete = async (id, name) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${name}?`
        );

        if (!confirmed) {
            return;
        }

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            await axios.delete(
                `${API_BASE_URL}/tournaments/${id}/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setTournaments(
                (previous) =>
                    previous.filter(
                        (tournament) =>
                            tournament.id !== id
                    )
            );

        } catch (err) {

            console.error(
                "Delete tournament error:",
                err
            );

            if (err.response?.status === 401) {

                navigate("/admin-login");
                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to delete tournament."
            );
        }
    };


    const getStatusClass = (status) => {

        if (status === "UPCOMING") {
            return "status-upcoming";
        }

        if (status === "ONGOING") {
            return "status-ongoing";
        }

        if (status === "COMPLETED") {
            return "status-completed";
        }

        return "";
    };


    if (loading) {

        return (
            <div className="admin-tournaments-loading">

                <h2>
                    🏆 Loading Tournaments...
                </h2>

            </div>
        );
    }


    return (

        <div className="admin-tournaments-page">


            {/* ================= HEADER ================= */}

            <header className="admin-tournaments-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Tournament Management
                    </p>

                </div>


                <div>

                    <Link
                        to="/admin/dashboard"
                        className="admin-dashboard-button"
                    >
                        ← Dashboard
                    </Link>

                    <Link
                        to="/admin/tournaments/add"
                        className="add-tournament-button"
                    >
                        + Add Tournament
                    </Link>

                </div>

            </header>


            {/* ================= CONTENT ================= */}

            <main className="admin-tournaments-content">


                {/* TITLE */}

                <section className="tournaments-title">

                    <div>

                        <span>
                            ADMINISTRATION
                        </span>

                        <h2>
                            Manage Tournaments
                        </h2>

                        <p>
                            Create, update and manage
                            IPL tournament seasons.
                        </p>

                    </div>


                    <div className="tournaments-count">

                        <strong>
                            {tournaments.length}
                        </strong>

                        <small>
                            Tournaments
                        </small>

                    </div>

                </section>


                {/* ERROR */}

                {error && (

                    <div className="tournaments-error">
                        {error}
                    </div>

                )}


                {/* ================= EMPTY ================= */}

                {tournaments.length === 0 ? (

                    <section className="no-tournaments">

                        <div className="no-tournaments-icon">
                            🏆
                        </div>

                        <h2>
                            No Tournaments Found
                        </h2>

                        <p>
                            No tournaments have been
                            added yet.
                        </p>

                        <br />

                        <Link
                            to="/admin/tournaments/add"
                            className="add-tournament-button"
                        >
                            + Add Tournament
                        </Link>

                    </section>

                ) : (


                    /* ================= TABLE ================= */

                    <section className="tournaments-table-card">

                        <div className="tournaments-table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Tournament
                                        </th>

                                        <th>
                                            Season
                                        </th>

                                        <th>
                                            Start Date
                                        </th>

                                        <th>
                                            End Date
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {tournaments.map(
                                        (tournament) => (

                                            <tr
                                                key={
                                                    tournament.id
                                                }
                                            >

                                                <td>
                                                    {
                                                        tournament.id
                                                    }
                                                </td>


                                                <td>

                                                    <strong>
                                                        {
                                                            tournament.name
                                                        }
                                                    </strong>

                                                </td>


                                                <td>
                                                    {
                                                        tournament.season
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        tournament.start_date
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        tournament.end_date
                                                    }
                                                </td>


                                                <td>

                                                    <span
                                                        className={`tournament-status ${getStatusClass(
                                                            tournament.status
                                                        )}`}
                                                    >
                                                        {
                                                            tournament.status
                                                        }
                                                    </span>

                                                </td>


                                                <td>

                                                    <div className="tournament-actions">

                                                        <Link
                                                            to={`/admin/tournaments/${tournament.id}/edit`}
                                                            className="edit-tournament-button"
                                                        >
                                                            Edit
                                                        </Link>


                                                        <button
                                                            type="button"
                                                            className="delete-tournament-button"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    tournament.id,
                                                                    tournament.name
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

export default AdminTournaments;