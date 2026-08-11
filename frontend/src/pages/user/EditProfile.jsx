import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function EditProfile() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    // ==========================================================
    // LOAD PROFILE
    // ==========================================================

    useEffect(() => {

        loadProfile();

    }, []);


    const loadProfile = async () => {

        const token =
            localStorage.getItem("access_token");

        if (!token) {

            navigate("/login");

            return;
        }


        try {

            setLoading(true);
            setError("");


            const response = await axios.get(
                `${API_BASE_URL}/accounts/profile/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );


            setFormData({
                username:
                    response.data.username || "",

                email:
                    response.data.email || "",

                first_name:
                    response.data.first_name || "",

                last_name:
                    response.data.last_name || "",
            });


        } catch (err) {

            console.error(
                "Profile loading error:",
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


            setError(
                err.response?.data?.detail ||
                "Unable to load profile."
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================================
    // INPUT CHANGE
    // ==========================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;


        setFormData(
            (previousData) => ({
                ...previousData,
                [name]: value,
            })
        );


        setError("");
        setSuccess("");
    };


    // ==========================================================
    // UPDATE PROFILE
    // ==========================================================

    const handleSubmit = async (event) => {

        event.preventDefault();


        const token =
            localStorage.getItem("access_token");


        if (!token) {

            navigate("/login");

            return;
        }


        try {

            setSaving(true);
            setError("");
            setSuccess("");


            const response = await axios.patch(
                `${API_BASE_URL}/accounts/profile/`,
                formData,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );


            setFormData({
                username:
                    response.data.username || "",

                email:
                    response.data.email || "",

                first_name:
                    response.data.first_name || "",

                last_name:
                    response.data.last_name || "",
            });


            setSuccess(
                "Profile updated successfully."
            );


            // Optional:
            // update stored user information
            localStorage.setItem(
                "user",
                JSON.stringify(response.data)
            );


        } catch (err) {

            console.error(
                "Profile update error:",
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


            if (
                err.response?.data
            ) {

                const data =
                    err.response.data;


                if (
                    typeof data === "object"
                ) {

                    const messages =
                        Object.entries(data)
                            .map(
                                ([field, message]) =>
                                    `${field}: ${
                                        Array.isArray(message)
                                            ? message.join(", ")
                                            : message
                                    }`
                            )
                            .join("\n");


                    setError(messages);

                } else {

                    setError(
                        String(data)
                    );
                }

            } else {

                setError(
                    "Unable to update profile."
                );
            }

        } finally {

            setSaving(false);
        }
    };


    // ==========================================================
    // LOADING
    // ==========================================================

    if (loading) {

        return (
            <div className="edit-profile-page">

                <div className="profile-loading">

                    <div className="loading-icon">
                        👤
                    </div>

                    <h2>
                        Loading Profile...
                    </h2>

                </div>

            </div>
        );
    }


    // ==========================================================
    // PAGE
    // ==========================================================

    return (

        <div className="edit-profile-page">

            {/* ================= HEADER ================= */}

            <header className="edit-profile-header">

                <div>

                    <span className="profile-label">
                        USER ACCOUNT
                    </span>

                    <h1>
                        Edit Profile
                    </h1>

                    <p>
                        Update your CricketHub
                        account information.
                    </p>

                </div>


                <Link
                    to="/user/dashboard"
                    className="back-dashboard-btn"
                >
                    ← Dashboard
                </Link>

            </header>


            {/* ================= MAIN ================= */}

            <main className="edit-profile-main">

                <section className="profile-card">

                    <div className="profile-card-header">

                        <div className="profile-avatar">
                            👤
                        </div>

                        <div>

                            <h2>
                                Personal Information
                            </h2>

                            <p>
                                Keep your account
                                information up to date.
                            </p>

                        </div>

                    </div>


                    {/* ERROR */}

                    {error && (

                        <div className="profile-error">
                            {error}
                        </div>

                    )}


                    {/* SUCCESS */}

                    {success && (

                        <div className="profile-success">
                            ✓ {success}
                        </div>

                    )}


                    {/* ================= FORM ================= */}

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

                        {/* USERNAME */}

                        <div className="form-group">

                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                name="username"
                                value={
                                    formData.username
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* EMAIL */}

                        <div className="form-group">

                            <label htmlFor="email">
                                Email Address
                            </label>

                            <input
                                id="email"
                                type="email"
                                name="email"
                                value={
                                    formData.email
                                }
                                onChange={
                                    handleChange
                                }
                                required
                            />

                        </div>


                        {/* FIRST NAME */}

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="first_name">
                                    First Name
                                </label>

                                <input
                                    id="first_name"
                                    type="text"
                                    name="first_name"
                                    value={
                                        formData.first_name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter first name"
                                />

                            </div>


                            {/* LAST NAME */}

                            <div className="form-group">

                                <label htmlFor="last_name">
                                    Last Name
                                </label>

                                <input
                                    id="last_name"
                                    type="text"
                                    name="last_name"
                                    value={
                                        formData.last_name
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    placeholder="Enter last name"
                                />

                            </div>

                        </div>


                        {/* BUTTONS */}

                        <div className="profile-actions">

                            <Link
                                to="/user/dashboard"
                                className="cancel-btn"
                            >
                                Cancel
                            </Link>


                            <button
                                type="submit"
                                className="save-profile-btn"
                                disabled={saving}
                            >

                                {saving
                                    ? "Saving..."
                                    : "Save Changes"}

                            </button>

                        </div>

                    </form>

                </section>


                {/* BACK */}

                <div className="profile-back">

                    <Link to="/user/dashboard">
                        ← Back to Dashboard
                    </Link>

                </div>

            </main>


            {/* ================= FOOTER ================= */}

            <footer className="edit-profile-footer">

                <p>
                    © 2026 CricketHub IPL Manager.
                    All rights reserved.
                </p>

            </footer>

        </div>
    );
}

export default EditProfile;