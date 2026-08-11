import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "./ChangePassword.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function ChangePassword() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ======================================================
    // HANDLE INPUT
    // ======================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

    };


    // ======================================================
    // SUBMIT
    // ======================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        setSuccess("");

        const token =
            localStorage.getItem("access_token");

        if (!token) {

            navigate("/login");

            return;
        }


        // Frontend validation

        if (
            !formData.current_password ||
            !formData.new_password ||
            !formData.confirm_password
        ) {

            setError(
                "Please fill in all password fields."
            );

            return;
        }


        if (formData.new_password.length < 8) {

            setError(
                "New password must contain at least 8 characters."
            );

            return;
        }


        if (
            formData.new_password !==
            formData.confirm_password
        ) {

            setError(
                "New passwords do not match."
            );

            return;
        }


        try {

            setLoading(true);

            const response = await axios.post(

                `${API_BASE_URL}/accounts/change-password/`,

                {
                    current_password:
                        formData.current_password,

                    new_password:
                        formData.new_password,

                    confirm_password:
                        formData.confirm_password,
                },

                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }

            );


            setSuccess(
                response.data.message ||
                "Password changed successfully."
            );


            setFormData({
                current_password: "",
                new_password: "",
                confirm_password: "",
            });


            /*
             * Give the user a moment to read
             * the success message.
             */

            setTimeout(() => {

                navigate("/user/dashboard");

            }, 1500);


        } catch (err) {

            console.error(
                "Change password error:",
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

                navigate("/login");

                return;
            }


            const data =
                err.response?.data;


            if (data?.current_password) {

                setError(
                    data.current_password
                );

            } else if (data?.new_password) {

                setError(
                    data.new_password
                );

            } else if (data?.confirm_password) {

                setError(
                    data.confirm_password
                );

            } else {

                setError(
                    data?.detail ||
                    "Unable to change password."
                );

            }

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="change-password-page">


            {/* ==================================================
                HEADER
            ================================================== */}

            <header className="change-password-header">

                <div>

                    <span className="password-label">
                        ACCOUNT SECURITY
                    </span>

                    <h1>
                        Change Password
                    </h1>

                    <p>
                        Update your CricketHub account password.
                    </p>

                </div>


                <Link
                    to="/user/dashboard"
                    className="back-dashboard-btn"
                >
                    ← Dashboard
                </Link>

            </header>


            {/* ==================================================
                MAIN
            ================================================== */}

            <main className="change-password-main">

                <section className="password-card">


                    {/* CARD HEADER */}

                    <div className="password-card-header">

                        <div className="password-icon">
                            🔐
                        </div>

                        <div>

                            <h2>
                                Update Password
                            </h2>

                            <p>
                                Keep your account secure with
                                a strong password.
                            </p>

                        </div>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="password-error">

                            {error}

                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="password-success">

                            {success}

                        </div>

                    )}


                    {/* FORM */}

                    <form
                        className="password-form"
                        onSubmit={handleSubmit}
                    >


                        {/* CURRENT PASSWORD */}

                        <div className="password-group">

                            <label>
                                Current Password
                            </label>

                            <input
                                type="password"
                                name="current_password"
                                value={
                                    formData.current_password
                                }
                                onChange={handleChange}
                                placeholder="Enter current password"
                                autoComplete="current-password"
                            />

                        </div>


                        {/* NEW PASSWORD */}

                        <div className="password-group">

                            <label>
                                New Password
                            </label>

                            <input
                                type="password"
                                name="new_password"
                                value={
                                    formData.new_password
                                }
                                onChange={handleChange}
                                placeholder="Enter new password"
                                autoComplete="new-password"
                            />

                            <small>
                                Minimum 8 characters.
                            </small>

                        </div>


                        {/* CONFIRM PASSWORD */}

                        <div className="password-group">

                            <label>
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                name="confirm_password"
                                value={
                                    formData.confirm_password
                                }
                                onChange={handleChange}
                                placeholder="Confirm new password"
                                autoComplete="new-password"
                            />

                        </div>


                        {/* ACTIONS */}

                        <div className="password-actions">

                            <Link
                                to="/user/dashboard"
                                className="cancel-password-btn"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="change-password-btn"
                                disabled={loading}
                            >

                                {loading
                                    ? "Updating..."
                                    : "Change Password"}

                            </button>

                        </div>

                    </form>


                    {/* SECURITY INFO */}

                    <div className="security-info">

                        <strong>
                            🔒 Security Tip
                        </strong>

                        <p>
                            Use a unique password containing
                            letters, numbers and special characters.
                        </p>

                    </div>

                </section>

            </main>


            {/* ==================================================
                FOOTER
            ================================================== */}

            <footer className="change-password-footer">

                <p>
                    © 2026 CricketHub IPL Manager.
                    All rights reserved.
                </p>

            </footer>

        </div>

    );
}

export default ChangePassword;