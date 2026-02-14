import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import AccordionItem from "../components/AccordionItem";
import '../styles/HomePage.css'

const ContactPage = () => {
    const faqData = [
        { question: "How does the 1% per order pricing work?", answer: "We charge a small fee of 1% for every order processed through our platform." },
        { question: "How do I get started with Detalica?", answer: "Getting started is easy! Sign up for an account, set up your venue layout, add your menu items, and invite your team." },
        { question: "Can I use Detalica on mobile devices?", answer: "Yes, our platform is fully responsive and works on all mobile devices and tablets." },
        { question: "Is my data secure?", answer: "Absolutely. We use industry-standard encryption to ensure your data is always safe." },
    ];

    return (
        <>
            <Navbar />
            <div class='main-container'>
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