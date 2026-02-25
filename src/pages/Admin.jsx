import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminPalette from '../components/AdminPalette';
import EventTab from '../components/EventTab';
import ManageUsersTab from '../components/ManageUsersTab';
import ManageBlogsTab from '../components/ManageBlogsTab';
import '../styles/Admin.css';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('events');
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || user.role !== 'admin') {
      navigate('/home'); // Redirect to home if they don't have access
    }
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'events': return <EventTab />;
      case 'users': return <ManageUsersTab />;
      case 'blogs': return <ManageBlogsTab />;
      case 'stats': return <div><h2>Stats Overview Tab (Coming Soon)</h2></div>;
      case 'tickets': return <div><h2>Manage Tickets Tab (Coming Soon)</h2></div>;
      default: return <EventTab />;
    }
  };

  return (
    <div className="admin-layout">
      <AdminPalette activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="admin-content">
        <button onClick={() => navigate('/home')} className="back-link">
          <span className="arrow">&larr;</span> Back to Home
        </button>
        <h1 style={{ fontSize: '28px', color: '#1f2937', marginBottom: '30px' }}>Admin Dashboard</h1>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default Admin;