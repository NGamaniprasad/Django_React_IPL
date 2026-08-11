import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminTeamDetails.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminTeamDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTeam();
    }, [id]);

    const loadTeam = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            const response = await axios.get(
                `${API_BASE_URL}/teams/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setTeam(response.data);

        } catch (err) {

            console.error("Team details error:", err);

            if (err.response?.status === 401) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("admin_logged_in");
                navigate("/admin-login");
                return;
            }

            setError("Unable to load team details.");

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setTeam((previous) => ({
            ...previous,
            [name]: value,
        }));

    };

    const handleUpdate = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("access_token");

        try {

            setSaving(true);
            setError("");

            await axios.put(
                `${API_BASE_URL}/teams/${id}/`,
                team,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Team updated successfully.");

            navigate("/admin/teams");

        } catch (err) {

            console.error("Update team error:", err);

            setError(
                err.response?.data?.detail ||
                "Unable to update team."
            );

        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this team?"
        );

        if (!confirmed) {
            return;
        }

        const token = localStorage.getItem("access_token");

        try {

            setDeleting(true);
            setError("");

            await axios.delete(
                `${API_BASE_URL}/teams/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Team deleted successfully.");

            navigate("/admin/teams");

        } catch (err) {

            console.error("Delete team error:", err);

            setError(
                err.response?.data?.detail ||
                "Unable to delete team."
            );

        } finally {
            setDeleting(false);
        }
    };

    if (loading) {
        return (
            <div className="admin-team-loading">
                <h2>🏏 Loading Team...</h2>
            </div>
        );
    }

    if (!team) {
        return (
            <div className="admin-team-loading">
                <h2>Team not found.</h2>

                <Link to="/admin/teams">
                    ← Back to Teams
                </Link>
            </div>
        );
    }

    return (
        <div className="admin-team-details-page">

            <header className="admin-team-header">

                <div>
                    <h1>🏏 CricketHub Admin</h1>
                    <p>Team Management</p>
                </div>

                <Link
                    to="/admin/teams"
                    className="back-button"
                >
                    ← Teams
                </Link>

            </header>

            <main className="admin-team-content">

                <div className="team-heading">

                    <div>
                        <span>TEAM MANAGEMENT</span>

                        <h2>
                            {team.full_name ||
                                team.name ||
                                "Team"}
                        </h2>

                        <p>
                            Edit or remove this IPL team.
                        </p>
                    </div>

                    <strong>
                        {team.short_name || "N/A"}
                    </strong>

                </div>

                {error && (
                    <div className="team-error">
                        {error}
                    </div>
                )}

                <form
                    className="team-form"
                    onSubmit={handleUpdate}
                >

                    <div className="form-group">

                        <label>
                            Team Name
                        </label>

                        <input
                            type="text"
                            name="full_name"
                            value={team.full_name || ""}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Short Name
                        </label>

                        <input
                            type="text"
                            name="short_name"
                            value={team.short_name || ""}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Captain
                        </label>

                        <input
                            type="text"
                            name="captain"
                            value={team.captain || ""}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Coach
                        </label>

                        <input
                            type="text"
                            name="coach"
                            value={team.coach || ""}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-group">

                        <label>
                            Home Ground
                        </label>

                        <input
                            type="text"
                            name="home_ground"
                            value={team.home_ground || ""}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="form-actions">

                        <button
                            type="submit"
                            className="save-button"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save Changes"}
                        </button>

                        <button
                            type="button"
                            className="delete-button"
                            onClick={handleDelete}
                            disabled={deleting}
                        >
                            {deleting
                                ? "Deleting..."
                                : "Delete Team"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default AdminTeamDetails;