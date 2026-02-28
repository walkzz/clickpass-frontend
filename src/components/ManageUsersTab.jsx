import { useState, useEffect } from 'react';

const ManageUsersTab = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch('http://localhost:3000/api/admin/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    if (res.ok) setUsers(await res.json());
  };

  const toggleStatus = async (id, currentStatus) => {
    const token = localStorage.getItem('token');
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    await fetch(`http://localhost:3000/api/admin/users/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ status: newStatus })
    });
    fetchUsers();
  };

  const toggleRole = async (id, currentRole) => {
    if (currentRole === 'admin') return; // can't demote an admin
    
    const token = localStorage.getItem('token');
    const newRole = currentRole === 'organizer' ? 'user' : 'organizer';
    
    await fetch(`http://localhost:3000/api/admin/users/${id}/role`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ role: newRole })
    });
    fetchUsers(); // Refresh list
  };
  
  useEffect(() => { fetchUsers(); }, []);

  return (
    <div className="management-card">
      <h2 className="management-title">User Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td style={{ fontWeight: '500' }}>{user.fullName}</td>
              <td>{user.email}</td>
              <td>
                <span className="category-badge" style={{textTransform: 'uppercase', backgroundColor: user.role === 'organizer' ? '#fcd34d' : ''}}>
                  {user.role}
                </span>
              </td>
              <td>
                <span style={{ color: user.status === 'active' ? 'green' : 'red', fontWeight: 'bold' }}>
                  {user.status.toUpperCase()}
                </span>
              </td>
              <td style={{ textAlign: 'right' }}>
                <button onClick={() => toggleStatus(user._id, user.status)} className="btn-pink" style={{padding: '5px 15px', fontSize: '12px'}}>
                  {user.status === 'active' ? 'Block' : 'Unblock'}
                </button>

                {user.role !== 'admin' && (
                  <button 
                    onClick={() => toggleRole(user._id, user.role)} 
                    className="btn-pink" 
                    style={{
                      padding: '5px 15px', 
                      fontSize: '12px', 
                      marginLeft: '10px', 
                      backgroundColor: user.role === 'organizer' ? '#9ca3af' : '#f97316' 
                    }}
                  >
                    {user.role === 'organizer' ? 'Demote' : 'Make Organizer'}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsersTab;