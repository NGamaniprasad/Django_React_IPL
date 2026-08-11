import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminUsers.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminUsers() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [currentUserId, setCurrentUserId] = useState(null);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    /*
     * ==========================================================
     * LOAD CURRENT ADMIN
     * ==========================================================
     */

    useEffect(() => {

        loadCurrentUser();

    }, []);


    /*
     * ==========================================================
     * LOAD USERS
     * ==========================================================
     */

    useEffect(() => {

        loadUsers();

    }, []);


    /*
     * ==========================================================
     * GET CURRENT LOGGED-IN USER
     * ==========================================================
     */

    const loadCurrentUser = async () => {

        const token =
            localStorage.getItem("access_token");

        if (!token) {

            navigate("/admin-login");

            return;
        }

        try {

            const response = await axios.get(
                `${API_BASE_URL}/auth/profile/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            setCurrentUserId(
                response.data.id
            );

        } catch (err) {

            console.error(
                "Current user error:",
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

                navigate("/admin-login");
            }
        }
    };


    /*
     * ==========================================================
     * LOAD ALL USERS
     * ==========================================================
     */

    const loadUsers = async () => {

        const token =
            localStorage.getItem("access_token");

        if (!token) {

            navigate("/admin-login");

            return;
        }

        try {

            setLoading(true);

            setError("");

            const response = await axios.get(
                `${API_BASE_URL}/accounts/users/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const data = response.data;

            setUsers(
                Array.isArray(data)
                    ? data
                    : data.results || []
            );

        } catch (err) {

            console.error(
                "Admin users error:",
                err
            );

            /*
             * UNAUTHORIZED
             */

            if (
                err.response?.status === 401
            ) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                navigate("/admin-login");

                return;
            }


            /*
             * FORBIDDEN
             */

            if (
                err.response?.status === 403
            ) {

                setError(
                    "Admin access is required."
                );

                return;
            }


            /*
             * OTHER ERROR
             */

            setError(
                err.response?.data?.detail ||
                "Unable to load users."
            );

        } finally {

            setLoading(false);

        }
    };


    /*
     * ==========================================================
     * DELETE USER
     * ==========================================================
     */

    const deleteUser = async (id) => {

        /*
         * Extra frontend protection
         */

        if (id === currentUserId) {

            alert(
                "You cannot delete your own admin account."
            );

            return;
        }


        const userToDelete =
            users.find(
                (user) => user.id === id
            );


        /*
         * Never allow deleting another admin
         * from this UI.
         */

        if (
            userToDelete?.role === "ADMIN"
        ) {

            alert(
                "Admin accounts are protected."
            );

            return;
        }


        const confirmed =
            window.confirm(
                "Are you sure you want to delete this user?"
            );


        if (!confirmed) {

            return;
        }


        const token =
            localStorage.getItem(
                "access_token"
            );


        try {

            await axios.delete(
                `${API_BASE_URL}/accounts/users/${id}/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            /*
             * Remove deleted user
             * from React state
             */

            setUsers(
                (previousUsers) =>
                    previousUsers.filter(
                        (user) =>
                            user.id !== id
                    )
            );


            alert(
                "User deleted successfully."
            );

        } catch (err) {

            console.error(
                "Delete user error:",
                err
            );


            /*
             * Unauthorized
             */

            if (
                err.response?.status === 401
            ) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                navigate("/admin-login");

                return;
            }


            /*
             * Backend protection
             */

            if (
                err.response?.status === 403
            ) {

                alert(
                    "You are not allowed to delete this user."
                );

                return;
            }


            alert(
                err.response?.data?.detail ||
                "Unable to delete user."
            );
        }
    };


    /*
     * ==========================================================
     * FORMAT DATE
     * ==========================================================
     */

    const formatDate = (date) => {

        if (!date) {

            return "—";
        }


        const dateObject =
            new Date(date);


        if (
            Number.isNaN(
                dateObject.getTime()
            )
        ) {

            return "—";
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


    /*
     * ==========================================================
     * LOADING
     * ==========================================================
     */

    if (loading) {

        return (

            <div className="admin-users-page">

                <div className="users-loading">

                    <div className="users-loading-icon">
                        👥
                    </div>

                    <h2>
                        Loading Users...
                    </h2>

                </div>

            </div>

        );
    }


    /*
     * ==========================================================
     * PAGE
     * ==========================================================
     */

    return (

        <div className="admin-users-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="users-header">

                <div>

                    <span className="users-label">
                        ADMIN PANEL
                    </span>

                    <h1>
                        Manage Users
                    </h1>

                    <p>
                        View and manage registered
                        CricketHub users.
                    </p>

                </div>


                <Link
                    to="/admin/dashboard"
                    className="back-dashboard"
                >
                    ← Dashboard
                </Link>

            </header>


            {/* ==================================================
                MAIN
            ================================================== */}

            <main className="users-main">


                {/* ERROR */}

                {error && (

                    <div className="users-error">

                        {error}

                    </div>

                )}


                {/* ==================================================
                    USERS CARD
                ================================================== */}

                <section className="users-card">


                    {/* CARD HEADER */}

                    <div className="users-card-header">

                        <div>

                            <h2>
                                Registered Users
                            </h2>

                            <p>

                                {users.length}{" "}

                                {
                                    users.length === 1
                                        ? "user"
                                        : "users"
                                }

                            </p>

                        </div>


                        <button
                            type="button"
                            onClick={loadUsers}
                            className="refresh-btn"
                        >
                            ↻ Refresh
                        </button>

                    </div>


                    {/* ==================================================
                        NO USERS
                    ================================================== */}

                    {users.length === 0 ? (

                        <div className="no-users">

                            <div className="no-users-icon">
                                👥
                            </div>

                            <h3>
                                No Users Found
                            </h3>

                            <p>
                                There are currently
                                no registered users.
                            </p>

                        </div>

                    ) : (


                        /* ==================================================
                           USERS TABLE
                        ================================================== */

                        <div className="users-table-wrapper">

                            <table className="users-table">


                                {/* TABLE HEADER */}

                                <thead>

                                    <tr>

                                        <th>
                                            ID
                                        </th>

                                        <th>
                                            Username
                                        </th>

                                        <th>
                                            Email
                                        </th>

                                        <th>
                                            Name
                                        </th>

                                        <th>
                                            Role
                                        </th>

                                        <th>
                                            Status
                                        </th>

                                        <th>
                                            Registered
                                        </th>

                                        <th>
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                {/* TABLE BODY */}

                                <tbody>

                                    {users.map(
                                        (user) => (

                                            <tr
                                                key={
                                                    user.id
                                                }
                                            >


                                                {/* ID */}

                                                <td>

                                                    {user.id}

                                                </td>


                                                {/* USERNAME */}

                                                <td>

                                                    <strong>

                                                        {
                                                            user.username
                                                        }

                                                    </strong>

                                                </td>


                                                {/* EMAIL */}

                                                <td>

                                                    {
                                                        user.email ||
                                                        "—"
                                                    }

                                                </td>


                                                {/* NAME */}

                                                <td>

                                                    {
                                                        user.full_name ||
                                                        user.first_name ||
                                                        "—"
                                                    }

                                                </td>


                                                {/* ROLE */}

                                                <td>

                                                    <span
                                                        className={
                                                            user.role ===
                                                            "ADMIN"
                                                                ? "role-admin"
                                                                : "role-user"
                                                        }
                                                    >

                                                        {
                                                            user.role ||
                                                            "USER"
                                                        }

                                                    </span>

                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    <span
                                                        className={
                                                            user.is_active
                                                                ? "user-active"
                                                                : "user-inactive"
                                                        }
                                                    >

                                                        {
                                                            user.is_active
                                                                ? "Active"
                                                                : "Inactive"
                                                        }

                                                    </span>

                                                </td>


                                                {/* REGISTERED */}

                                                <td>

                                                    {
                                                        formatDate(
                                                            user.created_at
                                                        )
                                                    }

                                                </td>


                                                {/* ==================================================
                                                    ACTION
                                                ================================================== */}

                                                <td>


                                                    {/* SUPERUSER */}

                                                    {user.is_superuser ? (

                                                        <span className="protected-user">

                                                            Protected

                                                        </span>


                                                    ) : user.id ===
                                                      currentUserId ? (


                                                        /* CURRENT ADMIN */

                                                        <span className="protected-user">

                                                            Current Admin

                                                        </span>


                                                    ) : user.role ===
                                                      "ADMIN" ? (


                                                        /* OTHER ADMIN */

                                                        <span className="protected-user">

                                                            Protected

                                                        </span>


                                                    ) : (


                                                        /* REGULAR USER */

                                                        <button
                                                            type="button"
                                                            className="delete-user-btn"
                                                            onClick={() =>
                                                                deleteUser(
                                                                    user.id
                                                                )
                                                            }
                                                        >

                                                            🗑 Delete

                                                        </button>

                                                    )}

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </section>


                {/* ==================================================
                    BACK
                ================================================== */}

                <div className="users-back">

                    <Link
                        to="/admin/dashboard"
                    >
                        ← Back to Admin Dashboard
                    </Link>

                </div>

            </main>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="users-footer">

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

export default AdminUsers;