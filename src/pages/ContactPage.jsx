import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import AccordionItem from "../components/AccordionItem";
import '../styles/HomePage.css'

const ContactPage = () => {
    const faqData = [
        {
            question: "How can I purchase a ticket?",
            answer:
                "The tickets are located inside an event. Simply click one of the events you want to purchase tickets for and a panel from the right side will appear. Select the desired ticket type & quantity and then proceed to checkout.",
        },
        {
            question: "Which payment methods are currently supported?",
            answer: "The only payment method available at the moment is Mastercard.",
        },
        {
            question:
                "How can I purchase multiple different tickets? For example one premium and one standard?",
            answer:
                "In order to purchase different types of tickets, you have to make a separate purchase.",
        },
        {
            question: "My purchase didn't go through. What can I do?",
            answer:
                "Please send us a ticket through our contact form. Be sure to attach the unique ticket purchase code so we can look into the issue.",
        },
        {
            question: "How can I be an event organizer?",
            answer:
                "Please send us an email with your request and we will set-up your account shortly.",
        },
        {
            question: "Is my data secure?",
            answer:
                "Absolutely. We use industry-standard encryption to ensure your data is always safe.",
        },
        {
            question: "What is your refund policy?",
            answer: (
                <>
                    At ClickPass, we aim to provide a fair and transparent refund process for
                    ticket purchases. Refund eligibility depends on the event organizer’s
                    terms, the type of ticket purchased, and the timing of your request.
                    Unless otherwise stated on the event page, refund requests may be
                    submitted within 30 days of the original purchase date. After this
                    30-day period, refunds cannot be issued. Learn more about our {" "}
                    <Link to="/refund-policy" style={{ color: "#2563eb", textDecoration: "underline", fontWeight: "600" }}>refund policy</Link>.
                </>
            ),
        }

    ];

    return (
        <>
            <Navbar />
            <div className='main-container'>
                <div className="contact-page-layout" style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px' }}>

                        <ContactForm />

                        <div className="map-container">
                            <h2>Find Us</h2>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.9873196845941!3d40.75889497932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1622222222222!5m2!1sen!2sus"
                                width="100%"
                                height="400"
                                style={{ border: 0, borderRadius: '8px' }}
                                allowFullScreen=""
                                loading="lazy">
                            </iframe>
                        </div>
                    </div>

                    <div className="faq-section" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Frequently Asked Questions</h2>
                        <div className="accordion-list">
                            {faqData.map((item, index) => (
                                <AccordionItem key={index} question={item.question} answer={item.answer} />
                            ))}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default ContactPage;