import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminStatistics.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AddStatistics() {

    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [player, setPlayer] = useState("");

    const [formData, setFormData] = useState({
        matches: 0,
        runs: 0,
        wickets: 0,
        strike_rate: 0,
        batting_average: 0,
        economy: 0,
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            const response = await axios.get(
                `${API_BASE_URL}/players/`,
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

            console.error(err);

            if (err.response?.status === 401) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                navigate("/login");
                return;
            }

            setError("Unable to load players.");

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
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!player) {
            setError("Please select a player.");
            return;
        }

        const token = localStorage.getItem("access_token");

        try {

            setSaving(true);
            setError("");

            await axios.patch(
                `${API_BASE_URL}/players/${player}/`,
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
                        "Content-Type": "application/json",
                    },
                }
            );

            navigate("/admin/statistics");

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.detail ||
                "Unable to save statistics."
            );

        } finally {
            setSaving(false);
        }
    };

    if (loading) {

        return (
            <div className="statistics-page">

                <div className="statistics-form-card">

                    <h2>
                        Loading players...
                    </h2>

                </div>

            </div>
        );
    }

    return (
        <div className="statistics-page">

            <header className="statistics-header">

                <div>

                    <span>
                        ADMIN PANEL
                    </span>

                    <h1>
                        Add Player Statistics
                    </h1>

                    <p>
                        Add performance statistics
                        for an existing player.
                    </p>

                </div>

                <Link
                    to="/admin/statistics"
                    className="back-btn"
                >
                    ← Statistics
                </Link>

            </header>


            <main className="statistics-form-card">

                {error && (
                    <div className="statistics-error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Player
                        </label>

                        <select
                            value={player}
                            onChange={(event) =>
                                setPlayer(event.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select Player
                            </option>

                            {players.map((item) => (

                                <option
                                    key={item.id}
                                    value={item.id}
                                >
                                    {item.name}
                                    {item.team_name
                                        ? ` - ${item.team_name}`
                                        : ""}
                                </option>

                            ))}

                        </select>

                    </div>


                    <div className="form-grid">

                        <div className="form-group">

                            <label>
                                Matches
                            </label>

                            <input
                                type="number"
                                name="matches"
                                min="0"
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
                                name="runs"
                                min="0"
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
                                name="wickets"
                                min="0"
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
                                name="strike_rate"
                                min="0"
                                step="0.01"
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
                                name="batting_average"
                                min="0"
                                step="0.01"
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
                                name="economy"
                                min="0"
                                step="0.01"
                                value={formData.economy}
                                onChange={handleChange}
                            />

                        </div>

                    </div>


                    <div className="form-actions">

                        <Link
                            to="/admin/statistics"
                            className="cancel-btn"
                        >
                            Cancel
                        </Link>

                        <button
                            type="submit"
                            className="save-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Add Statistics"}
                        </button>

                    </div>

                </form>

            </main>

        </div>
    );
}

export default AddStatistics;