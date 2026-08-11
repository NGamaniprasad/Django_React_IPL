import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "./Contact.css";

function Contact() {
    return (
        <>
            <Navbar />

            <main className="contact-page">

                {/* ================= HEADER ================= */}

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


                {/* ================= CONTACT CARD ================= */}

                <section className="contact-section">

                    <div className="contact-card">

                        <div className="contact-card-top">

                            <div className="contact-avatar">
                                GP
                            </div>

                            <div>
                                <span className="contact-label">
                                    PROJECT OWNER
                                </span>

                                <h2>
                                    Gamani Prasad
                                </h2>

                                <p>
                                    CricketHub IPL Manager
                                </p>
                            </div>

                        </div>


                        <div className="contact-divider"></div>


                        {/* EMAIL */}

                        <a
                            href="mailto:gamanin@gmail.com"
                            className="contact-item"
                        >

                            <div className="contact-icon">
                                📧
                            </div>

                            <div className="contact-details">

                                <span>
                                    Email
                                </span>

                                <strong>
                                    gamanin@gmail.com
                                </strong>

                            </div>

                            <span className="contact-arrow">
                                →
                            </span>

                        </a>


                        {/* PHONE */}

                        <a
                            href="tel:9876543210"
                            className="contact-item"
                        >

                            <div className="contact-icon">
                                📞
                            </div>

                            <div className="contact-details">

                                <span>
                                    Phone
                                </span>

                                <strong>
                                    +91 9876543210
                                </strong>

                            </div>

                            <span className="contact-arrow">
                                →
                            </span>

                        </a>


                        <div className="contact-note">

                            <span>
                                💬
                            </span>

                            <p>
                                Feel free to reach out for questions,
                                suggestions or project-related discussions.
                            </p>

                        </div>

                    </div>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Contact;