import { useState, useEffect } from 'react';
import Navbar from "../components/Navbar";
import Toolbar from "../components/Toolbar";
import Assistant from "../components/Assistant";
import Footer from "../components/Footer";
import Search from "../components/Search";
import EventCard from "../components/EventCard";
import '../styles/HomePage.css';

const HomePage = () => {
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
    <>
      <Navbar />
      <div className='main-container'>
        <Toolbar />
        <Search />
        
        <div style={{ margin: '40px 0' }}>
          
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
                <p style={{ color: '#6b7280' }}>No events found. Check back later!</p>
              )}
            </div>
          )}
        </div>

        <Assistant />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;