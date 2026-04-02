import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import '../styles/HomePage.css'
import "../styles/AboutPage.css";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <div className="main-container">
                <div className="about-page">
                    <section className="section">
                        <div className="info-card">
                            <h2>Our History</h2>
                            <p>
                                ClickPass was born out of a simple yet persistent frustration: finding and securing access to local events was often too fragmented and confusing. Founded with the singular goal of simplifying the digital ticketing landscape, we set out to build a unified platform that serves both the community and the creators. From our early days of conceptualizing a basic directory, we have grown into a comprehensive digital ecosystem that supports multiple cities across the country, handling everything from intimate theater productions to massive open-air concerts. Our journey is defined by a continuous commitment to bridging the gap between exceptional events and the audiences who love them.
                            </p>
                        </div>
                    </section>

                    <section className="section">
                        <div className="info-card">
                            <h2>Our Vision</h2>
                            <p>
                                Our vision is to become the definitive event discovery and management platform in the region, setting the gold standard for how people connect with live experiences. We envision a cultural landscape where technology effortlessly empowers local organizers, allowing them to focus on what they do best: creating unforgettable moments. By continuously refining our tools and expanding our reach, we aim to cultivate a vibrant, accessible community where discovering your next favorite artist, conference, or local meetup is always just a few clicks away.
                            </p>
                        </div>
                    </section>

                    <section className="section">
                        <h2>Our Team</h2>
                        <div className="team-grid">
                            <div className="team-card">
                                <h4>Pavel Toshinski</h4>
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
                                Our mission is to democratize the event management space by equipping organizers with powerful, intuitive administrative tools while simultaneously delivering a fast, transparent, and highly secure ticketing experience for our users. We strive to eliminate the common pain points of the industry—such as hidden fees, convoluted checkout processes, and administrative bottlenecks—ensuring that from the moment a ticket is listed to the final scan at the door, the ClickPass experience is completely frictionless.
                            </p>
                        </div>
                    </section>

                    <section className="section">
                        <h2>Our Values</h2>
                        <div className="values-list">
                            <div className="value-item">
                                <h3>Transparency</h3>
                                <p>We believe in clear communication, honest pricing without hidden fees, and maintaining an open platform that builds long-term trust with our community.</p>
                            </div>
                            <div className="value-item">
                                <h3>User-first design</h3>
                                <p>Every feature we develop—from the initial discovery feed to the secure checkout funnel—is meticulously crafted with the end-user's experience in mind.</p>
                            </div>
                            <div className="value-item">
                                <h3>Reliability</h3>
                                <p>We are dedicated to ensuring our platform remains stable, secure, and performant, providing a seamless experience even during high-traffic ticket releases.</p>
                            </div>
                        </div>
                    </section>

                    <section className="section">
                        <h2>Contact & Social Media</h2>
                        <div className="contact-links">
                            <a
                                className="contact-link"
                                href="/contact"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Support
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mouse-pointer-click h-6 w-6 text-primary"><path d="M14 4.1 12 6"></path><path d="m5.1 8-2.9-.8"></path><path d="m6 12-1.9 2"></path><path d="M7.2 2.2 8 5.1"></path><path d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"></path></svg>
                            </a>

                            <a
                                className="contact-link"
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Twitter
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1227" width="20" height="20" fill="currentColor"><path d="M714.163 519.284L1160.89 0H1057.58L667.137 453.063L356.902 0H0L468.492 682.846L0 1226.37H103.314L515.518 747.412L843.098 1226.37H1200L714.137 519.284H714.163ZM566.593 682.846L527.997 628.478L183.084 146.561H330.28L608.48 537.41L647.076 591.778L1017.09 1106.67H869.897L566.593 682.871V682.846Z"/></svg>
                            </a>

                            <a
                                className="contact-link"
                                href="#"
                                target="_blank"
                                rel="noreferrer"
                            >
                                Instagram
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
                            </a>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    );
}