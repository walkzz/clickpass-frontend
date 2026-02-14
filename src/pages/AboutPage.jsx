import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AboutPage.css";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="about-page">
                <section className="section">
                    <div className="info-card">
                        <h2>Our History</h2>
                        <p>
                            ClickPass was founded to simplify event discovery, ticket sales,
                            and event management into one seamless platform.
                        </p>
                    </div>
                </section>

                <section className="section">
                    <div className="info-card">
                        <h2>Our Vision</h2>
                        <p>
                            To become the leading event platform in the region, connecting
                            people with experiences they love.
                        </p>
                    </div>
                </section>

                <section className="section">
                    <h2>Our Team</h2>
                    <div className="team-grid">
                        <div className="team-card">
                            <h4>Alex Jordan</h4>
                            <p>Founder & CEO</p>
                        </div>
                        <div className="team-card">
                            <h4>Maria Stone</h4>
                            <p>Product Manager</p>
                        </div>
                        <div className="team-card">
                            <h4>David Lee</h4>
                            <p>Lead Developer</p>
                        </div>
                    </div>
                </section>

                <section className="section">
                    <div className="mission-card">
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to empower event organizers and give users a fast,
                            transparent and enjoyable ticketing experience.
                        </p>
                    </div>
                </section>

                <section className="section">
                    <h2>Our Values</h2>
                    <div className="values-list">
                        <div className="value-item">Transparency</div>
                        <div className="value-item">User-first design</div>
                        <div className="value-item">Reliability</div>
                        <div className="value-item">Innovation</div>
                        <div className="value-item">Visionary</div>
                        <div className="value-item">Efficient</div>
                    </div>
                </section>

                <section className="section">
                    <h2>Contact & Social Media</h2>
                    <div className="contact-links">
                        <a
                            className="contact-link"
                            href=""
                            target="_blank"
                            rel="noreferrer"
                        >
                            Support
                            <span>↗</span>
                        </a>

                        <a
                            className="contact-link"
                            href=""
                            target="_blank"
                            rel="noreferrer"
                        >
                            Twitter
                            <span>↗</span>
                        </a>

                        <a
                            className="contact-link"
                            href=""
                            target="_blank"
                            rel="noreferrer"
                        >
                            Instagram
                            <span>↗</span>
                        </a>
                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
}