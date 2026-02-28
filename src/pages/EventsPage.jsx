import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/events');
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <div style={{ padding: '2rem 1rem', maxWidth: '1536px', margin: '0 auto', flexGrow: 1, width: '100%' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>Discover All Events</h1>
        
        {loading ? (
          <p style={{ color: '#6b7280' }}>Loading events...</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {events.length > 0 ? (
              events.map(event => (
                <EventCard key={event._id} event={event} />
              ))
            ) : (
              <p style={{ color: '#6b7280' }}>No upcoming events right now.</p>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default EventsPage;