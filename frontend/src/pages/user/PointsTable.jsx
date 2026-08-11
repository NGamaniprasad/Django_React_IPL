import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PointsTable.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function PointsTable() {
    const navigate = useNavigate();

    const [pointsTable, setPointsTable] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPointsTable();
    }, []);

    const loadPointsTable = async () => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/points-table/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
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
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                navigate("/login");
                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to load points table."
            );

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="points-loading">
                <div className="points-logo">🏆</div>
                <h2>Loading Points Table...</h2>
            </div>
        );
    }

    return (
        <div className="points-page">

            {/* Header */}
            <header className="points-header">

                <div className="points-brand">
                    <Link to="/">
                        🏏 CricketHub
                    </Link>
                </div>

            </header>


            {/* Navigation */}
            <nav className="points-nav">

                <Link to="/user/dashboard">
                    Dashboard
                </Link>

                <Link to="/user/teams">
                    Teams
                </Link>

                <Link to="/user/fixtures">
                    Fixtures
                </Link>

                <Link to="/user/statistics">
                    Statistics
                </Link>

                <Link
                    to="/user/points-table"
                    className="active"
                >
                    Points Table
                </Link>

            </nav>


            <main className="points-content">

                {/* Title */}
                <section className="points-title">

                    <div>

                        <span>
                            IPL STANDINGS
                        </span>

                        <h1>
                            Points Table
                        </h1>

                        <p>
                            View team standings,
                            wins, losses and points.
                        </p>

                    </div>

                    <div className="points-count">

                        <strong>
                            {pointsTable.length}
                        </strong>

                        <small>
                            Teams
                        </small>

                    </div>

                </section>


                {/* Error */}
                {error && (
                    <div className="points-error">
                        {error}
                    </div>
                )}


                {/* Empty */}
                {pointsTable.length === 0 ? (

                    <section className="no-points">

                        <div className="no-points-icon">
                            🏆
                        </div>

                        <h2>
                            No Points Table Data
                        </h2>

                        <p>
                            Points table data has not
                            been added yet.
                        </p>

                    </section>

                ) : (

                    <section className="points-table-card">

                        <div className="points-table-wrapper">

                            <table>

                                <thead>

                                    <tr>
                                        <th>POS</th>
                                        <th>TEAM</th>
                                        <th>MP</th>
                                        <th>W</th>
                                        <th>L</th>
                                        <th>NR</th>
                                        <th>NRR</th>
                                        <th>PTS</th>
                                    </tr>

                                </thead>

                                <tbody>

                                    {pointsTable.map(
                                        (entry, index) => (

                                            <tr
                                                key={entry.id}
                                            >

                                                <td>
                                                    <strong>
                                                        {entry.position ||
                                                            index + 1}
                                                    </strong>
                                                </td>

                                                <td>

                                                    <div className="points-team">

                                                        <strong>
                                                            {
                                                                entry.team_name ||
                                                                "Unknown Team"
                                                            }
                                                        </strong>

                                                        {entry.season && (
                                                            <small>
                                                                IPL{" "}
                                                                {
                                                                    entry.season
                                                                }
                                                            </small>
                                                        )}

                                                    </div>

                                                </td>

                                                <td>
                                                    {
                                                        entry.matches_played
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        entry.wins
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        entry.losses
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        entry.no_results
                                                    }
                                                </td>

                                                <td>
                                                    {
                                                        Number(
                                                            entry.net_run_rate
                                                        ).toFixed(3)
                                                    }
                                                </td>

                                                <td>

                                                    <strong className="points-value">
                                                        {
                                                            entry.points
                                                        }
                                                    </strong>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>

                )}


                <div className="points-back">

                    <Link to="/user/dashboard">
                        ← Back to Dashboard
                    </Link>

                </div>

            </main>


            {/* Footer */}
            <footer className="points-footer">

                <p>
                    © 2026 CricketHub IPL Manager.
                    All rights reserved.
                </p>

                <div>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/terms">
                        Terms of Use
                    </Link>

                    <Link to="/privacy">
                        Privacy Policy
                    </Link>

                </div>

            </footer>

        </div>
    );
}

export default PointsTable;