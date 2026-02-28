import { useState, useEffect } from 'react';
import EventForm from './EventForm';

const EventTab = () => {
  const [events, setEvents] = useState([]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem('token'); // Grab the security token
      
      // Call the secure dashboard route and attach the token in the headers
      const res = await fetch('http://localhost:3000/api/events/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (err) {
      console.error("Failed to fetch events");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if(!window.confirm("Are you sure you want to delete this event?")) return;
    
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`http://localhost:3000/api/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) fetchEvents(); // Refresh the table
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

  const closeForm = () => {
    setIsFormOpen(false);
    setEventToEdit(null);
  };

  if (isFormOpen) {
    return (
      <div className="management-card">
        <button onClick={closeForm} className="back-link" style={{marginBottom: '1rem'}}>
           Cancel
        </button>
        <EventForm 
          eventToEdit={eventToEdit} 
          onSave={() => {
            fetchEvents();
            closeForm();
          }} 
          onCancel={closeForm} 
        />
      </div>
    );
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
            <p className="stat-card-value">0</p>
          </div>
          <span className="stat-icon">🎟️</span>
        </div>
        <div className="stat-card">
          <div>
            <p className="stat-card-title">Total Revenue</p>
            <p className="stat-card-value">$0</p>
          </div>
          <span className="stat-icon">$</span>
        </div>
      </div>

      <div className="management-card">
        <div className="management-header">
          <h2 className="management-title">Event Management</h2>
          <button onClick={handleCreateClick} className="btn-pink">⊕ Create Event</button>
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
              events.map(event => (
                <tr key={event._id}>
                  <td style={{ fontWeight: '500' }}>{event.title}</td>
                  <td><span className="category-badge">{event.Category || 'Event'}</span></td>
                  <td>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td>{event.location?.city || 'TBD'}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button onClick={() => handleEditClick(event)} className="action-icon">✏️</button>
                    <button onClick={() => handleDelete(event._id)} className="action-icon" style={{color: 'red'}}>🗑️</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventTab;