import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function TermsOfUse() {
    return (
        <>
            <Navbar />

            <main className="simple-page">

                <section className="page-header">
                    <span>LEGAL INFORMATION</span>

                    <h1>Terms of Use</h1>
                </section>

                <section className="page-content">

                    <h2>Educational Project</h2>

                    <p>
                        CricketHub is an independent educational and
                        portfolio project created for software
                        development and demonstration purposes.
                    </p>

                    <h2>Account Responsibility</h2>

                    <p>
                        Users are responsible for maintaining the
                        security of their account credentials.
                    </p>

                    <h2>Application Usage</h2>

                    <p>
                        Users must use the application only for its
                        intended informational and educational purposes.
                    </p>

                    <h2>Content</h2>

                    <p>
                        CricketHub uses original application content
                        and appropriately licensed or placeholder
                        media where applicable.
                    </p>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default TermsOfUse;