import { useState } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import '../styles/Auth.css';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      const response = await fetch(`http://localhost:3000/api/auth/resetpassword/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Password successfully reset! Redirecting to login...');
        setTimeout(() => navigate('/login'), 3000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">Create New Password</h1>
          <p style={{textAlign: 'center', color: '#6b7280', marginBottom: '20px', fontSize: '14px'}}>
            Please enter your new password below.
          </p>
          
          {message && <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>{message}</p>}
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
          
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label className="input-label">New password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="auth-input" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
                <button 
                  type="button" 
                  className="toggle-password" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Confirm new password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                className="auth-input" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>

            <button type="submit" className="auth-btn-primary">Reset Password</button>
          </form>
        </div>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">Or</span>
          <div className="divider-line"></div>
        </div>

        <NavLink to="/login" className="create-account-btn">Back to Sign in</NavLink>
      </div>
    </div>
  );
};

export default ResetPasswordPage;