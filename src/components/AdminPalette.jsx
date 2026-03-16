import React from 'react';

const AdminPalette = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'events', label: 'Events' },
    // { id: 'stats', label: 'Stats Overview' },
    { id: 'tickets', label: 'Manage Tickets' },
    { id: 'users', label: 'Manage Users' },
    { id: 'blogs', label: 'Blog Management' },
  ];

  return (
    <div className="admin-sidebar">
      <h3 style={{ padding: '0 20px', color: '#9ca3af', fontSize: '12px', textTransform: 'uppercase', marginBottom: '10px' }}>
        Admin Panel
      </h3>
      {tabs.map(tab => (
        <button
          key={tab.id}
          className={`palette-btn ${activeTab === tab.id ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default AdminPalette;