import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Statistics.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function Statistics() {

    const navigate = useNavigate();

    const [statistics, setStatistics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadStatistics();
    }, []);

    const loadStatistics = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/stats/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setStatistics(response.data);

        } catch (err) {

            console.error(
                "Statistics error:",
                err
            );

            if (err.response?.status === 401) {

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
                err.response?.data?.detail ||
                "Unable to load statistics."
            );

        } finally {

            setLoading(false);
        }
    };


    const playerName = (player) => {

        return player?.name || "No Data";
    };


    const teamName = (player) => {

        return player?.team_name || "—";
    };


    const value = (
        player,
        field
    ) => {

        if (
            player?.[field] === null ||
            player?.[field] === undefined
        ) {
            return "—";
        }

        return player[field];
    };


    if (loading) {

        return (
            <div className="statistics-loading">

                <div className="statistics-loading-icon">
                    📊
                </div>

                <h2>
                    Loading Statistics...
                </h2>

            </div>
        );
    }


    return (

        <div className="statistics-page">

            {/* HEADER */}

            <header className="statistics-header">

                <div className="statistics-brand">

                    <Link to="/">
                        🏏 CricketHub
                    </Link>

                </div>

            </header>


            {/* NAVIGATION */}

            <nav className="statistics-nav">

                <Link to="/user/dashboard">
                    Dashboard
                </Link>

                <Link to="/user/teams">
                    Teams
                </Link>

                <Link to="/user/fixtures">
                    Fixtures
                </Link>

                <Link
                    to="/user/statistics"
                    className="active"
                >
                    Statistics
                </Link>

                <Link to="/user/points-table">
                    Points Table
                </Link>

            </nav>


            {/* MAIN */}

            <main className="statistics-content">

                <section className="statistics-title">

                    <div>

                        <span>
                            IPL PERFORMANCE
                        </span>

                        <h1>
                            Player Statistics
                        </h1>

                        <p>
                            Explore the best performing
                            players in CricketHub.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={loadStatistics}
                        className="statistics-refresh"
                    >
                        ↻ Refresh
                    </button>

                </section>


                {/* ERROR */}

                {error && (

                    <div className="statistics-error">
                        ⚠️ {error}
                    </div>

                )}


                {/* STATISTICS CARDS */}

                {statistics && (

                    <section className="statistics-grid">


                        {/* RUNS */}

                        <div className="stat-card">

                            <div className="stat-card-header">

                                <div className="stat-icon">
                                    🏏
                                </div>

                                <span>
                                    TOP RUN SCORER
                                </span>

                            </div>

                            <h2>
                                {
                                    playerName(
                                        statistics.top_run_scorer
                                    )
                                }
                            </h2>

                            <p className="stat-team">

                                {
                                    teamName(
                                        statistics.top_run_scorer
                                    )
                                }

                            </p>

                            <div className="stat-number">

                                {
                                    value(
                                        statistics.top_run_scorer,
                                        "runs"
                                    )
                                }

                                <small>
                                    Runs
                                </small>

                            </div>

                        </div>


                        {/* WICKETS */}

                        <div className="stat-card">

                            <div className="stat-card-header">

                                <div className="stat-icon">
                                    🎯
                                </div>

                                <span>
                                    TOP WICKET TAKER
                                </span>

                            </div>

                            <h2>
                                {
                                    playerName(
                                        statistics.top_wicket_taker
                                    )
                                }
                            </h2>

                            <p className="stat-team">

                                {
                                    teamName(
                                        statistics.top_wicket_taker
                                    )
                                }

                            </p>

                            <div className="stat-number">

                                {
                                    value(
                                        statistics.top_wicket_taker,
                                        "wickets"
                                    )
                                }

                                <small>
                                    Wickets
                                </small>

                            </div>

                        </div>


                        {/* AVERAGE */}

                        <div className="stat-card">

                            <div className="stat-card-header">

                                <div className="stat-icon">
                                    📈
                                </div>

                                <span>
                                    BEST BATTING AVERAGE
                                </span>

                            </div>

                            <h2>
                                {
                                    playerName(
                                        statistics.best_batting_average
                                    )
                                }
                            </h2>

                            <p className="stat-team">

                                {
                                    teamName(
                                        statistics.best_batting_average
                                    )
                                }

                            </p>

                            <div className="stat-number">

                                {
                                    value(
                                        statistics.best_batting_average,
                                        "batting_average"
                                    )
                                }

                                <small>
                                    Average
                                </small>

                            </div>

                        </div>


                        {/* STRIKE RATE */}

                        <div className="stat-card">

                            <div className="stat-card-header">

                                <div className="stat-icon">
                                    ⚡
                                </div>

                                <span>
                                    BEST STRIKE RATE
                                </span>

                            </div>

                            <h2>
                                {
                                    playerName(
                                        statistics.best_strike_rate
                                    )
                                }
                            </h2>

                            <p className="stat-team">

                                {
                                    teamName(
                                        statistics.best_strike_rate
                                    )
                                }

                            </p>

                            <div className="stat-number">

                                {
                                    value(
                                        statistics.best_strike_rate,
                                        "strike_rate"
                                    )
                                }

                                <small>
                                    Strike Rate
                                </small>

                            </div>

                        </div>


                        {/* ECONOMY */}

                        <div className="stat-card">

                            <div className="stat-card-header">

                                <div className="stat-icon">
                                    🛡️
                                </div>

                                <span>
                                    BEST ECONOMY
                                </span>

                            </div>

                            <h2>
                                {
                                    playerName(
                                        statistics.best_economy
                                    )
                                }
                            </h2>

                            <p className="stat-team">

                                {
                                    teamName(
                                        statistics.best_economy
                                    )
                                }

                            </p>

                            <div className="stat-number">

                                {
                                    value(
                                        statistics.best_economy,
                                        "economy"
                                    )
                                }

                                <small>
                                    Economy
                                </small>

                            </div>

                        </div>

                    </section>
                )}


                <div className="statistics-back">

                    <Link to="/user/dashboard">
                        ← Back to Dashboard
                    </Link>

                </div>

            </main>


            {/* FOOTER */}

            <footer className="statistics-footer">

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

export default Statistics;