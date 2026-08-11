import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminTournaments.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function AddTournament() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        season: "",
        start_date: "",
        end_date: "",
        status: "UPCOMING",
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

        const token =
            localStorage.getItem("access_token");

        if (!token) {
            navigate("/admin-login");
            return;
        }


        /* ================= VALIDATION ================= */

        if (!formData.name.trim()) {
            setError(
                "Tournament name is required."
            );
            return;
        }

        if (!formData.season) {
            setError(
                "Season is required."
            );
            return;
        }

        if (Number(formData.season) < 2008) {
            setError(
                "Tournament season cannot be earlier than 2008."
            );
            return;
        }

        if (!formData.start_date) {
            setError(
                "Start date is required."
            );
            return;
        }

        if (!formData.end_date) {
            setError(
                "End date is required."
            );
            return;
        }

        if (
            formData.end_date <
            formData.start_date
        ) {
            setError(
                "End date cannot be earlier than start date."
            );
            return;
        }


        try {

            setLoading(true);
            setError("");


            await axios.post(
                `${API_BASE_URL}/tournaments/`,
                {
                    name: formData.name.trim(),
                    season: Number(
                        formData.season
                    ),
                    start_date:
                        formData.start_date,
                    end_date:
                        formData.end_date,
                    status:
                        formData.status,
                },
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,

                        "Content-Type":
                            "application/json",
                    },
                }
            );


            navigate(
                "/admin/tournaments"
            );


        } catch (err) {

            console.error(
                "Add tournament error:",
                err
            );


            if (
                err.response?.status ===
                401
            ) {

                localStorage.removeItem(
                    "access_token"
                );

                localStorage.removeItem(
                    "refresh_token"
                );

                localStorage.removeItem(
                    "admin_logged_in"
                );

                navigate(
                    "/admin-login"
                );

                return;
            }


            const data =
                err.response?.data;


            if (
                data &&
                typeof data === "object"
            ) {

                const messages =
                    Object.entries(
                        data
                    ).map(
                        ([field, message]) =>
                            `${field}: ${
                                Array.isArray(
                                    message
                                )
                                    ? message.join(
                                          ", "
                                      )
                                    : message
                            }`
                    );


                setError(
                    messages.join(
                        " | "
                    )
                );


            } else {

                setError(
                    "Unable to add tournament."
                );
            }


        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="admin-tournament-form-page">


            {/* ================= HEADER ================= */}

            <header className="admin-tournament-form-header">

                <div>

                    <h1>
                        🏏 CricketHub Admin
                    </h1>

                    <p>
                        Tournament Management
                    </p>

                </div>


                <Link to="/admin/tournaments">

                    ← Back to Tournaments

                </Link>

            </header>


            {/* ================= CONTENT ================= */}

            <main className="admin-tournament-form-content">


                <section className="admin-tournament-form-card">

                    <h2>
                        🏆 Add New Tournament
                    </h2>


                    {/* ERROR */}

                    {error && (

                        <div className="tournament-form-error">

                            {error}

                        </div>

                    )}


                    {/* FORM */}

                    <form
                        className="tournament-form"
                        onSubmit={handleSubmit}
                    >


                        {/* NAME */}

                        <div className="tournament-form-group">

                            <label htmlFor="name">
                                Tournament Name
                            </label>

                            <input
                                id="name"
                                type="text"
                                name="name"
                                value={
                                    formData.name
                                }
                                onChange={
                                    handleChange
                                }
                                placeholder="Example: IPL"
                            />

                        </div>


                        {/* SEASON */}

                        <div className="tournament-form-group">

                            <label htmlFor="season">
                                Season
                            </label>

                            <input
                                id="season"
                                type="number"
                                name="season"
                                value={
                                    formData.season
                                }
                                onChange={
                                    handleChange
                                }
                                min="2008"
                                placeholder="Example: 2026"
                            />

                        </div>


                        {/* START DATE */}

                        <div className="tournament-form-group">

                            <label htmlFor="start_date">
                                Start Date
                            </label>

                            <input
                                id="start_date"
                                type="date"
                                name="start_date"
                                value={
                                    formData.start_date
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* END DATE */}

                        <div className="tournament-form-group">

                            <label htmlFor="end_date">
                                End Date
                            </label>

                            <input
                                id="end_date"
                                type="date"
                                name="end_date"
                                value={
                                    formData.end_date
                                }
                                onChange={
                                    handleChange
                                }
                            />

                        </div>


                        {/* STATUS */}

                        <div className="tournament-form-group">

                            <label htmlFor="status">
                                Status
                            </label>

                            <select
                                id="status"
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={
                                    handleChange
                                }
                            >

                                <option value="UPCOMING">
                                    Upcoming
                                </option>

                                <option value="ONGOING">
                                    Ongoing
                                </option>

                                <option value="COMPLETED">
                                    Completed
                                </option>

                            </select>

                        </div>


                        {/* ACTIONS */}

                        <div className="tournament-form-actions">

                            <button
                                type="submit"
                                className="save-tournament-button"
                                disabled={loading}
                            >

                                {loading
                                    ? "Saving..."
                                    : "Add Tournament"
                                }

                            </button>


                            <Link
                                to="/admin/tournaments"
                                className="cancel-tournament-button"
                            >
                                Cancel
                            </Link>

                        </div>


                    </form>

                </section>

            </main>

        </div>
    );
}

export default AddTournament;