import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminTeams.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminTeams() {

    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/teams/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setTeams(
                Array.isArray(data)
                    ? data
                    : data.results || []
            );

        } catch (err) {

            console.error("Admin teams error:", err);

            if (err.response?.status === 401) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("admin_logged_in");

                navigate("/admin-login");
                return;
            }

            setError("Unable to load teams.");

        } finally {

            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-loading">
                <h2>🏏 Loading Teams...</h2>
            </div>
        );
    }

    return (
        <div className="admin-teams-page">

            <header className="admin-header">

                <div>
                    <h1>🏏 CricketHub Admin</h1>
                    <p>Team Management</p>
                </div>

                <Link
                    to="/admin/dashboard"
                    className="admin-back-button"
                >
                    ← Dashboard
                </Link>

            </header>


            <main className="admin-teams-content">

                <div className="page-heading">

                    <div>
                        <span>ADMINISTRATION</span>

                        <h2>Manage Teams</h2>

                        <p>
                            View and manage IPL franchise information.
                        </p>
                    </div>

                    <div className="team-count">
                        <strong>{teams.length}</strong>
                        <span>Teams</span>
                    </div>

                </div>


                {error && (
                    <div className="admin-error">
                        {error}
                    </div>
                )}


                {teams.length === 0 ? (

                    <div className="empty-state">

                        <div>🏏</div>

                        <h2>No Teams Found</h2>

                        <p>
                            No teams are currently available.
                        </p>

                    </div>

                ) : (

                    <div className="teams-table-card">

                        <table>

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Team</th>
                                    <th>Short Name</th>
                                    <th>Captain</th>
                                    <th>Coach</th>
                                    <th>Home Ground</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                {teams.map((team) => (

                                    <tr key={team.id}>

                                        <td>
                                            {team.id}
                                        </td>

                                        <td>
                                            <strong>
                                                {team.full_name ||
                                                    team.name ||
                                                    "N/A"}
                                            </strong>
                                        </td>

                                        <td>
                                            {team.short_name || "N/A"}
                                        </td>

                                        <td>
                                            {team.captain || "Not available"}
                                        </td>

                                        <td>
                                            {team.coach || "Not available"}
                                        </td>

                                        <td>
                                            {team.home_ground || "Not available"}
                                        </td>

                                        <td>

                                            <Link
                                                to={`/admin/teams/${team.id}`}
                                                className="view-team-button"
                                            >
                                                View
                                            </Link>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </main>

        </div>
    );
}

export default AdminTeams;