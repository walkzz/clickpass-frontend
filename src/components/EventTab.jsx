import { useState, useEffect } from 'react';
import EventForm from './EventForm';

const EventTab = () => {
  const [events, setEvents] = useState([]);
  const [stats, setStats] = useState({ totalTickets: 0, totalRevenue: 0 });
  const [currentUser, setCurrentUser] = useState(null);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const fetchData = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      setCurrentUser(user);

      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const eventsRes = await fetch('http://localhost:3000/api/events/dashboard', { headers });
      if (eventsRes.ok) setEvents(await eventsRes.json());

      const statsRes = await fetch('http://localhost:3000/api/events/dashboard/stats', { headers });
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this event?")) return;
    
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchData(); 
    } catch (err) {
      console.error("Failed to delete event");
    }
  };

  const handleEditClick = (event) => {
    setEventToEdit(event);
    setIsFormOpen(true);
  };

  const handleCreateClick = () => {
    setEventToEdit(null);
    setIsFormOpen(true);
  };

  if (isFormOpen) {
    return <EventForm eventToEdit={eventToEdit} onSave={() => { setIsFormOpen(false); fetchData(); }} onCancel={() => setIsFormOpen(false)} />;
  }

  return (
    <div>
      <div className="stats-grid">
        <div className="stat-card">
          <div>
            <p className="stat-card-title">Total Events</p>
            <p className="stat-card-value">{events.length}</p>
          </div>
          <span className="stat-icon">🎭</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="stat-card-title">Tickets Sold</p>
            <p className="stat-card-value">{stats.totalTickets}</p>
          </div>
          <span className="stat-icon">🎟️</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="stat-card-title">Total Revenue</p> 
            <p className="stat-card-value">€{stats.totalRevenue.toFixed(2)}</p>
          </div>
          <span className="stat-icon">€</span>
        </div>
      </div>

      <div className="management-card">
        <div className="management-header">
          <h2 className="management-title">Event Management</h2>
          <button onClick={handleCreateClick} className="btn-pink">+ Create Event</button>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Event</th>
              <th>Category</th>
              <th>Date</th>
              <th>Location</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 ? (
               <tr><td colSpan="5" style={{textAlign: 'center', color: '#6b7280'}}>No events found. Create one!</td></tr>
            ) : (
              events.map(event => {
                const isOwner = currentUser && 
                ( currentUser.role === 'admin' || event.organizerId === currentUser.id || event.organizer === currentUser.id );

                return (
                  <tr key={event._id}>
                    <td style={{ fontWeight: '500' }}>{event.title}</td>
                    <td><span className="category-badge">{event.Category || 'Event'}</span></td>
                    <td>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td>{event.location?.city || 'TBD'}</td>
                    <td style={{ textAlign: 'right' }}>
                      {isOwner && (
                        <button onClick={() => handleEditClick(event)} className="action-icon">✏️</button>
                      )}
                      <button onClick={() => handleDelete(event._id)} className="action-icon" style={{color: 'red'}}>🗑️</button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTab;