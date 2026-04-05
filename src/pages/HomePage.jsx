import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Footer from "../components/Footer";
import Search from "../components/Search";
import EventCard from "../components/EventCard";
import Assistant from "../components/Assistant";
import { useEventFilter } from '../hooks/useEventFilter';
import '../styles/HomePage.css';

const HomePage = () => {
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
    <>
      <Navbar />
      <div className='main-container'>
        <Toolbar />
        <Search events={allEvents} onSearch={handleSearch} />
        
        <div style={{ margin: '40px 0'}}>
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
        <div className="section-divider" />
        <Assistant events={displayedEvents} />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;