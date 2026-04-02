import { useState } from 'react';
import '../styles/ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');

        try {
            const response = await fetch('http://localhost:3000/api/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus('Message sent successfully!');
                setFormData({ firstName: '', lastName: '', email: '', message: '' });
            } else {
                setStatus('Failed to send message.');
            }
        } catch (error) {
            console.error(error);
            setStatus('Error sending message.');
        }
    };

    return (
        <div className="contact-form-container">
            <h2>Contact Us</h2>
            <form className='submit-fields-container' onSubmit={handleSubmit}>
                <input 
                    className='submit-form-inputs'
                    type="text" name="firstName" placeholder="First Name" 
                    value={formData.firstName} onChange={handleChange} required 
                />
                <input 
                    className='submit-form-inputs'
                    type="text" name="lastName" placeholder="Last Name" 
                    value={formData.lastName} onChange={handleChange} required 
                />
                <input 
                    className='submit-form-inputs'
                    type="email" name="email" placeholder="Email" 
                    value={formData.email} onChange={handleChange} required 
                />
                <textarea 
                    className='submit-text-area'
                    name="message" placeholder="Your Message" rows="5"
                    value={formData.message} onChange={handleChange} required 
                />
                <button className='submit-message' type="submit">
                    Send Message
                </button>
            </form>
            {status && <p style={{ marginTop: '10px' }}>{status}</p>}
        </div>
    );
};

export default ContactForm;