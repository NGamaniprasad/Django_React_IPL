import { Link } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
    return (
        <div className="admin-dashboard">

            {/* Header */}
            <header className="admin-header">

                <div>
                    <h1>🏏 CricketHub Admin</h1>

                    <p>
                        Administration Dashboard
                    </p>
                </div>

                <Link
                    to="/"
                    className="back-home-btn"
                >
                    ← Home
                </Link>

            </header>


            {/* Main Content */}
            <main className="admin-main">

                <section className="dashboard-intro">

                    <span className="dashboard-label">
                        ADMIN PANEL
                    </span>

                    <h2>
                        CricketHub Management
                    </h2>

                    <p>
                        Manage teams, players, tournaments,
                        matches, points table and statistics.
                    </p>

                </section>


                {/* Management Cards */}
                <section className="admin-grid">

                    {/* Teams */}
                    <Link
                        to="/admin/teams"
                        className="admin-card"
                    >
                        <div className="card-icon">
                            🏏
                        </div>

                        <div>
                            <h3>
                                Manage Teams
                            </h3>

                            <p>
                                Add, edit and delete IPL teams.
                            </p>
                        </div>

                        <span className="card-arrow">
                            →
                        </span>
                    </Link>


                    {/* Players */}
                    <Link
                        to="/admin/players"
                        className="admin-card"
                    >
                        <div className="card-icon">
                            👤
                        </div>

                        <div>
                            <h3>
                                Manage Players
                            </h3>

                            <p>
                                Manage players and team assignments.
                            </p>
                        </div>

                        <span className="card-arrow">
                            →
                        </span>
                    </Link>


                    {/* Tournaments */}
                    <Link
                        to="/admin/tournaments"
                        className="admin-card"
                    >
                        <div className="card-icon">
                            🏆
                        </div>

                        <div>
                            <h3>
                                Manage Tournaments
                            </h3>

                            <p>
                                Add and manage IPL seasons.
                            </p>
                        </div>

                        <span className="card-arrow">
                            →
                        </span>
                    </Link>


                    {/* Matches */}
                    <Link
                        to="/admin/matches"
                        className="admin-card"
                    >
                        <div className="card-icon">
                            📅
                        </div>

                        <div>
                            <h3>
                                Manage Matches
                            </h3>

                            <p>
                                Create and manage tournament fixtures.
                            </p>
                        </div>

                        <span className="card-arrow">
                            →
                        </span>
                    </Link>


                    {/* Points Table */}
                    <Link
                        to="/admin/points-table"
                        className="admin-card"
                    >
                        <div className="card-icon">
                            📊
                        </div>

                        <div>
                            <h3>
                                Manage Points Table
                            </h3>

                            <p>
                                Manage team standings and points.
                            </p>
                        </div>

                        <span className="card-arrow">
                            →
                        </span>
                    </Link>


                    {/* Statistics */}
                    <Link
                        to="/admin/statistics"
                        className="admin-card"
                    >
                        <div className="card-icon">
                            📈
                        </div>

                        <div>
                            <h3>
                                Manage Statistics
                            </h3>

                            <p>
                                Manage player and team statistics.
                            </p>
                        </div>

                        <span className="card-arrow">
                            →
                        </span>
                    </Link>

                </section>


                {/* Quick Links */}
                <section className="quick-section">

                    <h2>
                        Quick Actions
                    </h2>

                    <div className="quick-links">

                        <Link to="/admin/teams">
                            + Add / Manage Teams
                        </Link>

                        <Link to="/admin/players">
                            + Add / Manage Players
                        </Link>

                        <Link to="/admin/tournaments">
                            + Add Tournament
                        </Link>

                        <Link to="/admin/matches">
                            + Add Match
                        </Link>

                        <Link to="/admin/points-table">
                            + Manage Points Table
                        </Link>

                        <Link to="/admin/statistics">
                            + Manage Statistics
                        </Link>

                    </div>

                </section>

            </main>


            {/* Footer */}
            <footer className="admin-footer">

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

export default AdminDashboard;