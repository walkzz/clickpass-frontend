import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPalette from '../components/AdminPalette';
import EventTab from '../components/EventTab';
import ManageUsersTab from '../components/ManageUsersTab';
import ManageBlogsTab from '../components/ManageBlogsTab';
import ManageTicketsTab from '../components/ManageTicketsTab';
import '../styles/Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('events');
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user || (user.role !== 'admin' && user.role !== 'organizer')) {
      navigate('/home'); 
    } else {
      setUserRole(user.role);
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events': 
        return <EventTab />;
      case 'users': 
        return userRole === 'admin' ? <ManageUsersTab /> : <div><h2>Unauthorized</h2></div>;
      case 'blogs': 
        return userRole === 'admin' ? <ManageBlogsTab /> : <div><h2>Unauthorized</h2></div>;
      // case 'stats': 
      //   return <div><h2>Stats Overview Tab (Coming Soon)</h2></div>;
      case 'tickets': 
        return (userRole === 'organizer' || userRole === 'admin') ? <ManageTicketsTab /> : <div><h2>Unauthorized</h2></div>;
      default: 
        return <EventTab />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminPalette activeTab={activeTab} setActiveTab={setActiveTab} userRole={userRole} />
      
      <div className="admin-content">
        <button onClick={() => navigate('/home')} className="back-link">
          <span className="arrow">&larr;</span> Back to Home
        </button>

        <h1 style={{ fontSize: '28px', color: '#1f2937', marginBottom: '30px' }}>
          {userRole === 'admin' ? 'Admin Dashboard' : 'Organizer Panel'}
        </h1>
        
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Admin;