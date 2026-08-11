import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function PrivacyPolicy() {
    return (
        <>
            <Navbar />

            <main className="simple-page">

                <section className="page-header">

                    <span>PRIVACY</span>

                    <h1>Privacy Policy</h1>

                </section>

                <section className="page-content">

                    <h2>Information</h2>

                    <p>
                        CricketHub may store account information required
                        to provide authentication and application services.
                    </p>

                    <h2>Security</h2>

                    <p>
                        Authentication credentials are handled using
                        secure password hashing and protected
                        authentication mechanisms.
                    </p>

                    <h2>Application Data</h2>

                    <p>
                        Application information is managed through
                        authorized backend APIs.
                    </p>

                    <h2>Educational Purpose</h2>

                    <p>
                        This application is an independent educational
                        project and is not affiliated with IPL or BCCI.
                    </p>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default PrivacyPolicy;