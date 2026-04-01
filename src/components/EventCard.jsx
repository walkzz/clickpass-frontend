import { useNavigate } from 'react-router-dom';
import '../styles/EventCard.css';

const EventCard = ({ event }) => {
  const navigate = useNavigate();
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', { 
    month: 'short', day: 'numeric', year: 'numeric' 
  });

  return (
    <div className='event-card-container' onClick={() => navigate(`/events/${event._id}`)} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div>
        <div className='event-card-header'>
          {event.image ? (
            <img className='event-card-image' src={`http://localhost:3000${event.image}`} alt={event.title} style={{ height: '200px', objectFit: 'cover' }} />
          ) : (
            <div style={{ height: '200px', backgroundColor: '#e5e7eb', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              No Image
            </div>
          )}
        </div>
        
        <div className='event-card-information'>
          <div className='event-type-container'>
            <div className='event-type' style={{ backgroundColor: '#f3f4f6' }}>
              {event.Category || 'Event'}
            </div>
          </div>
          
          <h3 className='event-title'>{event.title}</h3>
          
          <div className='event-details-container' style={{gap: '2px'}}>
            <div className='event-time-container'>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              <span>{formattedDate} • {event.startTime}</span>
            </div>
            
            <div className='event-location-container' style={{ marginTop: '8px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{event.venue}, {event.location?.city}</span>
            </div>
          </div>
        </div>
      </div>

      <div className='event-card-ticket-container'>
        <button className='event-card-button'
        // onMouseOver={(e) => e.target.style.backgroundColor = '#ea580c'}
        // onMouseOut={(e) => e.target.style.backgroundColor = '#f97316'}
        >
          Get Tickets
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right ml-2 h-4 w-4"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
        </button>
      </div>
    </div>
  );
};

export default EventCard;