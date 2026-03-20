import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/ProfileDropDown.css';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    navigate('/login');
  };

  if (!user) {
    return (
      <button className='sign-in' 
        onClick={() => navigate('/login')}
      >
        Sign In
      </button>
    );
  }
  return (
    <div className='panel-open'>
      <button className='panel-button'
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round h-6 w-6">
          <path d="M18 20a6 6 0 0 0-12 0"></path>
          <circle cx="12" cy="10" r="4"></circle>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </button>

      {isOpen && (
        <div className='panel-options'>
          
          <Link 
            className='admin-button'
            to="/admin" 
            onClick={() => setIsOpen(false)}
          >
            Admin Panel
          </Link>

          <button className='logout-button'
            onClick={handleLogout}
          >
            <span>Log Out</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;