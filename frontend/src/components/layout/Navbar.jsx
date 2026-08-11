//import { Link } from "react-router-dom";
//import "./Navbar.css";
//
//function Navbar() {
//    return (
//        <header className="navbar">
//            <div className="navbar-container">
//
//                {/* LEFT SIDE */}
//                <div className="navbar-left">
//
//                    <Link to="/" className="navbar-brand">
//                        <span className="brand-icon">🏏</span>
//                        <span>CricketHub</span>
//                    </Link>
//
//                    <nav className="navbar-menu">
//                        <Link to="/">Home</Link>
//                        <Link to="/about-ipl">About IPL</Link>
//                        <Link to="/about">About</Link>
//
//                        <Link to="/contact">Contact</Link>
//                    </nav>
//
//                </div>
//
//                {/* RIGHT SIDE */}
//                <div className="navbar-actions">
//
//                    <Link to="/register" className="nav-user-register">
//                        User Register
//                    </Link>
//
//                    <Link to="/admin-register" className="nav-admin-register">
//                        Admin Register
//                    </Link>
//
//                    <Link to="/login" className="nav-user-login">
//                        User Login
//                    </Link>
//
//                    <Link to="/admin-login" className="nav-admin-login">
//                        Admin Login
//                    </Link>
//
//                </div>
//
//            </div>
//        </header>
//    );
//}
//
//export default Navbar;

/////


import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
    return (
        <header className="navbar">

            <div className="navbar-container">

                {/* =================================================
                    LEFT SIDE
                    ================================================= */}

                <div className="navbar-actions">

                    {/* User Register */}
                    <Link
                        to="/register"
                        className="nav-btn user-register"
                    >
                        User Register
                    </Link>




                    {/* User Login */}
                    <Link
                        to="/login"
                        className="nav-btn user-login"
                    >
                        User Login
                    </Link>


                    {/* Admin Login */}
                    <Link
                        to="/admin-login"
                        className="nav-btn admin-login"
                    >
                        Admin Login
                    </Link>

                </div>


                {/* =================================================
                    RIGHT SIDE
                    ================================================= */}

                <div className="navbar-left">

                    {/* ================= BRAND ================= */}

                    <Link
                        to="/"
                        className="navbar-brand"
                    >

                        <span className="brand-icon">
                            🏏
                        </span>

                        <span className="brand-name">
                            CricketHub
                        </span>

                    </Link>


                    {/* ================= NAVIGATION ================= */}

                    <nav className="navbar-menu">

                        <Link
                            to="/"
                            className="navbar-link"
                        >
                            Home
                        </Link>


                        <Link
                            to="/about-ipl"
                            className="navbar-link"
                        >
                            About IPL
                        </Link>


                        <Link
                            to="/about"
                            className="navbar-link"
                        >
                            About Us
                        </Link>


                        <Link
                            to="/contact"
                            className="navbar-link"
                        >
                            Contact
                        </Link>

                    </nav>

                </div>

            </div>

        </header>
    );
}

export default Navbar;


//{/* Admin Register */}
//                    <Link
//                        to="/admin-register"
//                        className="nav-btn admin-register"
//                    >
//                        Admin Register
//                    </Link>
