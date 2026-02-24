import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const UserProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '5px' }}
        aria-label="User menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-user-round h-6 w-6">
          <path d="M18 20a6 6 0 0 0-12 0"></path>
          <circle cx="12" cy="10" r="4"></circle>
          <circle cx="12" cy="12" r="10"></circle>
        </svg>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          right: 0,
          top: '100%',
          marginTop: '8px',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          minWidth: '150px',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50,
          overflow: 'hidden'
        }}>
          
          <Link 
            to="/admin" 
            style={{ padding: '10px 16px', textDecoration: 'none', color: '#374151', borderBottom: '1px solid #e5e7eb' }}
            onClick={() => setIsOpen(false)}
          >
            Admin Panel
          </Link>

          <button 
            onClick={handleLogout}
            style={{ 
              padding: '10px 16px', 
              background: 'none', 
              border: 'none', 
              textAlign: 'left', 
              color: '#ef4444',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;