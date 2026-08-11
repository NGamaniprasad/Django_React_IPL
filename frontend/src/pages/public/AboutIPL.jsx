import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./AboutIPL.css";

function AboutIPL() {
    return (
        <>
            <Navbar />

            <main className="about-ipl-page">

                {/* ================= HERO ================= */}

                <section className="about-ipl-hero">

                    <div className="about-ipl-hero-content">

                        <span>
                            CRICKET TOURNAMENT
                        </span>

                        <h1>
                            About the IPL
                        </h1>

                        <p>
                            Understanding the world's most popular
                            franchise-based T20 cricket competition.
                        </p>

                    </div>

                </section>


                {/* ================= INTRODUCTION ================= */}

                <section className="about-ipl-section">

                    <div className="about-ipl-heading">

                        <span>
                            INTRODUCTION
                        </span>

                        <h2>
                            Indian Premier League
                        </h2>

                    </div>

                    <div className="about-ipl-card">

                        <p>
                            The Indian Premier League (IPL) is a professional
                            Twenty20 cricket league in which franchise teams
                            compete during a tournament season.
                        </p>

                        <p>
                            The competition combines high-level cricket,
                            international and domestic players, franchise
                            teams and a fast-paced T20 format. Each season
                            consists of league-stage matches followed by
                            the qualification stages and the final.
                        </p>

                        <p>
                            The IPL has become one of the most recognized
                            cricket competitions in the world and provides
                            a platform where players from different cricketing
                            backgrounds compete together.
                        </p>

                    </div>

                </section>


                {/* ================= T20 FORMAT ================= */}

                <section className="about-ipl-section">

                    <div className="about-ipl-heading">

                        <span>
                            THE FORMAT
                        </span>

                        <h2>
                            Fast-Paced T20 Cricket
                        </h2>

                    </div>

                    <div className="about-ipl-feature-grid">

                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                🏏
                            </div>

                            <h3>
                                Twenty20 Format
                            </h3>

                            <p>
                                Each team normally faces a maximum of
                                20 overs in an innings, making matches
                                shorter and highly competitive.
                            </p>

                        </div>


                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                🏆
                            </div>

                            <h3>
                                League Competition
                            </h3>

                            <p>
                                Teams compete throughout the league stage
                                to earn points and improve their position
                                in the standings.
                            </p>

                        </div>


                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                ⚡
                            </div>

                            <h3>
                                Competitive Matches
                            </h3>

                            <p>
                                Every match can influence the points table,
                                qualification chances and tournament
                                momentum.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= TEAMS ================= */}

                <section className="about-ipl-section">

                    <div className="about-ipl-heading">

                        <span>
                            FRANCHISE TEAMS
                        </span>

                        <h2>
                            Teams and Players
                        </h2>

                    </div>

                    <div className="about-ipl-card">

                        <p>
                            IPL franchises build their squads by selecting
                            and signing players through the league's
                            player acquisition and auction processes.
                        </p>

                        <p>
                            A squad can include specialist batters,
                            bowlers, all-rounders and wicket-keepers.
                            Players can have different responsibilities
                            depending on the team's strategy and match
                            conditions.
                        </p>

                        <p>
                            CricketHub organizes team information so users
                            can explore teams and view their players in a
                            structured way.
                        </p>

                    </div>

                </section>


                {/* ================= MATCHES ================= */}

                <section className="about-ipl-section">

                    <div className="about-ipl-heading">

                        <span>
                            MATCHES
                        </span>

                        <h2>
                            Fixtures and Results
                        </h2>

                    </div>

                    <div className="about-ipl-feature-grid">

                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                📅
                            </div>

                            <h3>
                                Fixtures
                            </h3>

                            <p>
                                Fixtures contain important match information
                                such as participating teams, date, time,
                                venue and tournament details.
                            </p>

                        </div>


                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                🟢
                            </div>

                            <h3>
                                Match Status
                            </h3>

                            <p>
                                Matches can be categorized as upcoming,
                                live, completed or cancelled depending
                                on their current status.
                            </p>

                        </div>


                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                📋
                            </div>

                            <h3>
                                Results
                            </h3>

                            <p>
                                Completed matches can contain the result,
                                winning team and other information used
                                by the application.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= POINTS TABLE ================= */}

                <section className="about-ipl-section">

                    <div className="about-ipl-heading">

                        <span>
                            STANDINGS
                        </span>

                        <h2>
                            Points Table
                        </h2>

                    </div>

                    <div className="about-ipl-card">

                        <p>
                            The points table provides a structured view
                            of team performance during a tournament.
                        </p>

                        <div className="points-info-grid">

                            <div>
                                <strong>Matches</strong>
                                <span>Matches played</span>
                            </div>

                            <div>
                                <strong>Wins</strong>
                                <span>Matches won</span>
                            </div>

                            <div>
                                <strong>Losses</strong>
                                <span>Matches lost</span>
                            </div>

                            <div>
                                <strong>NR</strong>
                                <span>No results</span>
                            </div>

                            <div>
                                <strong>PTS</strong>
                                <span>Total points</span>
                            </div>

                            <div>
                                <strong>NRR</strong>
                                <span>Net run rate</span>
                            </div>

                        </div>

                        <p className="points-note">
                            In the CricketHub application, points are
                            calculated according to the configured
                            tournament rules, normally using wins and
                            no-result outcomes.
                        </p>

                    </div>

                </section>


                {/* ================= STATISTICS ================= */}

                <section className="about-ipl-section">

                    <div className="about-ipl-heading">

                        <span>
                            PERFORMANCE
                        </span>

                        <h2>
                            Player Statistics
                        </h2>

                    </div>

                    <div className="about-ipl-feature-grid">

                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                🏃
                            </div>

                            <h3>
                                Batting
                            </h3>

                            <p>
                                Batting information can include matches,
                                runs, batting average and strike rate.
                            </p>

                        </div>


                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                🎯
                            </div>

                            <h3>
                                Bowling
                            </h3>

                            <p>
                                Bowling information can include wickets
                                and economy rate along with other
                                performance data.
                            </p>

                        </div>


                        <div className="about-ipl-feature-card">

                            <div className="about-ipl-icon">
                                📊
                            </div>

                            <h3>
                                Performance Analysis
                            </h3>

                            <p>
                                Statistics help users compare player
                                performances and understand individual
                                contributions.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= CRICKETHUB ================= */}

                <section className="about-ipl-section cricket-hub-section">

                    <div className="about-ipl-heading">

                        <span>
                            ABOUT CRICKETHUB
                        </span>

                        <h2>
                            Why CricketHub?
                        </h2>

                    </div>

                    <div className="about-ipl-card cricket-hub-card">

                        <p>
                            CricketHub is an independent educational and
                            portfolio project designed to demonstrate how
                            a modern full-stack cricket management platform
                            can be developed.
                        </p>

                        <p>
                            The application brings together teams, players,
                            tournaments, fixtures, points tables and
                            statistics in one structured platform.
                        </p>

                        <p>
                            Registered users can explore available cricket
                            information, while authorized administrators
                            can manage application data through a dedicated
                            administration interface.
                        </p>

                        <p>
                            The project demonstrates concepts including
                            authentication, role-based authorization,
                            REST APIs, database management, CRUD operations
                            and modern React-based user interfaces.
                        </p>

                    </div>

                </section>


                {/* ================= DISCLAIMER ================= */}

                <section className="about-ipl-disclaimer">

                    <h3>
                        Educational Project
                    </h3>

                    <p>
                        CricketHub is an independent educational and
                        portfolio application. It is not affiliated with,
                        sponsored by, or endorsed by the Indian Premier
                        League, BCCI, or any IPL franchise.
                    </p>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default AboutIPL;