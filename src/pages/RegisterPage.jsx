import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault(); 
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify({ id: data._id, fullName: data.fullName, role: data.role }));
        
        navigate('/home');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please ensure the backend is running.');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <h1 className="auth-title">Create account</h1>
          
          {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</p>}
          
          <form onSubmit={handleRegister}>
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input 
                type="text" 
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="auth-input" 
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Email address</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input" 
                required 
              />
            </div>

            <div className="input-group">
              <label className="input-label">Create password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? "text" : "password"} 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
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

            <button type="submit" className="auth-btn-primary">Register</button>

            <p className="legal-text">
              By creating an account, you agree to the <span className="link-text">Terms of use</span> and <span className="link-text">Privacy Policy.</span>
            </p>
          </form>
        </div>

        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">Already have an account?</span>
          <div className="divider-line"></div>
        </div>

        <NavLink to="/login" className="create-account-btn">Sign in</NavLink>
      </div>
    </div>
  );
};

export default RegisterPage;