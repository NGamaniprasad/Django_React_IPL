import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddPlayer.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AddPlayer() {

    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(false);
    const [teamsLoading, setTeamsLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
        team: "",
        name: "",
        role: "",
        nationality: "",
        date_of_birth: "",
        batting_style: "",
        bowling_style: "",
        jersey_number: "",
        matches: 0,
        runs: 0,
        wickets: 0,
        strike_rate: 0,
        batting_average: 0,
        economy: 0,
    });

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

            console.error("Load teams error:", err);

            setError(
                "Unable to load teams."
            );

        } finally {

            setTeamsLoading(false);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (!formData.team) {
            setError("Please select a team.");
            return;
        }

        if (!formData.name.trim()) {
            setError("Player name is required.");
            return;
        }

        if (!formData.role) {
            setError("Please select a player role.");
            return;
        }

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            setLoading(true);

            const payload = {
                team: Number(formData.team),
                name: formData.name.trim(),
                role: formData.role,
                nationality: formData.nationality.trim(),
                date_of_birth:
                    formData.date_of_birth || null,
                batting_style:
                    formData.batting_style.trim(),
                bowling_style:
                    formData.bowling_style.trim(),
                jersey_number:
                    formData.jersey_number
                        ? Number(formData.jersey_number)
                        : null,
                matches: Number(formData.matches) || 0,
                runs: Number(formData.runs) || 0,
                wickets: Number(formData.wickets) || 0,
                strike_rate:
                    Number(formData.strike_rate) || 0,
                batting_average:
                    Number(formData.batting_average) || 0,
                economy:
                    Number(formData.economy) || 0,
            };

            await axios.post(
                `${API_BASE_URL}/players/`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            setSuccess(
                "Player added successfully."
            );

            setTimeout(() => {
                navigate("/admin/players");
            }, 1000);

        } catch (err) {

            console.error(
                "Add player error:",
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

            const responseData =
                err.response?.data;

            if (responseData) {

                if (
                    typeof responseData ===
                    "object"
                ) {

                    const messages =
                        Object.entries(
                            responseData
                        )
                            .map(
                                ([field, message]) =>
                                    `${field}: ${
                                        Array.isArray(message)
                                            ? message.join(", ")
                                            : message
                                    }`
                            )
                            .join(" | ");

                    setError(
                        messages ||
                        "Unable to add player."
                    );

                } else {

                    setError(
                        String(responseData)
                    );
                }

            } else {

                setError(
                    "Unable to add player."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="add-player-page">

            <header className="add-player-header">

                <div>
                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Add New Player
                    </p>
                </div>

                <Link
                    to="/admin/players"
                    className="back-button"
                >
                    ← Players
                </Link>

            </header>


            <main className="add-player-content">

                <section className="add-player-card">

                    <div className="page-heading">

                        <span>
                            ADMINISTRATION
                        </span>

                        <h2>
                            Add Player
                        </h2>

                        <p>
                            Add a new player to an IPL team.
                        </p>

                    </div>


                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}


                    {success && (
                        <div className="form-success">
                            {success}
                        </div>
                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="player-form"
                    >

                        {/* Team */}

                        <div className="form-group">

                            <label>
                                Team *
                            </label>

                            <select
                                name="team"
                                value={formData.team}
                                onChange={handleChange}
                                disabled={teamsLoading}
                            >

                                <option value="">
                                    {teamsLoading
                                        ? "Loading teams..."
                                        : "Select Team"}
                                </option>

                                {teams.map((team) => (

                                    <option
                                        key={team.id}
                                        value={team.id}
                                    >
                                        {team.name ||
                                            team.full_name ||
                                            team.short_name}
                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* Name */}

                        <div className="form-group">

                            <label>
                                Player Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter player name"
                            />

                        </div>


                        {/* Role */}

                        <div className="form-group">

                            <label>
                                Role *
                            </label>

                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                            >

                                <option value="">
                                    Select Role
                                </option>

                                <option value="BATTER">
                                    Batter
                                </option>

                                <option value="BOWLER">
                                    Bowler
                                </option>

                                <option value="ALL_ROUNDER">
                                    All Rounder
                                </option>

                                <option value="WICKET_KEEPER">
                                    Wicket Keeper
                                </option>

                            </select>

                        </div>


                        {/* Nationality */}

                        <div className="form-group">

                            <label>
                                Nationality
                            </label>

                            <input
                                type="text"
                                name="nationality"
                                value={formData.nationality}
                                onChange={handleChange}
                                placeholder="Indian"
                            />

                        </div>


                        {/* Date of Birth */}

                        <div className="form-group">

                            <label>
                                Date of Birth
                            </label>

                            <input
                                type="date"
                                name="date_of_birth"
                                value={formData.date_of_birth}
                                onChange={handleChange}
                            />

                        </div>


                        {/* Batting Style */}

                        <div className="form-group">

                            <label>
                                Batting Style
                            </label>

                            <input
                                type="text"
                                name="batting_style"
                                value={formData.batting_style}
                                onChange={handleChange}
                                placeholder="Right Handed"
                            />

                        </div>


                        {/* Bowling Style */}

                        <div className="form-group">

                            <label>
                                Bowling Style
                            </label>

                            <input
                                type="text"
                                name="bowling_style"
                                value={formData.bowling_style}
                                onChange={handleChange}
                                placeholder="Right Arm Fast"
                            />

                        </div>


                        {/* Jersey */}

                        <div className="form-group">

                            <label>
                                Jersey Number
                            </label>

                            <input
                                type="number"
                                name="jersey_number"
                                value={formData.jersey_number}
                                onChange={handleChange}
                                min="1"
                                max="99"
                            />

                        </div>


                        {/* Matches */}

                        <div className="form-group">

                            <label>
                                Matches
                            </label>

                            <input
                                type="number"
                                name="matches"
                                value={formData.matches}
                                onChange={handleChange}
                                min="0"
                            />

                        </div>


                        {/* Runs */}

                        <div className="form-group">

                            <label>
                                Runs
                            </label>

                            <input
                                type="number"
                                name="runs"
                                value={formData.runs}
                                onChange={handleChange}
                                min="0"
                            />

                        </div>


                        {/* Wickets */}

                        <div className="form-group">

                            <label>
                                Wickets
                            </label>

                            <input
                                type="number"
                                name="wickets"
                                value={formData.wickets}
                                onChange={handleChange}
                                min="0"
                            />

                        </div>


                        {/* Strike Rate */}

                        <div className="form-group">

                            <label>
                                Strike Rate
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="strike_rate"
                                value={formData.strike_rate}
                                onChange={handleChange}
                                min="0"
                            />

                        </div>


                        {/* Batting Average */}

                        <div className="form-group">

                            <label>
                                Batting Average
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="batting_average"
                                value={formData.batting_average}
                                onChange={handleChange}
                                min="0"
                            />

                        </div>


                        {/* Economy */}

                        <div className="form-group">

                            <label>
                                Economy
                            </label>

                            <input
                                type="number"
                                step="0.01"
                                name="economy"
                                value={formData.economy}
                                onChange={handleChange}
                                min="0"
                            />

                        </div>


                        <div className="form-actions">

                            <Link
                                to="/admin/players"
                                className="cancel-button"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="save-button"
                                disabled={loading}
                            >
                                {loading
                                    ? "Saving..."
                                    : "Add Player"}
                            </button>

                        </div>

                    </form>

                </section>

            </main>

        </div>
    );
}

export default AddPlayer;