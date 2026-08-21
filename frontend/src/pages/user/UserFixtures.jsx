//import { useEffect, useState } from "react";
//import { Link, useNavigate } from "react-router-dom";
//import axios from "axios";
////import "./Fixtures.css";
//
//const API_BASE_URL = "http://127.0.0.1:8000/api";
//
//function Fixtures() {
//
//    const navigate = useNavigate();
//
//    const [matches, setMatches] = useState([]);
//    const [loading, setLoading] = useState(true);
//    const [error, setError] = useState("");
//
//    const [search, setSearch] = useState("");
//    const [statusFilter, setStatusFilter] = useState("");
//    const [dateFilter, setDateFilter] = useState("");
//
//    useEffect(() => {
//        loadMatches();
//    }, []);
//
//    const loadMatches = async () => {
//
//        const token = localStorage.getItem("access_token");
//
//        if (!token) {
//            navigate("/login");
//            return;
//        }
//
//        try {
//
//            setLoading(true);
//            setError("");
//
//            const response = await axios.get(
//                `${API_BASE_URL}/matches/`,
//                {
//                    headers: {
//                        Authorization: `Bearer ${token}`,
//                    },
//                }
//            );
//
//            const data = response.data;
//
//            setMatches(
//                Array.isArray(data)
//                    ? data
//                    : data.results || []
//            );
//
//        } catch (err) {
//
//            console.error(
//                "Fixtures error:",
//                err
//            );
//
//            if (err.response?.status === 401) {
//
//                localStorage.removeItem(
//                    "access_token"
//                );
//
//                localStorage.removeItem(
//                    "refresh_token"
//                );
//
//                navigate("/login");
//                return;
//            }
//
//            setError(
//                "Unable to load fixtures."
//            );
//
//        } finally {
//
//            setLoading(false);
//        }
//    };
//
//
//    const filteredMatches = matches.filter(
//        (match) => {
//
//            const team1 =
//                match.team1?.name ||
//                match.team1_name ||
//                "";
//
//            const team2 =
//                match.team2?.name ||
//                match.team2_name ||
//                "";
//
//            const venue =
//                match.venue || "";
//
//            const searchText =
//                `${team1} ${team2} ${venue}`
//                    .toLowerCase();
//
//            const matchesSearch =
//                searchText.includes(
//                    search.toLowerCase()
//                );
//
//            const matchesStatus =
//                !statusFilter ||
//                match.status === statusFilter;
//
//            const matchesDate =
//                !dateFilter ||
//                match.match_date === dateFilter;
//
//            return (
//                matchesSearch &&
//                matchesStatus &&
//                matchesDate
//            );
//        }
//    );
//
//
//    const getTeamName = (team) => {
//
//        if (!team) {
//            return "TBD";
//        }
//
//        if (typeof team === "string") {
//            return team;
//        }
//
//        return (
//            team.name ||
//            team.full_name ||
//            team.short_name ||
//            "TBD"
//        );
//    };
//
//
//    const getStatusClass = (status) => {
//
//        if (!status) {
//            return "status-default";
//        }
//
//        switch (status.toUpperCase()) {
//
//            case "LIVE":
//                return "status-live";
//
//            case "COMPLETED":
//                return "status-completed";
//
//            case "UPCOMING":
//                return "status-upcoming";
//
//            default:
//                return "status-default";
//        }
//    };
//
//
//    if (loading) {
//
//        return (
//            <div className="fixtures-loading">
//
//                <div className="fixtures-logo">
//                    🏏
//                </div>
//
//                <h2>
//                    Loading Fixtures...
//                </h2>
//
//            </div>
//        );
//    }
//
//
//    return (
//        <div className="fixtures-page">
//
//            {/* Header */}
//
//            <header className="fixtures-header">
//
//                <div className="fixtures-brand">
//
//                    <Link to="/">
//                        🏏 CricketHub
//                    </Link>
//
//                </div>
//
//            </header>
//
//
//            {/* Navigation */}
//
//            <nav className="fixtures-nav">
//
//                <Link to="/user/dashboard">
//                    Dashboard
//                </Link>
//
//                <Link to="/user/teams">
//                    Teams
//                </Link>
//
//                <Link
//                    to="/user/fixtures"
//                    className="active"
//                >
//                    Fixtures
//                </Link>
//
//                <Link to="/user/statistics">
//                    Statistics
//                </Link>
//
//                <Link to="/user/points-table">
//                    Points Table
//                </Link>
//
//            </nav>
//
//
//            <main className="fixtures-content">
//
//                {/* Page Header */}
//
//                <section className="fixtures-title">
//
//                    <div>
//
//                        <span>
//                            IPL MATCHES
//                        </span>
//
//                        <h1>
//                            Fixtures
//                        </h1>
//
//                        <p>
//                            View upcoming and completed
//                            IPL matches.
//                        </p>
//
//                    </div>
//
//                    <div className="fixture-count">
//
//                        <strong>
//                            {filteredMatches.length}
//                        </strong>
//
//                        <small>
//                            Matches
//                        </small>
//
//                    </div>
//
//                </section>
//
//
//                {/* Filters */}
//
//                <section className="fixtures-filters">
//
//                    <div className="filter-group">
//
//                        <label>
//                            Search
//                        </label>
//
//                        <input
//                            type="text"
//                            value={search}
//                            onChange={(e) =>
//                                setSearch(e.target.value)
//                            }
//                            placeholder="Team or venue..."
//                        />
//
//                    </div>
//
//
//                    <div className="filter-group">
//
//                        <label>
//                            Status
//                        </label>
//
//                        <select
//                            value={statusFilter}
//                            onChange={(e) =>
//                                setStatusFilter(
//                                    e.target.value
//                                )
//                            }
//                        >
//
//                            <option value="">
//                                All Status
//                            </option>
//
//                            <option value="UPCOMING">
//                                Upcoming
//                            </option>
//
//                            <option value="LIVE">
//                                Live
//                            </option>
//
//                            <option value="COMPLETED">
//                                Completed
//                            </option>
//
//                        </select>
//
//                    </div>
//
//
//                    <div className="filter-group">
//
//                        <label>
//                            Date
//                        </label>
//
//                        <input
//                            type="date"
//                            value={dateFilter}
//                            onChange={(e) =>
//                                setDateFilter(
//                                    e.target.value
//                                )
//                            }
//                        />
//
//                    </div>
//
//
//                    <button
//                        className="clear-filter"
//                        onClick={() => {
//                            setSearch("");
//                            setStatusFilter("");
//                            setDateFilter("");
//                        }}
//                    >
//                        Clear
//                    </button>
//
//                </section>
//
//
//                {/* Error */}
//
//                {error && (
//
//                    <div className="fixtures-error">
//                        {error}
//                    </div>
//
//                )}
//
//
//                {/* Fixtures */}
//
//                {filteredMatches.length === 0 ? (
//
//                    <section className="no-fixtures">
//
//                        <div>
//                            🏏
//                        </div>
//
//                        <h2>
//                            No Fixtures Found
//                        </h2>
//
//                        <p>
//                            There are currently no matches
//                            matching your filters.
//                        </p>
//
//                    </section>
//
//                ) : (
//
//                    <section className="fixtures-table-card">
//
//                        <div className="fixtures-table-wrapper">
//
//                            <table>
//
//                                <thead>
//
//                                    <tr>
//
//                                        <th>
//                                            Match
//                                        </th>
//
//                                        <th>
//                                            Teams
//                                        </th>
//
//                                        <th>
//                                            Date
//                                        </th>
//
//                                        <th>
//                                            Time
//                                        </th>
//
//                                        <th>
//                                            Venue
//                                        </th>
//
//                                        <th>
//                                            Status
//                                        </th>
//
//                                        <th>
//                                            Winner
//                                        </th>
//
//                                    </tr>
//
//                                </thead>
//
//
//                                <tbody>
//
//                                    {filteredMatches.map(
//                                        (match) => (
//
//                                            <tr
//                                                key={match.id}
//                                            >
//
//                                                <td>
//
//                                                    <strong>
//                                                        {match.match_number
//                                                            ? `Match ${match.match_number}`
//                                                            : `Match #${match.id}`}
//                                                    </strong>
//
//                                                    {match.tournament && (
//
//                                                        <small>
//                                                            {
//                                                                match.tournament.name ||
//                                                                match.tournament.season ||
//                                                                ""
//                                                            }
//                                                        </small>
//
//                                                    )}
//
//                                                </td>
//
//
//                                                <td>
//
//                                                    <div className="teams-cell">
//
//                                                        <strong>
//                                                            {
//                                                                getTeamName(
//                                                                    match.team1
//                                                                )
//                                                            }
//                                                        </strong>
//
//                                                        <span>
//                                                            VS
//                                                        </span>
//
//                                                        <strong>
//                                                            {
//                                                                getTeamName(
//                                                                    match.team2
//                                                                )
//                                                            }
//                                                        </strong>
//
//                                                    </div>
//
//                                                </td>
//
//
//                                                <td>
//                                                    {match.match_date ||
//                                                        "TBD"}
//                                                </td>
//
//
//                                                <td>
//                                                    {match.match_time ||
//                                                        "TBD"}
//                                                </td>
//
//
//                                                <td>
//                                                    {match.venue ||
//                                                        "TBD"}
//                                                </td>
//
//
//                                                <td>
//
//                                                    <span
//                                                        className={
//                                                            `fixture-status ${getStatusClass(
//                                                                match.status
//                                                            )}`
//                                                        }
//                                                    >
//                                                        {
//                                                            match.status ||
//                                                            "TBD"
//                                                        }
//                                                    </span>
//
//                                                </td>
//
//
//                                                <td>
//
//                                                    {match.winner
//                                                        ? getTeamName(
//                                                            match.winner
//                                                        )
//                                                        : "—"}
//
//                                                </td>
//
//                                            </tr>
//
//                                        )
//                                    )}
//
//                                </tbody>
//
//                            </table>
//
//                        </div>
//
//                    </section>
//
//                )}
//
//
//                <div className="fixtures-back">
//
//                    <Link to="/user/dashboard">
//                        ← Back to Dashboard
//                    </Link>
//
//                </div>
//
//            </main>
//
//
//            {/* Footer */}
//
//            <footer className="fixtures-footer">
//
//                <p>
//                    © 2026 CricketHub IPL Manager.
//                    All rights reserved.
//                </p>
//
//                <div>
//
//                    <Link to="/about">
//                        About
//                    </Link>
//
//                    <Link to="/terms">
//                        Terms of Use
//                    </Link>
//
//                    <Link to="/privacy">
//                        Privacy Policy
//                    </Link>
//
//                </div>
//
//            </footer>
//
//        </div>
//    );
//}
//
//export default Fixtures;


import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import "./Fixtures.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function Fixtures() {

    const navigate = useNavigate();

    const [matches, setMatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("");
    const [dateFilter, setDateFilter] = useState("");

    useEffect(() => {
        loadMatches();
    }, []);

    /* ================= LOAD MATCHES ================= */

    const loadMatches = async () => {

        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/login");
            return;
        }

        try {

            setLoading(true);
            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/matches/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            console.log("MATCH API RESPONSE:", data);

            setMatches(
                Array.isArray(data)
                    ? data
                    : data.results || []
            );

        } catch (err) {

            console.error(
                "Fixtures error:",
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

                navigate("/login");
                return;
            }

            setError(
                err.response?.data?.detail ||
                "Unable to load fixtures."
            );

        } finally {

            setLoading(false);
        }
    };


    /* ================= TEAM NAME ================= */

    const getTeamName = (
        team,
        teamName
    ) => {

        /*
         * Django MatchSerializer returns:
         *
         * team1      -> team ID
         * team1_name -> team name
         *
         * team2      -> team ID
         * team2_name -> team name
         */

        if (teamName) {
            return teamName;
        }

        if (!team) {
            return "TBD";
        }

        /*
         * If backend sends a team object
         */

        if (typeof team === "object") {

            return (
                team.name ||
                team.full_name ||
                team.short_name ||
                "TBD"
            );
        }

        /*
         * If backend sends a string
         */

        if (typeof team === "string") {
            return team;
        }

        return "TBD";
    };


    /* ================= FILTER MATCHES ================= */

    const filteredMatches = matches.filter(
        (match) => {

            const team1 =
                getTeamName(
                    match.team1,
                    match.team1_name
                );

            const team2 =
                getTeamName(
                    match.team2,
                    match.team2_name
                );

            const venue =
                match.venue || "";

            const tournament =
                match.tournament_name || "";

            const searchText =
                `${team1} ${team2} ${venue} ${tournament}`
                    .toLowerCase();

            const matchesSearch =
                searchText.includes(
                    search.toLowerCase()
                );

            const matchesStatus =
                !statusFilter ||
                match.status === statusFilter;

            const matchesDate =
                !dateFilter ||
                match.match_date === dateFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesDate
            );
        }
    );


    /* ================= STATUS CLASS ================= */

    const getStatusClass = (status) => {

        if (!status) {
            return "status-default";
        }

        switch (
            status.toUpperCase()
        ) {

            case "LIVE":
                return "status-live";

            case "COMPLETED":
                return "status-completed";

            case "UPCOMING":
                return "status-upcoming";

            case "CANCELLED":
                return "status-cancelled";

            default:
                return "status-default";
        }
    };


    /* ================= STATUS TEXT ================= */

    const getStatusText = (status) => {

        if (!status) {
            return "TBD";
        }

        switch (
            status.toUpperCase()
        ) {

            case "LIVE":
                return "LIVE";

            case "COMPLETED":
                return "Completed";

            case "UPCOMING":
                return "Upcoming";

            case "CANCELLED":
                return "Cancelled";

            default:
                return status;
        }
    };


    /* ================= FORMAT DATE ================= */

    const formatDate = (date) => {

        if (!date) {
            return "TBD";
        }

        const dateObject =
            new Date(`${date}T00:00:00`);

        if (
            Number.isNaN(
                dateObject.getTime()
            )
        ) {
            return date;
        }

        return dateObject.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };


    /* ================= FORMAT TIME ================= */

    const formatTime = (time) => {

        if (!time) {
            return "TBD";
        }

        const timeParts =
            time.split(":");

        if (
            timeParts.length < 2
        ) {
            return time;
        }

        const hours =
            Number(timeParts[0]);

        const minutes =
            Number(timeParts[1]);

        const date =
            new Date();

        date.setHours(
            hours,
            minutes,
            0,
            0
        );

        return date.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        );
    };


    /* ================= CLEAR FILTERS ================= */

    const clearFilters = () => {

        setSearch("");
        setStatusFilter("");
        setDateFilter("");
    };


    /* ================= LOADING ================= */

    if (loading) {

        return (
            <div className="fixtures-loading">

                <div className="fixtures-logo">
                    🏏
                </div>

                <h2>
                    Loading Fixtures...
                </h2>

            </div>
        );
    }


    /* ================= PAGE ================= */

    return (

        <div className="fixtures-page">

            {/* ================= HEADER ================= */}

            <header className="fixtures-header">

                <div className="fixtures-brand">

                    <Link to="/">
                        🏏 CricketHub
                    </Link>

                </div>

            </header>


            {/* ================= NAVIGATION ================= */}

            <nav className="fixtures-nav">

                <Link to="/user/dashboard">
                    Dashboard
                </Link>

                <Link to="/user/teams">
                    Teams
                </Link>

                <Link
                    to="/user/fixtures"
                    className="active"
                >
                    Fixtures
                </Link>

                <Link to="/user/statistics">
                    Statistics
                </Link>

                <Link to="/user/points-table">
                    Points Table
                </Link>

            </nav>


            {/* ================= MAIN ================= */}

            <main className="fixtures-content">

                {/* ================= PAGE HEADER ================= */}

                <section className="fixtures-title">

                    <div>

                        <span>
                            IPL MATCHES
                        </span>

                        <h1>
                            Fixtures
                        </h1>

                        <p>
                            View upcoming, live and
                            completed IPL matches.
                        </p>

                    </div>

                    <div className="fixture-count">

                        <strong>
                            {filteredMatches.length}
                        </strong>

                        <small>
                            Matches
                        </small>

                    </div>

                </section>


                {/* ================= FILTERS ================= */}

                <section className="fixtures-filters">

                    {/* SEARCH */}

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
                            placeholder="Team, tournament or venue..."
                        />

                    </div>


                    {/* STATUS */}

                    <div className="filter-group">

                        <label>
                            Status
                        </label>

                        <select
                            value={statusFilter}
                            onChange={(e) =>
                                setStatusFilter(
                                    e.target.value
                                )
                            }
                        >

                            <option value="">
                                All Status
                            </option>

                            <option value="UPCOMING">
                                Upcoming
                            </option>

                            <option value="LIVE">
                                Live
                            </option>

                            <option value="COMPLETED">
                                Completed
                            </option>

                            <option value="CANCELLED">
                                Cancelled
                            </option>

                        </select>

                    </div>


                    {/* DATE */}

                    <div className="filter-group">

                        <label>
                            Date
                        </label>

                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) =>
                                setDateFilter(
                                    e.target.value
                                )
                            }
                        />

                    </div>


                    {/* CLEAR */}

                    <button
                        type="button"
                        className="clear-filter"
                        onClick={clearFilters}
                    >
                        Clear
                    </button>

                </section>


                {/* ================= ERROR ================= */}

                {error && (

                    <div className="fixtures-error">

                        {error}

                    </div>

                )}


                {/* ================= FIXTURES ================= */}

                {filteredMatches.length === 0 ? (

                    <section className="no-fixtures">

                        <div>
                            🏏
                        </div>

                        <h2>
                            No Fixtures Found
                        </h2>

                        <p>
                            There are currently no matches
                            matching your filters.
                        </p>

                    </section>

                ) : (

                    <section className="fixtures-table-card">

                        <div className="fixtures-table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>
                                            Match
                                        </th>

                                        <th>
                                            Teams
                                        </th>

                                        <th>
                                            Date
                                        </th>

                                        <th>
                                            Time
                                        </th>

                                        <th>
                                            Venue
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Winner
                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredMatches.map(
                                        (match) => (

                                            <tr
                                                key={
                                                    match.id
                                                }
                                            >

                                                {/* ================= MATCH ================= */}

                                                <td>

                                                    <strong>

                                                        {match.match_number
                                                            ? `Match ${match.match_number}`
                                                            : `Match #${match.id}`}

                                                    </strong>

                                                    {match.tournament_name && (

                                                        <small>

                                                            {
                                                                match.tournament_name
                                                            }

                                                        </small>

                                                    )}

                                                </td>


                                                {/* ================= TEAMS ================= */}

                                                <td>

                                                    <div className="teams-cell">

                                                        <strong>

                                                            {getTeamName(
                                                                match.team1,
                                                                match.team1_name
                                                            )}

                                                        </strong>

                                                        <span>
                                                            VS
                                                        </span>

                                                        <strong>

                                                            {getTeamName(
                                                                match.team2,
                                                                match.team2_name
                                                            )}

                                                        </strong>

                                                    </div>

                                                </td>


                                                {/* ================= DATE ================= */}

                                                <td>

                                                    {formatDate(
                                                        match.match_date
                                                    )}

                                                </td>


                                                {/* ================= TIME ================= */}

                                                <td>

                                                    {formatTime(
                                                        match.match_time
                                                    )}

                                                </td>


                                                {/* ================= VENUE ================= */}

                                                <td>

                                                    {match.venue ||
                                                        "TBD"}

                                                </td>


                                                {/* ================= STATUS ================= */}

                                                <td>

                                                    <span
                                                        className={
                                                            `fixture-status ${getStatusClass(
                                                                match.status
                                                            )}`
                                                        }
                                                    >

                                                        {
                                                            getStatusText(
                                                                match.status
                                                            )
                                                        }

                                                    </span>

                                                </td>


                                                {/* ================= WINNER ================= */}

                                                <td>

                                                    {match.winner_name ||
                                                        "—"}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    </section>

                )}


                {/* ================= BACK ================= */}

                <div className="fixtures-back">

                    <Link to="/user/dashboard">
                        ← Back to Dashboard
                    </Link>

                </div>

            </main>


            {/* ================= FOOTER ================= */}

            <footer className="fixtures-footer">

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

export default Fixtures;