import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/PurchaseStatusCard.css';
import '../styles/HomePage.css';

const PurchaseStatusCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order, tickets, event, failed, message } = location.state || {};

  if (!event) {
    return (
      <div style={{ textAlign: 'center', marginTop: '100px' }}>
        <h2>No recent purchase found</h2>
        <button className="btn-pink" onClick={() => navigate('/events')}>Browse Events</button>
      </div>
    );
  }

  const formattedDate = event?.date
    ? new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  const isFailed = failed === true;

  return (
    <div className="status-page">
      <div className="hide-on-print"><Navbar /></div>

      <div className="status-container">
        <div className="status-card">

          {/* Header */}
          <div className="status-header hide-on-print">
            {isFailed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="50"
                height="50"
                fill="none"
                stroke="#f43f5e"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="success-check-icon"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#22c55e"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="success-check-icon"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            )}

            <h2 className={`main-title ${isFailed ? 'main-title--failed' : ''}`}>
              {isFailed ? 'Payment Failed!' : 'Purchase Confirmed!'}
            </h2>

            <p className="subtitle">
              {isFailed
                ? `Your order${order ? ` #${order._id.substring(0, 8).toUpperCase()}` : ''} didn't go through. ${message || 'Please contact our support for further information.'}`
                : `Your order #${order._id.substring(0, 8).toUpperCase()} is confirmed.`
              }
            </p>
          </div>

          {/* Order details */}
          <div className="order-details-box">
            <h3 className="section-title">Order Details</h3>
            {event?.title && <h4 className="event-title">{event.title}</h4>}

            {!isFailed && tickets?.length > 0 && (
              <>
                <div className="order-row">
                  <span className="row-label">Ticket Type</span>
                  <span className="row-value">{tickets[0]?.ticketType || 'Standard'}</span>
                </div>
                <div className="order-row">
                  <span className="row-label">Quantity</span>
                  <span className="row-value">{tickets.length}</span>
                </div>
              </>
            )}

            {formattedDate && (
              <>
                <hr className="divider" />
                <div className="event-date-venue">
                  <p><strong>Date:</strong> {formattedDate} at {event.startTime}</p>
                  <p><strong>Venue:</strong> {event.venue}, {event.location?.city}</p>
                </div>
              </>
            )}
          </div>

          {/* Tickets section — success only */}
          {!isFailed && tickets?.length > 0 && (
            <div className="your-tickets-section hide-on-print">
              <h4 className="your-tickets-title">Your Tickets</h4>
              <div className="ticket-action-buttons">
                <button className="btn-print" onClick={() => window.print()}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 6 2 18 2 18 9"></polyline>
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                    <rect x="6" y="14" width="12" height="8"></rect>
                  </svg>
                  Print Ticket
                </button>

                <a href={tickets[0]?.qrCode} download="Ticket-QR.png" className="btn-qr">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="5" height="5" x="3" y="3" rx="1"></rect>
                    <rect width="5" height="5" x="16" y="3" rx="1"></rect>
                    <rect width="5" height="5" x="3" y="16" rx="1"></rect>
                    <path d="M21 16h-3a2 2 0 0 0-2 2v3"></path>
                    <path d="M21 21v.01"></path>
                    <path d="M12 7v3a2 2 0 0 1-2 2H7"></path>
                    <path d="M3 12h.01"></path>
                    <path d="M12 3h.01"></path>
                    <path d="M12 16v.01"></path>
                    <path d="M16 12h1"></path>
                    <path d="M21 12v.01"></path>
                    <path d="M12 21v-1"></path>
                  </svg>
                  Get QR Code
                </a>
              </div>
            </div>
          )}

          <hr className="bottom-divider hide-on-print" />

          <div className="bottom-action hide-on-print">
            <button className="btn-home" onClick={() => navigate('/home')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Back to Homepage
            </button>
          </div>

        </div>
      </div>

      <div className="hide-on-print"></div><Footer />
    </div>
  );
};

export default PurchaseStatusCard;