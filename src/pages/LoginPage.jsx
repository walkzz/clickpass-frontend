import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ id: data._id, fullName: data.fullName, role: data.role }));
        
        navigate('/home');
      } else {
        setError(data.message || 'Invalid email or password');
      }
    } catch (err) {
      setError('Server error. Please ensure the backend is running.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">Sign in</h1>
          
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
          
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label className="input-label">Email address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input" 
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Your password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input" 
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

            <button type="submit" className="auth-btn-primary">Log in</button>

            <p className="legal-text">
              By continuing, you agree to the <span className="link-text">Terms of use</span> and <span className="link-text">Privacy Policy.</span>
            </p>

            <div className="auth-links-row">
              <button type="button" className="secondary-link">Other issue with sign in</button>
              <NavLink to="/forgotPassword" className="secondary-link">Forget your password</NavLink>
            </div>
          </form>
        </div>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">New to our community</span>
          <div className="divider-line"></div>
        </div>

        <NavLink to="/register" className="create-account-btn">Create an account</NavLink>
      </div>
    </div>
  );
};

export default LoginPage;