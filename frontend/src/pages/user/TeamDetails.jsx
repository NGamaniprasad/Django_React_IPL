import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TeamDetails.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function TeamDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTeam();
    }, [id]);

    const loadTeam = async () => {

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
                `${API_BASE_URL}/teams/${id}/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setTeam(response.data);

        } catch (err) {

            console.error(
                "Team details error:",
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

            if (
                err.response?.status === 404
            ) {
                setError("Team not found.");
            } else {
                setError(
                    "Unable to load team information."
                );
            }

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
            <div className="team-details-loading">
                <div>🏏</div>
                <h2>Loading Team...</h2>
            </div>
        );
    }

    if (error) {

        return (
            <div className="team-details-error-page">

                <div className="error-icon">
                    ⚠️
                </div>

                <h2>
                    {error}
                </h2>

                <Link to="/user/teams">
                    ← Back to Teams
                </Link>

            </div>
        );
    }

    const logo = getLogoUrl(team?.logo);

    return (
        <div className="team-details-page">

            {/* Header */}

            <header className="team-details-header">

                <div className="team-details-brand">

                    <Link to="/">
                        🏏 CricketHub
                    </Link>

                </div>

                <div className="team-details-actions">

                    <Link to="/user/dashboard">
                        Dashboard
                    </Link>

                    <Link to="/user/teams">
                        Teams
                    </Link>

                </div>

            </header>


            {/* Navigation */}

            <nav className="team-details-nav">

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

                <Link to="/user/points-table">
                    Points Table
                </Link>

            </nav>


            <main className="team-details-content">

                {/* Breadcrumb */}

                <div className="team-breadcrumb">

                    <Link to="/user/teams">
                        Teams
                    </Link>

                    <span>
                        /
                    </span>

                    <span>
                        {team?.name ||
                            team?.full_name}
                    </span>

                </div>


                {/* Team Hero */}

                <section className="team-hero">

                    <div className="team-hero-logo">

                        {logo ? (

                            <img
                                src={logo}
                                alt={
                                    team?.name ||
                                    "Team logo"
                                }
                            />

                        ) : (

                            <div>
                                🏏
                            </div>

                        )}

                    </div>


                    <div className="team-hero-info">

                        <span className="team-label">
                            IPL FRANCHISE
                        </span>

                        <h1>
                            {team?.name ||
                                team?.full_name ||
                                "Team"}
                        </h1>

                        <div className="team-short">

                            {team?.short_name ||
                                "IPL"}

                        </div>

                        <p>
                            Official team information
                            including captain, coach and
                            home ground.
                        </p>

                    </div>

                </section>


                {/* Team Information */}

                <section className="team-information">

                    <div className="section-heading">

                        <span>
                            TEAM INFORMATION
                        </span>

                        <h2>
                            Team Details
                        </h2>

                    </div>


                    <div className="information-grid">

                        <div className="information-card">

                            <span>
                                Team Name
                            </span>

                            <strong>
                                {team?.name ||
                                    team?.full_name ||
                                    "—"}
                            </strong>

                        </div>


                        <div className="information-card">

                            <span>
                                Short Name
                            </span>

                            <strong>
                                {team?.short_name ||
                                    "—"}
                            </strong>

                        </div>


                        <div className="information-card">

                            <span>
                                Captain
                            </span>

                            <strong>
                                {team?.captain ||
                                    "Not available"}
                            </strong>

                        </div>


                        <div className="information-card">

                            <span>
                                Coach
                            </span>

                            <strong>
                                {team?.coach ||
                                    "Not available"}
                            </strong>

                        </div>


                        <div className="information-card">

                            <span>
                                Home Ground
                            </span>

                            <strong>
                                {team?.home_ground ||
                                    "Not available"}
                            </strong>

                        </div>

                    </div>

                </section>


                {/* Players Action */}

                <section className="players-action">

                    <div>

                        <span>
                            SQUAD
                        </span>

                        <h2>
                            Team Players
                        </h2>

                        <p>
                            View the players belonging
                            to this team.
                        </p>

                    </div>

                    <Link
                        to={`/user/teams/${team.id}/players`}
                        className="players-button"
                    >
                        View Players
                        <span>→</span>
                    </Link>

                </section>


                {/* Back */}

                <div className="back-section">

                    <Link to="/user/teams">
                        ← Back to All Teams
                    </Link>

                </div>

            </main>


            <footer className="team-details-footer">

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

export default TeamDetails;