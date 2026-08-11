import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPointsTable.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminPointsTable() {

    const navigate = useNavigate();

    const [pointsTable, setPointsTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPointsTable();
    }, []);

    const loadPointsTable = async () => {

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
                `${API_BASE_URL}/points-table/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setPointsTable(
                Array.isArray(data)
                    ? data
                    : data.results || []
            );

        } catch (err) {

            console.error(
                "Points table error:",
                err
            );

            if (err.response?.status === 401) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                navigate("/admin-login");
                return;
            }

            setError(
                "Unable to load points table."
            );

        } finally {

            setLoading(false);
        }
    };

    const handleDelete = async (
        id,
        teamName
    ) => {

        const confirmed = window.confirm(
            `Are you sure you want to delete ${teamName} from the points table?`
        );

        if (!confirmed) {
            return;
        }

        const token =
            localStorage.getItem("access_token");

        try {

            await axios.delete(
                `${API_BASE_URL}/points-table/${id}/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setPointsTable(
                (previous) =>
                    previous.filter(
                        (item) =>
                            item.id !== id
                    )
            );

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Unable to delete points table entry."
            );
        }
    };

    if (loading) {

        return (
            <div className="points-loading">
                <div className="points-loading-icon">
                    🏆
                </div>

                <h2>
                    Loading Points Table...
                </h2>
            </div>
        );
    }

    return (
        <div className="admin-points-page">

            <header className="admin-points-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Points Table Management
                    </p>

                </div>

                <div className="admin-points-header-actions">

                    <Link
                        to="/admin/dashboard"
                        className="points-dashboard-btn"
                    >
                        ← Dashboard
                    </Link>

                    <Link
                        to="/admin/points-table/add"
                        className="points-add-btn"
                    >
                        + Add Points Table
                    </Link>

                </div>

            </header>

            <main className="admin-points-content">

                <section className="points-page-title">

                    <div>

                        <span>
                            IPL MANAGEMENT
                        </span>

                        <h2>
                            Points Table
                        </h2>

                        <p>
                            Manage tournament standings,
                            points and team rankings.
                        </p>

                    </div>

                    <div className="points-count">

                        <strong>
                            {pointsTable.length}
                        </strong>

                        <small>
                            Entries
                        </small>

                    </div>

                </section>

                {error && (
                    <div className="points-error">
                        {error}
                    </div>
                )}

                {pointsTable.length === 0 ? (

                    <section className="points-empty">

                        <div>
                            🏆
                        </div>

                        <h2>
                            No Points Table Entries
                        </h2>

                        <p>
                            Add a team to the tournament
                            points table.
                        </p>

                        <Link
                            to="/admin/points-table/add"
                            className="points-add-btn"
                        >
                            + Add Points Table
                        </Link>

                    </section>

                ) : (

                    <section className="points-table-card">

                        <div className="points-table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Position
                                        </th>

                                        <th>
                                            Team
                                        </th>

                                        <th>
                                            Tournament
                                        </th>

                                        <th>
                                            Played
                                        </th>

                                        <th>
                                            Won
                                        </th>

                                        <th>
                                            Lost
                                        </th>

                                        <th>
                                            NR
                                        </th>

                                        <th>
                                            Points
                                        </th>

                                        <th>
                                            NRR
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>

                                <tbody>

                                    {pointsTable.map(
                                        (item) => (

                                            <tr
                                                key={
                                                    item.id
                                                }
                                            >

                                                <td>

                                                    <span className="position-badge">
                                                        {
                                                            item.position
                                                        }
                                                    </span>

                                                </td>

                                                <td>

                                                    <strong>
                                                        {
                                                            item.team_name ||
                                                            "TBD"
                                                        }
                                                    </strong>

                                                    {item.team_short_name && (
                                                        <small>
                                                            {
                                                                item.team_short_name
                                                            }
                                                        </small>
                                                    )}

                                                </td>

                                                <td>

                                                    <strong>
                                                        {
                                                            item.tournament_name ||
                                                            "TBD"
                                                        }
                                                    </strong>

                                                    <small>
                                                        Season{" "}
                                                        {
                                                            item.season ||
                                                            "-"
                                                        }
                                                    </small>

                                                </td>

                                                <td>
                                                    {
                                                        item.matches_played
                                                    }
                                                </td>

                                                <td className="wins">
                                                    {
                                                        item.wins
                                                    }
                                                </td>

                                                <td className="losses">
                                                    {
                                                        item.losses
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        item.no_results
                                                    }
                                                </td>

                                                <td>

                                                    <strong className="points-value">
                                                        {
                                                            item.points
                                                        }
                                                    </strong>

                                                </td>

                                                <td>

                                                    {
                                                        item.net_run_rate
                                                    }

                                                </td>

                                                <td>

                                                    <div className="points-actions">

                                                        <Link
                                                            to={`/admin/points-table/${item.id}/edit`}
                                                            className="edit-btn"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            type="button"
                                                            className="delete-btn"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    item.id,
                                                                    item.team_name ||
                                                                    "this team"
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

export default AdminPointsTable;