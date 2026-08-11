import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./AdminTournaments.css";

const API_BASE_URL = "http://127.0.0.1:8000/api";

function EditTournament() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        season: "",
        start_date: "",
        end_date: "",
        status: "UPCOMING",
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadTournament();
    }, [id]);

    const loadTournament = async () => {

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
                `${API_BASE_URL}/tournaments/${id}/`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`,
                    },
                }
            );

            const tournament = response.data;

            setFormData({
                name: tournament.name || "",
                season: tournament.season || "",
                start_date:
                    tournament.start_date || "",
                end_date:
                    tournament.end_date || "",
                status:
                    tournament.status || "UPCOMING",
            });

        } catch (err) {

            console.error(
                "Load tournament error:",
                err
            );

            if (err.response?.status === 401) {

                navigate("/admin-login");
                return;
            }

            setError(
                "Unable to load tournament."
            );

        } finally {

            setLoading(false);
        }
    };


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

            setSaving(true);
            setError("");


            await axios.put(
                `${API_BASE_URL}/tournaments/${id}/`,
                {
                    name: formData.name.trim(),

                    season:
                        Number(formData.season),

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
                "Update tournament error:",
                err
            );


            if (
                err.response?.status === 401
            ) {

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
                    Object.entries(data).map(
                        ([field, message]) =>
                            `${field}: ${
                                Array.isArray(message)
                                    ? message.join(", ")
                                    : message
                            }`
                    );


                setError(
                    messages.join(" | ")
                );


            } else {

                setError(
                    "Unable to update tournament."
                );
            }


        } finally {

            setSaving(false);
        }
    };


    if (loading) {

        return (

            <div className="admin-tournaments-loading">

                <h2>
                    🏆 Loading Tournament...
                </h2>

            </div>
        );
    }


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
                        Edit Tournament
                    </h2>


                    {error && (

                        <div className="tournament-form-error">

                            {error}

                        </div>

                    )}


                    <form
                        className="tournament-form"
                        onSubmit={handleSubmit}
                    >


                        {/* NAME */}

                        <div className="tournament-form-group">

                            <label>
                                Tournament Name
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Example: IPL"
                            />

                        </div>


                        {/* SEASON */}

                        <div className="tournament-form-group">

                            <label>
                                Season
                            </label>

                            <input
                                type="number"
                                name="season"
                                value={formData.season}
                                onChange={handleChange}
                                min="2008"
                                placeholder="Example: 2026"
                            />

                        </div>


                        {/* START DATE */}

                        <div className="tournament-form-group">

                            <label>
                                Start Date
                            </label>

                            <input
                                type="date"
                                name="start_date"
                                value={
                                    formData.start_date
                                }
                                onChange={handleChange}
                            />

                        </div>


                        {/* END DATE */}

                        <div className="tournament-form-group">

                            <label>
                                End Date
                            </label>

                            <input
                                type="date"
                                name="end_date"
                                value={
                                    formData.end_date
                                }
                                onChange={handleChange}
                            />

                        </div>


                        {/* STATUS */}

                        <div className="tournament-form-group">

                            <label>
                                Status
                            </label>

                            <select
                                name="status"
                                value={
                                    formData.status
                                }
                                onChange={handleChange}
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


                        {/* BUTTONS */}

                        <div className="tournament-form-actions">

                            <button
                                type="submit"
                                className="save-tournament-button"
                                disabled={saving}
                            >

                                {saving
                                    ? "Updating..."
                                    : "Update Tournament"
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

export default EditTournament;