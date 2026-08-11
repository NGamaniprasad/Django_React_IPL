import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dashboardService from "../../services/dashboardService";

import "../../styles/user-dashboard.css";

function UserDashboard() {

    const [dashboardData, setDashboardData] = useState({
        teams: 0,
        players: 0,
        matches: 0,
        tournament: "No active tournament",
        upcomingMatch: null,
    });

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const username =
        localStorage.getItem("username") || "User";


    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const [
                teamsResponse,
                playersResponse,
                tournamentsResponse,
                matchesResponse
            ] = await Promise.all([
                dashboardService.getTeams(),
                dashboardService.getPlayers(),
                dashboardService.getTournaments(),
                dashboardService.getMatches(),
            ]);


            const teams =
                teamsResponse.data.results ||
                teamsResponse.data ||
                [];

            const players =
                playersResponse.data.results ||
                playersResponse.data ||
                [];

            const tournaments =
                tournamentsResponse.data.results ||
                tournamentsResponse.data ||
                [];

            const matches =
                matchesResponse.data.results ||
                matchesResponse.data ||
                [];


            const activeTournament =
                tournaments.find(
                    tournament =>
                        tournament.status === "ONGOING"
                );


            const upcomingMatch =
                matches.find(
                    match =>
                        match.status === "UPCOMING"
                );


            setDashboardData({

                teams: teams.length,

                players: players.length,

                matches: matches.length,

                tournament:
                    activeTournament
                        ? `${activeTournament.name} ${activeTournament.season}`
                        : "No active tournament",

                upcomingMatch,

            });

        } catch (err) {

            console.error(
                "Dashboard loading error:",
                err
            );

            setError(
                "Unable to load dashboard information."
            );

        } finally {

            setLoading(false);

        }

    };


    const handleLogout = () => {

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        localStorage.removeItem("username");

        window.location.href = "/login";

    };


    return (

        <div className="user-dashboard">

            {/* Navbar */}

            <nav className="dashboard-navbar">

                <div className="dashboard-logo">
                    🏏 CricketHub
                </div>


                <div className="dashboard-nav-links">

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

                    <Link
    to="/user/profile/edit"
    className="edit-profile-btn"
>
    👤 Edit Profile
</Link>

                    <Link to="/user/downloads">
                        Downloads
                    </Link>

                   <Link
    to="/user/change-password"
    className="dashboard-action-btn"
>
    🔐 Change Password
</Link>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* Main */}

            <main className="dashboard-content">


                {/* Welcome */}

                <section className="welcome-section">

                    <p className="dashboard-label">
                        USER DASHBOARD
                    </p>

                    <h1>
                        Welcome, {username} 👋
                    </h1>

                    <p>
                        Explore IPL teams, players,
                        fixtures, matches and
                        tournament statistics.
                    </p>

                </section>


                {/* Error */}

                {error && (

                    <div className="dashboard-error">
                        {error}
                    </div>

                )}


                {/* Summary */}

                <section className="summary-grid">


                    <div className="summary-card">

                        <span>🏆</span>

                        <h3>
                            Current Tournament
                        </h3>

                        <p>

                            {loading
                                ? "Loading..."
                                : dashboardData.tournament}

                        </p>

                    </div>


                    <div className="summary-card">

                        <span>👥</span>

                        <h3>
                            Total Teams
                        </h3>

                        <p>

                            {loading
                                ? "..."
                                : dashboardData.teams}

                        </p>

                    </div>


                    <div className="summary-card">

                        <span>🏏</span>

                        <h3>
                            Total Players
                        </h3>

                        <p>

                            {loading
                                ? "..."
                                : dashboardData.players}

                        </p>

                    </div>


                    <div className="summary-card">

                        <span>📅</span>

                        <h3>
                            Total Matches
                        </h3>

                        <p>

                            {loading
                                ? "..."
                                : dashboardData.matches}

                        </p>

                    </div>


                </section>


                {/* Quick Navigation */}

                <section className="dashboard-section">

                    <div className="section-heading">

                        <h2>
                            Explore CricketHub
                        </h2>

                        <p>
                            Access IPL information and
                            tournament data.
                        </p>

                    </div>


                    <div className="feature-grid">


                        <Link
                            to="/user/teams"
                            className="feature-card"
                        >

                            <span>👥</span>

                            <h3>
                                Teams
                            </h3>

                            <p>
                                Explore teams and view
                                team-wise players.
                            </p>

                        </Link>


                        <Link
                            to="/user/fixtures"
                            className="feature-card"
                        >

                            <span>📅</span>

                            <h3>
                                Fixtures
                            </h3>

                            <p>
                                View upcoming and
                                completed fixtures.
                            </p>

                        </Link>


                        <Link
                            to="/user/matches"
                            className="feature-card"
                        >

                            <span>🏏</span>

                            <h3>
                                Matches
                            </h3>

                            <p>
                                View match results,
                                scores and details.
                            </p>

                        </Link>


                        <Link
                            to="/user/statistics"
                            className="feature-card"
                        >

                            <span>📊</span>

                            <h3>
                                Statistics
                            </h3>

                            <p>
                                Explore player and
                                team performance.
                            </p>

                        </Link>


                        <Link
                            to="/user/points-table"
                            className="feature-card"
                        >

                            <span>🏆</span>

                            <h3>
                                Points Table
                            </h3>

                            <p>
                                Check tournament
                                standings.
                            </p>

                        </Link>


                        <Link
                            to="/user/history"
                            className="feature-card"
                        >

                            <span>📚</span>

                            <h3>
                                Tournament History
                            </h3>

                            <p>
                                Browse previous
                                IPL seasons.
                            </p>

                        </Link>


                    </div>

                </section>


                {/* Upcoming Match */}

                <section className="dashboard-panel">

                    <div>

                        <span className="panel-label">
                            UPCOMING MATCH
                        </span>

                        <h2>
                            {loading
                                ? "Loading..."
                                : dashboardData.upcomingMatch
                                    ? `${dashboardData.upcomingMatch.team1_name || "Team 1"} vs ${dashboardData.upcomingMatch.team2_name || "Team 2"}`
                                    : "No upcoming match"}
                        </h2>

                        <p>

                            {dashboardData.upcomingMatch
                                ? `${dashboardData.upcomingMatch.venue || "Venue not available"}`
                                : "Upcoming fixture information will appear here."}

                        </p>

                    </div>


                    <Link
                        to="/user/fixtures"
                        className="panel-button"
                    >
                        View Fixtures
                    </Link>

                </section>


                {/* Statistics */}

                <section className="dashboard-panel">

                    <div>

                        <span className="panel-label">
                            PERFORMANCE
                        </span>

                        <h2>
                            IPL Statistics
                        </h2>

                        <p>
                            View top run scorers,
                            wicket takers, strike rates
                            and team performance.
                        </p>

                    </div>


                    <Link
                        to="/user/statistics"
                        className="panel-button"
                    >
                        View Statistics
                    </Link>

                </section>


            </main>


            {/* Footer */}

            <footer className="dashboard-footer">

                <div>
                    🏏 <strong>
                        CricketHub IPL Manager
                    </strong>
                </div>

                <p>
                    Manage • Track • Analyze
                </p>

                <p>
                    © 2026 CricketHub IPL Manager.
                    All rights reserved.
                </p>

            </footer>

        </div>

    );

}

export default UserDashboard;