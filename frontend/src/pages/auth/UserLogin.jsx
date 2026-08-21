
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/authService";

function UserLogin() {

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

            const data = await authService.loginUser(formData);

            /*
             * Store JWT tokens temporarily.
             * We will move authentication state
             * into AuthContext in the next authentication step.
             */
            localStorage.setItem(
                "access_token",
                data.access
            );

            localStorage.setItem(
                "refresh_token",
                data.refresh
            );

            navigate("/user/dashboard");

        } catch (error) {

            console.error("Login error:", error);

            if (error.response?.data) {

                const backendErrors = error.response.data;

                const message =
                    backendErrors.detail ||
                    "Invalid username or password.";

                setError(message);

            } else {

                setError(
                    "Unable to connect to the server."
                );
            }

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="auth-page">

            <div className="auth-card">

                <div className="auth-header">

                    <div className="auth-logo">
                        🏏
                    </div>

                    <h1>
                        User Login
                    </h1>

                    <p>
                        Welcome back to CricketHub
                    </p>

                </div>


                {error && (
                    <div className="auth-error">
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
                            placeholder="Enter your username"
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
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />

                    </div>


                    <button
                        type="submit"
                        className="auth-button"
                        disabled={loading}
                    >
                        {loading
                            ? "Logging in..."
                            : "Login"
                        }
                    </button>

                </form>


                <div className="auth-footer">

                    <p>
                        Don't have an account?
                    </p>

                    <Link to="/register">
                        Create User Account
                    </Link>

                </div>


                <div className="auth-footer">

                    <p>
                        Are you an administrator?
                    </p>

                    <Link to="/admin-login">
                        Admin Login
                    </Link>

                </div>


                <div className="auth-back">

                    <Link to="/">
                        ← Back to CricketHub
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default UserLogin;
