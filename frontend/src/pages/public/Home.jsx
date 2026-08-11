import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import TeamCard from "../../components/common/TeamCard";

const teams = [
    "Chennai Super Kings",
    "Mumbai Indians",
    "Royal Challengers Bengaluru",
    "Kolkata Knight Riders",
    "Sunrisers Hyderabad",
    "Rajasthan Royals",
    "Delhi Capitals",
    "Punjab Kings",
    "Gujarat Titans",
    "Lucknow Super Giants",
];

function Home() {
    return (
        <div className="home-page">

            <Navbar />

            <main>

                {/* ================= HERO ================= */}

                <section className="hero">

                    <div className="hero-content">

                        <span className="hero-badge">
                            IPL INFORMATION & MANAGEMENT PLATFORM
                        </span>

                        <h1>
                            CricketHub
                            <br />
                            IPL Manager
                        </h1>

                        <p className="hero-tagline">
                            Manage • Track • Analyze
                        </p>

                        <p className="hero-description">
                            Explore the world of IPL through a modern,
                            secure and organized cricket information
                            and management platform.
                        </p>

                    </div>

                    <div className="hero-visual">

                        <div className="cricket-orbit">

                            <div className="cricket-ball">
                                🏏
                            </div>

                            <span className="orbit-text orbit-top">
                                MANAGE
                            </span>

                            <span className="orbit-text orbit-left">
                                TRACK
                            </span>

                            <span className="orbit-text orbit-right">
                                ANALYZE
                            </span>

                        </div>

                    </div>

                </section>


                {/* ================= ABOUT IPL ================= */}

                <section className="section">

                    <div className="section-heading">

                        <span>
                            ABOUT IPL
                        </span>

                        <h2>
                            The World of T20 Cricket
                        </h2>

                    </div>

                    <div className="info-card">

                        <p>
                            The Indian Premier League is a professional
                            Twenty20 cricket competition featuring
                            franchise-based teams and players from
                            different cricketing backgrounds.
                        </p>

                        <p>
                            A tournament season includes teams,
                            scheduled matches, player performances,
                            statistics, standings and results.
                        </p>

                        <p>
                            CricketHub presents this information in a
                            structured and easy-to-explore platform
                            created for educational and portfolio purposes.
                        </p>

                    </div>

                </section>


                {/* ================= TEAMS ================= */}

                <section className="section teams-section">

                    <div className="section-heading">

                        <span>
                            IPL TEAMS
                        </span>

                        <h2>
                            The Ten Teams
                        </h2>

                        <p>
                            Teams represented in the CricketHub platform.
                        </p>

                    </div>

                    <div className="teams-grid">

                        {teams.map((team) => (
                            <TeamCard
                                key={team}
                                name={team}
                            />
                        ))}

                    </div>

                </section>


                {/* ================= ABOUT CRICKETHUB ================= */}

                <section className="section">

                    <div className="section-heading">

                        <span>
                            ABOUT CRICKETHUB
                        </span>

                        <h2>
                            A Structured Cricket Platform
                        </h2>

                    </div>

                    <div className="feature-grid">

                        <div className="feature-card">

                            <div className="feature-icon">
                                📊
                            </div>

                            <h3>
                                Explore
                            </h3>

                            <p>
                                Explore teams, team-wise players,
                                fixtures, matches, statistics and
                                tournament information.
                            </p>

                        </div>

                        <div className="feature-card">

                            <div className="feature-icon">
                                🔐
                            </div>

                            <h3>
                                Secure
                            </h3>

                            <p>
                                Authentication and role-based
                                authorization provide controlled
                                access to the platform.
                            </p>

                        </div>

                        <div className="feature-card">

                            <div className="feature-icon">
                                ⚙️
                            </div>

                            <h3>
                                Manage
                            </h3>

                            <p>
                                Authorized administrators can manage
                                teams, players, tournaments, matches
                                and other application data.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= HOW IT WORKS ================= */}

                <section className="section how-section">

                    <div className="section-heading">

                        <span>
                            HOW IT WORKS
                        </span>

                        <h2>
                            Simple. Secure. Structured.
                        </h2>

                    </div>

                    <div className="feature-grid">

                        <div className="feature-card">

                            <div className="step-number">
                                01
                            </div>

                            <h3>
                                Register
                            </h3>

                            <p>
                                Create the appropriate CricketHub
                                account based on your role.
                            </p>

                        </div>

                        <div className="feature-card">

                            <div className="step-number">
                                02
                            </div>

                            <h3>
                                Sign In
                            </h3>

                            <p>
                                Securely authenticate to access
                                protected CricketHub features.
                            </p>

                        </div>

                        <div className="feature-card">

                            <div className="step-number">
                                03
                            </div>

                            <h3>
                                Explore & Manage
                            </h3>

                            <p>
                                Users explore cricket information while
                                authorized administrators manage data.
                            </p>

                        </div>

                    </div>

                </section>


                {/* ================= TERMS OF USE ================= */}

                <section className="section terms-section">

                    <div className="section-heading">

                        <span>
                            TERMS OF USE
                        </span>

                        <h2>
                            Using CricketHub
                        </h2>

                    </div>

                    <div className="info-card terms-card">

                        <p>
                            CricketHub is an independent educational
                            and portfolio project created to demonstrate
                            full-stack web application development.
                        </p>

                        <p>
                            The platform is intended for informational,
                            educational and demonstration purposes.
                            Users are expected to provide accurate
                            information when creating an account and
                            use the platform responsibly.
                        </p>

                        <p>
                            Access to administrative functionality is
                            restricted to authorized administrators.
                            Users must not attempt to bypass authentication,
                            authorization or other application security
                            controls.
                        </p>

                        <p>
                            CricketHub does not claim ownership of the
                            IPL, team names, player identities or other
                            third-party cricket-related intellectual
                            property. Appropriate original, licensed,
                            public-domain or placeholder assets should
                            be used within the application.
                        </p>

                        <p>
                            By using CricketHub, you agree to use the
                            platform only for its intended educational
                            and demonstration purposes.
                        </p>

                    </div>

                </section>

            </main>

            <Footer />

        </div>
    );
}

export default Home;