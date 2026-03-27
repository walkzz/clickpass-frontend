import { useState, useEffect } from 'react';
import EventForm from './EventForm';
import '../styles/EventTab.css';

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
          <span className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-drama h-4 w-4 text-muted-foreground"><path d="M10 11h.01"></path><path d="M14 6h.01"></path><path d="M18 6h.01"></path><path d="M6.5 13.1h.01"></path><path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3"></path><path d="M17.4 9.9c-.8.8-2 .8-2.8 0"></path><path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7"></path><path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4"></path></svg>
          </span>
        </div>
        <div className="stat-card">
          <div>
            <p className="stat-card-title">Tickets Sold</p>
            <p className="stat-card-value">{stats.totalTickets}</p>
          </div>
          <span className="stat-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-ticket h-4 w-4 text-muted-foreground"><path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"></path><path d="M13 5v2"></path><path d="M13 17v2"></path><path d="M13 11v2"></path></svg>
          </span>
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
          <button onClick={handleCreateClick} className="btn-pink btn-management-event"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-circle-plus mr-2 h-4 w-4"><circle cx="12" cy="12" r="10"></circle><path d="M8 12h8"></path><path d="M12 8v8"></path></svg>
            Create Event</button>
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
                        <button onClick={() => handleEditClick(event)} className="action-icon">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square-pen h-4 w-4"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"></path></svg>
                        </button>
                      )}
                      <button onClick={() => handleDelete(event._id)} className="action-icon" style={{color: 'red'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash2 h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>
                      </button>
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