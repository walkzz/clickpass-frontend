import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/EventDetail.css';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [availableTickets, setAvailableTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));
  const isOrganizer = user?.role === 'organizer';

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventRes = await fetch(`http://localhost:3000/api/events/${id}`);
        const eventData = await eventRes.json();
        setEvent(eventData);

        const offeringsRes = await fetch(`http://localhost:3000/api/events/${id}/ticket-offerings`);
        const offeringsData = await offeringsRes.json();
        setAvailableTickets(offeringsData);
        if (offeringsData.length > 0) setSelectedTicket(offeringsData[0]);

      } catch (error) {
        console.error("Failed to load event data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [id]);

  const handleTicketSelect = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleQuantityChange = (e) => {
    const val = parseInt(e.target.value, 10);
    if (val >= 1) {
      setQuantity(val);
    } else if (e.target.value === '') {
      setQuantity('');
    }
  };

  const handleQuantityBlur = () => {
    if (quantity === '' || quantity < 1) {
      setQuantity(1);
    }
  };

  const handleCheckout = () => {
    if (!selectedTicket) return;

    const checkoutData = { event, selectedTicket, quantity };
    const token = localStorage.getItem('token');

    if (!token) {
      sessionStorage.setItem('pendingCheckout', JSON.stringify(checkoutData));
      navigate('/login');
    } else {
      navigate('/checkout', { state: checkoutData });
    }
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Event...</div>;
  if (!event) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Event not found.</div>;

  const formattedDate = new Date(event.date || '2024-09-28').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });

  const totalAmount = selectedTicket ? (selectedTicket.price * quantity) : 0;

  return (
    <div className='event-detail-container'>
      <Navbar />

      <div className='event-detail-content'>
        <div className='event-content-container'>

          <Link to="/events" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to events
          </Link>

          <div className='event-content'>
            {event.image ? (
              <img
                className='event-content-image'
                src={`http://localhost:3000${event.image}`}
                alt={event.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}

            <div style={{ display: event.image ? 'none' : 'flex', width: '100%', height: '400px', backgroundColor: '#f3f4f6', borderRadius: '12px', alignItems: 'center', justifyContent: 'center', color: '#9ca3af' }}>
              No Event Image
            </div>

            <div className='event-description-container'>
              <span className='event-category'>
                🎵 {event.Category || 'Concert'}
              </span>

              <h1 className='event-description-header'>
                {event.title || 'Jazz Nights Under the Stars'}
              </h1>

              <p className='event-description-p'>
                {event.description || 'Unwind with Jazz Nights Under the Stars, a series of outdoor concerts featuring legendary jazz musicians and rising stars. The beautiful open-air amphitheater provides the perfect setting to enjoy soulful melodies and intricate improvisations. Bring a blanket, relax, and let the music carry you away.'}
              </p>

              {/* Yellow Info Chips (Updated with Location) */}
              <div className='event-details-container'>
                <div className='event-date-time'>
                  <div className='event-date'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    {formattedDate}
                  </div>
                  <div className='event-time'>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    {event.startTime || '19:00'}
                  </div>
                </div>
                <div className='event-location'>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {event.venue || 'Starlight Amphitheater'}, {event.location?.city || 'New Orleans, LA'}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* ticket selection section */}
        <div className='ticket-selection-container'>
          <div className='ticket-selection'>
            <h2 className='ticket-selection-header'>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 7V5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v2M4 17v2c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-2M4 7h16M4 17h16" />
                <circle cx="12" cy="12" r="2" fill="#f43f5e" />
              </svg>
              Buy Tickets
            </h2>

            {isOrganizer ? (
              <div className='ticket-selection-organizer'>
                Organizers cannot purchase tickets.
              </div>
            ) : (
              <>
                
                {/* ticket types */}
                <div className='ticket-types'>
                  <h3 className='ticket-types-header'>1. Select Ticket Type</h3>
                  <div className='ticket-types-container'>
                    {availableTickets.map(ticket => {
                      const isSelected = selectedTicket?._id === ticket._id;
                      return (
                        <div
                          key={ticket._id}
                          onClick={() => handleTicketSelect(ticket)}
                          style={{
                            border: isSelected ? '1px solid #f43f5e' : '1px solid #e5e7eb',
                            padding: '16px',
                            borderRadius: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: '#ffffff',
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <div>
                            <div style={{ fontSize: '14px', color: '#374151' }}>{ticket.name}</div>
                            <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>€{ticket.price.toFixed(2)}</div>
                          </div>

                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid #f43f5e' : '2px solid #d1d5db',
                            backgroundColor: 'white'
                          }} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* select quantity section */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontSize: '15px', color: '#4b5563', marginBottom: '16px', fontWeight: '400' }}>2. Select Quantity</h3>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    onBlur={handleQuantityBlur}
                    style={{
                      width: '100%',
                      padding: '16px',
                      backgroundColor: '#f9fafb',
                      border: '1px solid #f3f4f6',
                      borderRadius: '8px',
                      fontSize: '15px',
                      color: '#374151',
                      boxSizing: 'border-box',
                      outline: 'none'
                    }}
                  />
                </div>

                {/* total display section */}
                <div style={{ backgroundColor: '#f3f4f6', padding: '24px', borderRadius: '8px', textAlign: 'center', marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    Quantity: {quantity || 0}
                  </span>
                  <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#374151' }}>
                    €{totalAmount.toFixed(2)}
                  </span>
                </div>
                <button className='checkout-btn'
                  onClick={handleCheckout}
                  disabled={!selectedTicket}
                >
                  Proceed to Checkout
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </button>
              </>
            )}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;