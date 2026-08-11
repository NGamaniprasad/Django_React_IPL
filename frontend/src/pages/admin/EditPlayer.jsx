import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditPlayer.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function EditPlayer() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

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
        loadData();
    }, [id]);

    const loadData = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const [playerResponse, teamsResponse] =
                await Promise.all([
                    axios.get(
                        `${API_BASE_URL}/players/${id}/`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    ),

                    axios.get(
                        `${API_BASE_URL}/teams/`,
                        {
                            headers: {
                                Authorization:
                                    `Bearer ${token}`,
                            },
                        }
                    ),
                ]);

            const player = playerResponse.data;

            const teamsData = teamsResponse.data;

            setTeams(
                Array.isArray(teamsData)
                    ? teamsData
                    : teamsData.results || []
            );

            setFormData({
                team: player.team || "",
                name: player.name || "",
                role: player.role || "",
                nationality: player.nationality || "",
                date_of_birth:
                    player.date_of_birth || "",
                batting_style:
                    player.batting_style || "",
                bowling_style:
                    player.bowling_style || "",
                jersey_number:
                    player.jersey_number || "",
                matches:
                    player.matches ?? 0,
                runs:
                    player.runs ?? 0,
                wickets:
                    player.wickets ?? 0,
                strike_rate:
                    player.strike_rate ?? 0,
                batting_average:
                    player.batting_average ?? 0,
                economy:
                    player.economy ?? 0,
            });

        } catch (err) {

            console.error(
                "Load player error:",
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

            if (err.response?.status === 404) {
                setError("Player not found.");
            } else {
                setError(
                    "Unable to load player information."
                );
            }

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

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            setSaving(true);

            const payload = {
                team: Number(formData.team),

                name: formData.name.trim(),

                role: formData.role,

                nationality:
                    formData.nationality.trim(),

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

                matches:
                    Number(formData.matches) || 0,

                runs:
                    Number(formData.runs) || 0,

                wickets:
                    Number(formData.wickets) || 0,

                strike_rate:
                    Number(formData.strike_rate) || 0,

                batting_average:
                    Number(formData.batting_average) || 0,

                economy:
                    Number(formData.economy) || 0,
            };

            await axios.put(
                `${API_BASE_URL}/players/${id}/`,
                payload,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                        "Content-Type":
                            "application/json",
                    },
                }
            );

            setSuccess(
                "Player updated successfully."
            );

            setTimeout(() => {
                navigate("/admin/players");
            }, 1000);

        } catch (err) {

            console.error(
                "Update player error:",
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

            if (
                responseData &&
                typeof responseData === "object"
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
                    "Unable to update player."
                );

            } else {

                setError(
                    "Unable to update player."
                );
            }

        } finally {

            setSaving(false);
        }
    };

    if (loading) {

        return (
            <div className="edit-player-loading">

                <h2>
                    🏏 Loading Player...
                </h2>

            </div>
        );
    }

    return (
        <div className="edit-player-page">

            <header className="edit-player-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Edit Player
                    </p>

                </div>

                <Link
                    to="/admin/players"
                    className="back-button"
                >
                    ← Players
                </Link>

            </header>


            <main className="edit-player-content">

                <section className="edit-player-card">

                    <div className="page-heading">

                        <span>
                            ADMINISTRATION
                        </span>

                        <h2>
                            Edit Player
                        </h2>

                        <p>
                            Update player and performance
                            information.
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
                            >

                                <option value="">
                                    Select Team
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


                        {/* Player Name */}

                        <div className="form-group">

                            <label>
                                Player Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Player name"
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
                            />

                        </div>


                        {/* Jersey Number */}

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


                        {/* Buttons */}

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
                                disabled={saving}
                            >
                                {saving
                                    ? "Updating..."
                                    : "Update Player"}
                            </button>

                        </div>

                    </form>

                </section>

            </main>

        </div>
    );
}

export default EditPlayer;