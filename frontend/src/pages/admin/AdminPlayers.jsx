import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminPlayers.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminPlayers() {

    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("");

    useEffect(() => {
        loadPlayers();
    }, []);

    const loadPlayers = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }

        try {

            setLoading(true);
            setError("");

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

            console.error("Admin players error:", err);

            if (err.response?.status === 401) {

                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                localStorage.removeItem("admin_logged_in");

                navigate("/admin-login");
                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to load players."
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

        const token = localStorage.getItem("access_token");

        try {

            await axios.delete(
                `${API_BASE_URL}/players/${id}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setPlayers((previous) =>
                previous.filter(
                    (player) => player.id !== id
                )
            );

        } catch (err) {

            console.error(
                "Delete player error:",
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
                err.response?.data?.detail ||
                "Unable to delete player."
            );
        }
    };


    const filteredPlayers = players.filter(
        (player) => {

            const searchText = `
                ${player.name || ""}
                ${player.team_name || ""}
                ${player.team_short_name || ""}
                ${player.nationality || ""}
            `.toLowerCase();

            const matchesSearch =
                searchText.includes(
                    search.toLowerCase()
                );

            const matchesRole =
                !roleFilter ||
                player.role === roleFilter;

            return (
                matchesSearch &&
                matchesRole
            );
        }
    );


    if (loading) {

        return (
            <div className="admin-players-loading">

                <h2>
                    🏏 Loading Players...
                </h2>

            </div>
        );
    }


    return (
        <div className="admin-players-page">

            {/* HEADER */}

            <header className="admin-players-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Player Management
                    </p>

                </div>

                <Link
                    to="/admin/dashboard"
                    className="admin-dashboard-button"
                >
                    ← Dashboard
                </Link>

            </header>


            <main className="admin-players-content">

                {/* TITLE */}

                <section className="players-title">

                    <div>

                        <span>
                            ADMINISTRATION
                        </span>

                        <h2>
                            Manage Players
                        </h2>

                        <p>
                            Add, update and remove IPL
                            player information.
                        </p>

                    </div>

                    <div className="players-count">

                        <strong>
                            {filteredPlayers.length}
                        </strong>

                        <small>
                            Players
                        </small>

                    </div>

                </section>


                {/* FILTERS */}

                <section className="players-filters">

                    <div className="filter-group">

                        <label>
                            Search
                        </label>

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search player, team..."
                        />

                    </div>


                    <div className="filter-group">

                        <label>
                            Role
                        </label>

                        <select
                            value={roleFilter}
                            onChange={(e) =>
                                setRoleFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Roles
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


                    <button
                        className="clear-filter-button"
                        onClick={() => {
                            setSearch("");
                            setRoleFilter("");
                        }}
                    >
                        Clear
                    </button>


                    <Link
                        to="/admin/players/add"
                        className="add-player-button"
                    >
                        + Add Player
                    </Link>

                </section>


                {/* ERROR */}

                {error && (

                    <div className="players-error">
                        {error}
                    </div>

                )}


                {/* TABLE */}

                {filteredPlayers.length === 0 ? (

                    <section className="no-players">

                        <div>
                            🏏
                        </div>

                        <h2>
                            No Players Found
                        </h2>

                        <p>
                            No players match your
                            current filters.
                        </p>

                    </section>

                ) : (

                    <section className="players-table-card">

                        <div className="players-table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Player
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Team
                                        </th>

                                        <th>
                                            Jersey
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
                                            Economy
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredPlayers.map(
                                        (player) => (

                                            <tr
                                                key={
                                                    player.id
                                                }
                                            >

                                                <td>
                                                    {player.id}
                                                </td>


                                                <td>

                                                    <strong>
                                                        {
                                                            player.name ||
                                                            "N/A"
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            player.nationality ||
                                                            ""
                                                        }
                                                    </small>

                                                </td>


                                                <td>
                                                    {
                                                        player.role ||
                                                        "N/A"
                                                    }
                                                </td>


                                                <td>

                                                    {
                                                        player.team_name ||
                                                        player.team_short_name ||
                                                        "N/A"
                                                    }

                                                </td>


                                                <td>
                                                    {
                                                        player.jersey_number ??
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
                                                        0
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        player.economy ??
                                                        0
                                                    }
                                                </td>


                                                <td>

                                                    <div className="player-actions">

                                                        <Link
                                                            to={`/admin/players/${player.id}/edit`}
                                                            className="edit-player-button"
                                                        >
                                                            Edit
                                                        </Link>

                                                        <button
                                                            className="delete-player-button"
                                                            onClick={() =>
                                                                handleDelete(
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

            </main>

        </div>
    );
}

export default AdminPlayers;