//import React, { useEffect, useState } from "react";
//import {
//    Link,
//    useParams
//} from "react-router-dom";
//
//import teamService from "../../services/teamService";
//
//import "../../styles/user-teams.css";
//
//function TeamPlayers() {
//
//    const { id } = useParams();
//
//    const [players, setPlayers] = useState([]);
//
//    const [loading, setLoading] = useState(true);
//
//    const [error, setError] = useState("");
//
//
//    useEffect(() => {
//
//        loadPlayers();
//
//    }, [id]);
//
//
//    const loadPlayers = async () => {
//
//        try {
//
//            setLoading(true);
//            setError("");
//
//            const response =
//                await teamService.getTeamPlayers(id);
//
//            const data =
//                response.data.results ||
//                response.data ||
//                [];
//
//            setPlayers(data);
//
//        } catch (error) {
//
//            console.error(
//                "Team players error:",
//                error
//            );
//
//            setError(
//                "Unable to load team players."
//            );
//
//        } finally {
//
//            setLoading(false);
//
//        }
//
//    };
//
//
//    return (
//
//        <div className="user-teams-page">
//
//            <nav className="dashboard-navbar">
//
//                <Link
//                    to="/user/dashboard"
//                    className="dashboard-logo"
//                >
//                    🏏 CricketHub
//                </Link>
//
//                <div className="dashboard-nav-links">
//
//                    <Link to="/user/dashboard">
//                        Dashboard
//                    </Link>
//
//                    <Link
//                        to="/user/teams"
//                        className="active-link"
//                    >
//                        Teams
//                    </Link>
//
//                    <Link to="/user/fixtures">
//                        Fixtures
//                    </Link>
//
//                    <Link to="/user/matches">
//                        Matches
//                    </Link>
//
//                    <Link to="/user/statistics">
//                        Statistics
//                    </Link>
//
//                    <Link to="/user/points-table">
//                        Points Table
//                    </Link>
//
//                    <Link to="/user/history">
//                        Tournament History
//                    </Link>
//
//                    <Link to="/user/downloads">
//                        Downloads
//                    </Link>
//
//                    <Link to="/user/profile">
//                        Profile
//                    </Link>
//
//                </div>
//
//            </nav>
//
//
//            <main className="team-players-content">
//
//                <Link
//                    to={`/user/teams/${id}`}
//                    className="back-link"
//                >
//                    ← Back to Team
//                </Link>
//
//
//                <div className="teams-header">
//
//                    <p className="page-label">
//                        TEAM SQUAD
//                    </p>
//
//                    <h1>
//                        Players
//                    </h1>
//
//                    <p>
//                        Players belonging to the
//                        selected team.
//                    </p>
//
//                </div>
//
//
//                {loading && (
//
//                    <div className="loading-message">
//                        Loading players...
//                    </div>
//
//                )}
//
//
//                {error && (
//
//                    <div className="teams-error">
//                        {error}
//                    </div>
//
//                )}
//
//
//                {!loading &&
//                    !error &&
//                    players.length === 0 && (
//
//                        <div className="empty-message">
//                            No players found for this team.
//                        </div>
//
//                    )}
//
//
//                {!loading &&
//                    !error &&
//                    players.length > 0 && (
//
//                        <div className="players-grid">
//
//                            {players.map(player => (
//
//                                <Link
//                                    key={player.id}
//                                    to={`/user/players/${player.id}`}
//                                    className="player-card"
//                                >
//
//                                    <div className="player-image">
//
//                                        {player.image ? (
//
//                                            <img
//                                                src={player.image}
//                                                alt={player.name}
//                                            />
//
//                                        ) : (
//
//                                            <span>
//                                                🏏
//                                            </span>
//
//                                        )}
//
//                                    </div>
//
//
//                                    <div>
//
//                                        <h2>
//                                            {player.name}
//                                        </h2>
//
//                                        <p>
//                                            {player.role}
//                                        </p>
//
//                                        <span>
//                                            View Profile →
//                                        </span>
//
//                                    </div>
//
//                                </Link>
//
//                            ))}
//
//                        </div>
//
//                    )}
//
//            </main>
//
//
//            <footer className="dashboard-footer">
//
//                <div>
//                    🏏 <strong>
//                        CricketHub IPL Manager
//                    </strong>
//                </div>
//
//                <p>
//                    © 2026 CricketHub IPL Manager.
//                    All rights reserved.
//                </p>
//
//            </footer>
//
//        </div>
//
//    );
//
//}
//
//export default TeamPlayers;

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./TeamPlayers.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function TeamPlayers() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [players, setPlayers] = useState([]);
    const [team, setTeam] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTeamAndPlayers();
    }, [id]);

    const getToken = () => {
        return localStorage.getItem("access_token");
    };

    const apiConfig = () => ({
        headers: {
            Authorization:
                `Bearer ${getToken()}`,
        },
    });

    const loadTeamAndPlayers = async () => {

        const token = getToken();

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            /*
             * Get team information
             */
            const teamResponse = await axios.get(
                `${API_BASE_URL}/teams/${id}/`,
                apiConfig()
            );

            setTeam(teamResponse.data);


            /*
             * Get ONLY this team's players
             */
            const playersResponse = await axios.get(
                `${API_BASE_URL}/players/team/${id}/`,
                apiConfig()
            );

            /*
             * DRF pagination support
             *
             * If pagination is enabled:
             * response.data.results
             *
             * If pagination is disabled:
             * response.data
             */
            const playerData =
                Array.isArray(playersResponse.data)
                    ? playersResponse.data
                    : playersResponse.data.results || [];

            setPlayers(playerData);

        } catch (err) {

            console.error(
                "Team players error:",
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

            if (err.response?.status === 404) {

                setError(
                    "Team or players not found."
                );

            } else {

                setError(
                    "Unable to load team players."
                );
            }

        } finally {

            setLoading(false);
        }
    };


    if (loading) {

        return (
            <div className="players-loading">

                <div className="loading-logo">
                    🏏
                </div>

                <h2>
                    Loading Players...
                </h2>

            </div>
        );
    }


    if (error) {

        return (
            <div className="players-error">

                <div>
                    ⚠️
                </div>

                <h2>
                    {error}
                </h2>

                <Link to={`/user/teams/${id}`}>
                    ← Back to Team
                </Link>

            </div>
        );
    }


    return (
        <div className="team-players-page">

            {/* Header */}

            <header className="players-header">

                <div className="players-brand">

                    <Link to="/">
                        🏏 CricketHub
                    </Link>

                </div>

            </header>


            {/* Navigation */}

            <nav className="players-nav">

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


            <main className="players-content">

                {/* Breadcrumb */}

                <div className="players-breadcrumb">

                    <Link to="/user/teams">
                        Teams
                    </Link>

                    <span>/</span>

                    <Link to={`/user/teams/${id}`}>
                        {team?.name ||
                            team?.full_name ||
                            "Team"}
                    </Link>

                    <span>/</span>

                    <span>
                        Players
                    </span>

                </div>


                {/* Page Header */}

                <section className="players-page-header">

                    <div>

                        <span className="players-label">
                            TEAM SQUAD
                        </span>

                        <h1>
                            {team?.name ||
                                team?.full_name ||
                                "Team"} Players
                        </h1>

                        <p>
                            Complete player information
                            for this team.
                        </p>

                    </div>

                    <div className="player-count">

                        <strong>
                            {players.length}
                        </strong>

                        <span>
                            Players
                        </span>

                    </div>

                </section>


                {/* Players */}

                {players.length === 0 ? (

                    <section className="no-players">

                        <div>
                            🏏
                        </div>

                        <h2>
                            No Players Found
                        </h2>

                        <p>
                            No players have been added
                            to this team yet.
                        </p>

                    </section>

                ) : (

                    <section className="players-table-section">

                        <div className="table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            #
                                        </th>

                                        <th>
                                            Player
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Nationality
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
                                            Batting Avg
                                        </th>

                                        <th>
                                            Economy
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {players.map(
                                        (player, index) => (

                                            <tr
                                                key={player.id}
                                            >

                                                <td>
                                                    {index + 1}
                                                </td>

                                                <td>

                                                    <div className="player-name">

                                                        {player.photo ? (

                                                            <img
                                                                src={
                                                                    player.photo.startsWith(
                                                                        "http"
                                                                    )
                                                                        ? player.photo
                                                                        : `http://127.0.0.1:8000${player.photo}`
                                                                }
                                                                alt={
                                                                    player.name
                                                                }
                                                            />

                                                        ) : (

                                                            <div className="player-avatar">
                                                                👤
                                                            </div>

                                                        )}

                                                        <strong>
                                                            {
                                                                player.name
                                                            }
                                                        </strong>

                                                    </div>

                                                </td>


                                                <td>

                                                    <span className="role-badge">

                                                        {
                                                            player.role ||
                                                            "—"
                                                        }

                                                    </span>

                                                </td>


                                                <td>
                                                    {
                                                        player.nationality ||
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
                                                        "—"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        player.batting_average ??
                                                        "—"
                                                    }
                                                </td>


                                                <td>
                                                    {
                                                        player.economy ??
                                                        "—"
                                                    }
                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>
                )}


                {/* Back */}

                <div className="players-back">

                    <Link
                        to={`/user/teams/${id}`}
                    >
                        ← Back to Team
                    </Link>

                </div>

            </main>


            {/* Footer */}

            <footer className="players-footer">

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

export default TeamPlayers;