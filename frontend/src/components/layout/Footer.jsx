import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">

            <div className="footer-container">

                {/* ================= BRAND ================= */}

                <div className="footer-brand">

                    <Link
                        to="/"
                        className="footer-logo"
                    >
                        🏏 CricketHub
                    </Link>

                    <p className="footer-tagline">
                        Manage • Track • Analyze
                    </p>

                    <p className="footer-description">
                        A modern educational IPL information
                        and management platform built for
                        learning and portfolio demonstration.
                    </p>

                </div>


                {/* ================= QUICK LINKS ================= */}

                <div className="footer-links">

                    <h3>
                        Quick Links
                    </h3>

                    <Link to="/">
                        Home
                    </Link>

                    <Link to="/about-ipl">
                        About IPL
                    </Link>

                    <Link to="/about">
                        About
                    </Link>

                    <Link to="/contact">
                        Contact
                    </Link>

                    <Link to="/terms">
                        Terms of Use
                    </Link>

                    <Link to="/privacy">
                        Privacy Policy
                    </Link>

                </div>


                {/* ================= CONTACT ================= */}

                <div className="footer-contact">

                    <h3>
                        Contact
                    </h3>

                    <a href="mailto:gamanin@gmail.com">
                        📧 gamanin@gmail.com
                    </a>

                    <a href="tel:9876543210">
                        📞 +91 9876543210
                    </a>

                    <p>
                        Gamani Prasad
                    </p>

                </div>

            </div>


            {/* ================= BOTTOM ================= */}

            <div className="footer-bottom">

                <div>

                    <p>
                        © 2026 CricketHub IPL Manager.
                        All rights reserved. | Gamani prasad
                    </p>

                </div>

                <div>

                    <p>
                        Independent educational/portfolio project.
                        Not affiliated with or endorsed by IPL or BCCI.
                    </p>

                </div>

            </div>

        </footer>
    );
}

export default Footer;