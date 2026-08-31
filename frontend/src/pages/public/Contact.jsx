
import { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Contact.css";

function Contact() {
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);

        try {
            const response = await fetch(
                "https://formspree.io/f/xnpqjpyz",
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        Accept: "application/json",
                    },
                }
            );

            if (response.ok) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <>
            <Navbar />

            <main className="contact-page">

                {/* HEADER */}

                <section className="contact-hero">

                    <span className="contact-badge">
                        GET IN TOUCH
                    </span>

                    <h1>
                        Contact CricketHub
                    </h1>

                    <p>
                        Have a question, suggestion or want to
                        know more about the project?
                    </p>

                </section>


                {/* CONTACT FORM */}

                <section className="contact-section">

                    <div className="contact-form-card">

                        <div className="contact-form-header">

                            <span className="contact-label">
                                SEND A MESSAGE
                            </span>

                            <h2>
                                Get in touch
                            </h2>

                            <p>
                                Send your question or feedback
                                directly to the CricketHub team.
                            </p>

                        </div>


                        <form onSubmit={handleSubmit}>

                            {/* NAME */}

                            <div className="form-group">

                                <label htmlFor="name">
                                    Name
                                </label>

                                <input
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Enter your name"
                                    required
                                />

                            </div>


                            {/* EMAIL */}

                            <div className="form-group">

                                <label htmlFor="email">
                                    Email
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                />

                            </div>


                            {/* SUBJECT */}

                            <div className="form-group">

                                <label htmlFor="subject">
                                    Subject
                                </label>

                                <input
                                    id="subject"
                                    type="text"
                                    name="subject"
                                    placeholder="Enter subject"
                                    required
                                />

                            </div>


                            {/* MESSAGE */}

                            <div className="form-group">

                                <label htmlFor="message">
                                    Message
                                </label>

                                <textarea
                                    id="message"
                                    name="message"
                                    rows="6"
                                    placeholder="Write your message..."
                                    required
                                />

                            </div>


                            {/* SUBMIT */}

                            <button
                                type="submit"
                                className="contact-submit-btn"
                            >
                                Send Message
                            </button>


                            {/* SUCCESS */}

                            {status === "success" && (
                                <div className="contact-success">
                                    ✓ Message sent successfully!
                                </div>
                            )}


                            {/* ERROR */}

                            {status === "error" && (
                                <div className="contact-error">
                                    ✕ Something went wrong. Please try again.
                                </div>
                            )}

                        </form>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Contact;

