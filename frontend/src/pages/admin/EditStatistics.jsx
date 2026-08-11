import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditStatistics.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function EditStatistics() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [player, setPlayer] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        matches: 0,
        runs: 0,
        wickets: 0,
        strike_rate: 0,
        batting_average: 0,
        economy: 0,
    });


    useEffect(() => {
        loadPlayer();
    }, [id]);


    const loadPlayer = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            const response = await axios.get(
                `${API_BASE_URL}/admin/statistics/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setPlayer(data);

            setFormData({
                matches: data.matches ?? 0,
                runs: data.runs ?? 0,
                wickets: data.wickets ?? 0,
                strike_rate: data.strike_rate ?? 0,
                batting_average: data.batting_average ?? 0,
                economy: data.economy ?? 0,
            });

        } catch (err) {

            console.error(
                "Load statistics error:",
                err
            );

            setError(
                err.response?.data?.detail ||
                "Unable to load player statistics."
            );

        } finally {

            setLoading(false);
        }
    };


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        const token = localStorage.getItem("access_token");

        try {

            setSaving(true);
            setError("");

            await axios.patch(
                `${API_BASE_URL}/admin/statistics/${id}/`,
                {
                    matches: Number(formData.matches),
                    runs: Number(formData.runs),
                    wickets: Number(formData.wickets),
                    strike_rate: Number(formData.strike_rate),
                    batting_average: Number(
                        formData.batting_average
                    ),
                    economy: Number(formData.economy),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            navigate("/admin/statistics");

        } catch (err) {

            console.error(
                "Update statistics error:",
                err
            );

            setError(
                err.response?.data?.detail ||
                "Unable to update statistics."
            );

        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (
            <div className="edit-stat-loading">
                Loading...
            </div>
        );
    }


    return (

        <div className="edit-stat-page">

            <header className="edit-stat-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Edit Player Statistics
                    </p>

                </div>

                <Link
                    to="/admin/statistics"
                    className="edit-stat-back-btn"
                >
                    ← Statistics
                </Link>

            </header>


            <main className="edit-stat-content">

                <section className="edit-stat-card">

                    <div className="edit-stat-title">

                        <span>
                            PLAYER STATISTICS
                        </span>

                        <h2>
                            {player?.name}
                        </h2>

                        <p>
                            {player?.team_name || "No Team"}
                        </p>

                    </div>


                    {error && (

                        <div className="edit-stat-error">
                            ⚠️ {error}
                        </div>

                    )}


                    <form onSubmit={handleSubmit}>

                        <div className="edit-stat-grid">

                            <div className="form-group">

                                <label>
                                    Matches
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="matches"
                                    value={formData.matches}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Runs
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="runs"
                                    value={formData.runs}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Wickets
                                </label>

                                <input
                                    type="number"
                                    min="0"
                                    name="wickets"
                                    value={formData.wickets}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Strike Rate
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="strike_rate"
                                    value={formData.strike_rate}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Batting Average
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="batting_average"
                                    value={formData.batting_average}
                                    onChange={handleChange}
                                />

                            </div>


                            <div className="form-group">

                                <label>
                                    Economy
                                </label>

                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="economy"
                                    value={formData.economy}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>


                        <div className="edit-stat-actions">

                            <Link
                                to="/admin/statistics"
                                className="cancel-stat-btn"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                disabled={saving}
                                className="save-stat-btn"
                            >
                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}
                            </button>

                        </div>

                    </form>

                </section>

            </main>

        </div>
    );
}

export default EditStatistics;