import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Auth.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('A password reset link has been sent to your email.');
        setEmail('');
      } else {
        setError(data.message || 'Something went wrong. Please try again.');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Server error. Please ensure the backend is running.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        
        <div className="auth-card">
          <h1 className="auth-title">Reset Password</h1>
          <p style={{textAlign: 'center', color: '#6b7280', marginBottom: '20px', fontSize: '14px'}}>
            Enter the email associated with your account and we'll send you a link to reset your password.
          </p>
          
          {message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>{message}</p>}
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">Email address</label>
              <input 
                type="email" 
                className="auth-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="auth-btn-primary">Send Reset Link</button>
          </form>
        </div>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">Remember your password?</span>
          <div className="divider-line"></div>
        </div>

        <NavLink to="/login" className="create-account-btn">Back to Sign in</NavLink>

      </div>
    </div>
  );
};

export default ForgotPasswordPage;