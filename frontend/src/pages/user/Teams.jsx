import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Teams.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function Teams() {

    const navigate = useNavigate();

    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTeams();
    }, []);

    const loadTeams = async () => {

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/teams/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setTeams(
                data.results || data
            );

        } catch (err) {

            console.error(
                "Teams loading error:",
                err
            );

            if (
                err.response?.status === 401
            ) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                navigate("/login");
                return;
            }

            setError(
                "Unable to load teams."
            );

        } finally {

            setLoading(false);

        }
    };

    const getLogoUrl = (logo) => {

        if (!logo) {
            return null;
        }

        if (logo.startsWith("http")) {
            return logo;
        }

        return `http://127.0.0.1:8000${logo}`;
    };

    if (loading) {

        return (
            <div className="teams-loading">

                <div className="teams-loading-icon">
                    🏏
                </div>

                <h2>
                    Loading Teams...
                </h2>

                <p>
                    Fetching IPL team information.
                </p>

            </div>
        );
    }

    return (
        <div className="teams-page">

            {/* Header */}

            <header className="teams-header">

                <div className="teams-brand">
                    <Link to="/">
                        🏏 CricketHub
                    </Link>
                </div>

                <div className="teams-header-actions">

                    <Link to="/user/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/user/profile">
                        Profile
                    </Link>

                </div>

            </header>


            {/* Navigation */}

            <nav className="teams-nav">

                <Link to="/user/dashboard">
                    Dashboard
                </Link>

                <Link
                    to="/user/teams"
                    className="active"
                >
                    Teams
                </Link>

                <Link to="/user/fixtures">
                    Fixtures
                </Link>

                <Link to="/user/statistics">
                    Statistics
                </Link>

                <Link to="/user/points-table">
                    Points Table
                </Link>

                <Link to="/user/downloads">
                    Downloads
                </Link>

            </nav>


            {/* Content */}

            <main className="teams-content">

                <div className="teams-title">

                    <div>

                        <span className="teams-label">
                            IPL TEAMS
                        </span>

                        <h1>
                            Teams
                        </h1>

                        <p>
                            Explore the ten IPL
                            franchises and view
                            their team information.
                        </p>

                    </div>

                    <div className="teams-count">

                        <strong>
                            {teams.length}
                        </strong>

                        <span>
                            Teams
                        </span>

                    </div>

                </div>


                {error && (

                    <div className="teams-error">
                        {error}
                    </div>

                )}


                {/* Teams */}

                {teams.length === 0 ? (

                    <div className="teams-empty">

                        <div>
                            🏏
                        </div>

                        <h2>
                            No Teams Available
                        </h2>

                        <p>
                            Team information has
                            not been added yet.
                        </p>

                    </div>

                ) : (

                    <div className="teams-grid">

                        {teams.map((team) => {

                            const logo =
                                getLogoUrl(
                                    team.logo
                                );

                            return (

                                <article
                                    className="team-card"
                                    key={team.id}
                                >

                                    <div className="team-logo-container">

                                        {logo ? (

                                            <img
                                                src={logo}
                                                alt={
                                                    team.name ||
                                                    team.full_name ||
                                                    "Team"
                                                }
                                                className="team-logo"
                                            />

                                        ) : (

                                            <div className="team-logo-placeholder">
                                                🏏
                                            </div>

                                        )}

                                    </div>


                                    <div className="team-card-content">

                                        <span className="team-short-name">

                                            {team.short_name ||
                                                "IPL"}

                                        </span>

                                        <h2>

                                            {team.name ||
                                                team.full_name ||
                                                "Team"}

                                        </h2>


                                        {team.captain && (

                                            <div className="team-info">

                                                <span>
                                                    Captain
                                                </span>

                                                <strong>
                                                    {team.captain}
                                                </strong>

                                            </div>

                                        )}


                                        {team.coach && (

                                            <div className="team-info">

                                                <span>
                                                    Coach
                                                </span>

                                                <strong>
                                                    {team.coach}
                                                </strong>

                                            </div>

                                        )}


                                        {team.home_ground && (

                                            <div className="team-info">

                                                <span>
                                                    Home Ground
                                                </span>

                                                <strong>
                                                    {team.home_ground}
                                                </strong>

                                            </div>

                                        )}


                                        <Link
                                            to={`/user/teams/${team.id}`}
                                            className="view-team-button"
                                        >
                                            View Team
                                            <span>
                                                →
                                            </span>
                                        </Link>

                                    </div>

                                </article>

                            );

                        })}

                    </div>

                )}

            </main>


            {/* Footer */}

            <footer className="teams-footer">

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

export default Teams;