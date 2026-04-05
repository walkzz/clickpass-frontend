import { useState } from 'react';
import '../styles/Admin.css';

const EventForm = ({ eventToEdit, onSave}) => {
  const [formData, setFormData] = useState({
    title: eventToEdit?.title || '',
    shortDescription: '', 
    description: eventToEdit?.description || '',
    category: eventToEdit?.Category || 'Theater',
    location: eventToEdit?.location?.city || '',
    date: eventToEdit?.date ? eventToEdit.date.split('T')[0] : '',
    startTime: eventToEdit?.startTime || '',
    venue: eventToEdit?.venue || '',
    capacity: eventToEdit?.capacity || ''
  });

  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const submitData = new FormData();
    submitData.append('title', formData.title);
    submitData.append('description', formData.description);
    submitData.append('Category', formData.category.toUpperCase());
    submitData.append('venue', formData.venue);
    submitData.append('date', formData.date);
    submitData.append('startTime', formData.startTime);
    submitData.append('capacity', formData.capacity);

    submitData.append('location', JSON.stringify({ city: formData.location, address: 'TBD', country: 'TBD' }));
    // submitData.append('ticketTypes', JSON.stringify([{ type: 'General', price: 0, quantity: 500 }]));

    if (imageFile) {
        submitData.append('image', imageFile);
    }

    const url = eventToEdit 
      ? `http://localhost:3000/api/events/${eventToEdit._id}` 
      : 'http://localhost:3000/api/events';
    const method = eventToEdit ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: submitData
      });

      if (response.ok) {
        onSave();
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to save event');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError('Server error. Please ensure the backend is running.');
    }
  };

  return (
    <div>
      
      <div className="event-form-container">
        <h2 className="management-title">{eventToEdit ? 'Edit Event' : 'Create New Event'}</h2>
        <p style={{color: '#6b7280', marginBottom: '30px', fontSize: '14px'}}>
          {eventToEdit ? 'Update the details for this event below.' : 'Fill out the form below to add a new event to the platform.'}
        </p>

        {error && <p style={{color: 'red', marginBottom: '15px'}}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Event Title</label>
            <input type="text" className="auth-input" placeholder="" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required />
          </div>

          {/* <div className="input-group">
            <label className="input-label">Short Description</label>
            <textarea className="auth-input" rows="2" placeholder="" value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} />
          </div> */}

          <div className="input-group">
            <label className="input-label">Long Description</label>
            <textarea className="auth-input" rows="4" placeholder="" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required />
          </div>

          <div className="form-grid-2">
            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="auth-input" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                <option value="Theater">Theater</option>
                <option value="Concert">Concert</option>
                <option value="Cinema">Cinema</option>
                <option value="Opera">Opera</option>
              </select>
            </div>
            <div className="input-group">
              <label className="input-label">Location</label>
              <input type="text" className="auth-input" placeholder="e.g Skopje" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} required />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="input-group">
              <label className="input-label">Date</label>
              <input type="date" className="auth-input" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
            </div>
            <div className="input-group">
              <label className="input-label">Time</label>
              <input type="time" className="auth-input" value={formData.startTime} onChange={(e) => setFormData({...formData, startTime: e.target.value})} required />
            </div>
            <div className="input-group">
              <label className="input-label">Venue</label>
              <input type="text" className="auth-input" placeholder="e.g Boris Trajkovski" value={formData.venue} onChange={(e) => setFormData({...formData, venue: e.target.value})} required />
            </div>
          </div>

          <div className="input-group">
            <label className="input-label">Venue Capacity</label>
            <input type="number" min="1" className="auth-input" placeholder="" value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} required />
          </div>

          <div className="input-group" style={{ marginBottom: '10px' }}>
            <label className="input-label">Event Image</label>
            <input 
                type="file" 
                className="auth-input" 
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
            />
          </div>

          <button type="submit" className="btn-pink" style={{ marginTop: '10px' }}>
            {eventToEdit ? 'Save Changes' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventForm;