import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function About() {
    return (
        <>
            <Navbar />

            <main className="simple-page">

                <section className="page-header">
                    <span>ABOUT THE PROJECT</span>

                    <h1>About CricketHub</h1>

                    <p>
                        A full-stack cricket information and
                        management application.
                    </p>
                </section>

                <section className="page-content">

                    <h2>Project Purpose</h2>

                    <p>
                        CricketHub is an educational full-stack project
                        designed to demonstrate modern web application
                        development using Django, Django REST Framework,
                        React and MySQL.
                    </p>

                    <h2>Technology</h2>

                    <p>
                        The application uses a React frontend connected
                        to protected Django REST APIs using JWT
                        authentication and role-based authorization.
                    </p>

                    <h2>Application Roles</h2>

                    <p>
                        Regular users can explore permitted cricket
                        information, while authorized administrators
                        manage application data.
                    </p>

                </section>

            </main>

            <Footer />
        </>
    );
}

export default About;