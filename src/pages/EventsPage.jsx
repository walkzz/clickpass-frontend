import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";
import Footer from "../components/Footer";
import Toolbar from "../components/Toolbar";
import Search from "../components/Search";
import { useEventFilter } from '../hooks/useEventFilter';

const EventsPage = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { displayedEvents, handleSearch } = useEventFilter(allEvents);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/events');
        const data = await res.json();
        setAllEvents(data);
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
        <Toolbar title="Explore Events" subtitle="Find your next experience." />
        <Search events={allEvents} onSearch={handleSearch} />
        
        <div style={{ marginTop: '40px' }}>
          {loading ? (
            <p style={{ color: '#6b7280' }}>Loading events...</p>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px'
            }}>
              {displayedEvents.length > 0 ? (
                displayedEvents.map(event => (
                  <EventCard key={event._id} event={event} />
                ))
              ) : (
                <p style={{ color: '#6b7280', gridColumn: '1 / -1', textAlign: 'center', padding: '40px 0' }}>
                  No events found matching your search criteria.
                </p>
              )}
            </div>
          )}
        </div>
        <Footer />
      </div>
      
      
    </div>
  );
};

export default EventsPage;