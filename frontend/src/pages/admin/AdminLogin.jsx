import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminLogin.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AdminLogin() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!formData.username || !formData.password) {
            setError("Username and password are required.");
            return;
        }

        try {

            setLoading(true);

            const response = await axios.post(
                `${API_BASE_URL}/auth/login/`,
                formData
            );

            const data = response.data;

            // First check whether this account is actually an admin.
            const profileResponse = await axios.get(
                `${API_BASE_URL}/auth/profile/`,
                {
                    headers: {
                        Authorization: `Bearer ${data.access}`,
                    },
                }
            );

            const user = profileResponse.data;

            if (!user.is_staff) {

                setError(
                    "This account does not have administrator access."
                );

                return;
            }

            localStorage.setItem(
                "access_token",
                data.access
            );

            localStorage.setItem(
                "refresh_token",
                data.refresh
            );

            localStorage.setItem(
                "admin_logged_in",
                "true"
            );

            navigate("/admin/dashboard");

        } catch (error) {

            console.error("Admin login error:", error);

            if (error.response?.data?.detail) {

                setError(
                    error.response.data.detail
                );

            } else {

                setError(
                    "Invalid administrator username or password."
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">

            <div className="admin-login-card">

                <div className="admin-login-header">

                    <div className="admin-logo">
                        🛡️
                    </div>

                    <h1>
                        Admin Login
                    </h1>

                    <p>
                        CricketHub Administration
                    </p>

                </div>


                {error && (
                    <div className="admin-login-error">
                        {error}
                    </div>
                )}


                <form onSubmit={handleSubmit}>

                    <div className="form-group">

                        <label>
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter admin username"
                            autoComplete="username"
                        />

                    </div>


                    <div className="form-group">

                        <label>
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter admin password"
                            autoComplete="current-password"
                        />

                    </div>


                    <button
                        type="submit"
                        className="admin-login-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Signing in..."
                            : "Admin Login"
                        }
                    </button>

                </form>


                <div className="admin-login-footer">

                    <Link to="/login">
                        User Login
                    </Link>

                    <Link to="/">
                        ← Back to CricketHub
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default AdminLogin;