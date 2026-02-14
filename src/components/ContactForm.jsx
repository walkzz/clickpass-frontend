import { useState } from 'react';

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
        <div className="contact-form-container" style={{ padding: '20px', maxWidth: '500px' }}>
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input 
                    type="text" name="firstName" placeholder="First Name" 
                    value={formData.firstName} onChange={handleChange} required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input 
                    type="text" name="lastName" placeholder="Last Name" 
                    value={formData.lastName} onChange={handleChange} required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input 
                    type="email" name="email" placeholder="Email" 
                    value={formData.email} onChange={handleChange} required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <textarea 
                    name="message" placeholder="Your Message" rows="5"
                    value={formData.message} onChange={handleChange} required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" style={{ padding: '10px', background: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                    Send Message
                </button>
            </form>
            {status && <p style={{ marginTop: '10px' }}>{status}</p>}
        </div>
    );
};

export default ContactForm;