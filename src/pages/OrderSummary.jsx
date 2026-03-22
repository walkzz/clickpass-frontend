import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import PaymentDetailsCard from '../components/PaymentDetailsCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/OrderSummary.css';

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { event, selectedTicket, quantity } = location.state || {};
  const [isFormValid, setIsFormValid] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!event || !selectedTicket || !quantity) navigate('/events');
  }, [event, selectedTicket, quantity, navigate]);

  if (!event || !selectedTicket || !quantity) return null; 

  const subtotal = selectedTicket.price * quantity;
  const processingFee = subtotal * 0.05;
  const total = subtotal + processingFee;

  const handlePayment = async () => {
    if (!isFormValid) return;
    setIsProcessing(true);

    const token = localStorage.getItem('token');
    
    try {
      const res = await fetch('http://localhost:3000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          eventId: event._id,
          paymentProvider: 'card',
          purchases: [{ ticketOfferingId: selectedTicket._id, quantity }]
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        navigate('/purchase-status', { state: { order: data.order, tickets: data.tickets, event } });
      } else {
        alert(data.message || 'Payment failed');
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="checkout-container">
      <div className="checkout-content">
        <Link to={`/events/${event._id}`} className="back-link">&larr; Back</Link>
        <h1 className='checkout-header'>Complete Purchase</h1>
        <div className="checkout-grid">
          <div className="summary-card">
            <h2 className="card-title">Order Summary</h2>
            <div className="summary-row"><span style={{ fontWeight: 500, color: '#111827' }}>{event.title}</span></div>
            <div className="summary-row"><span>{selectedTicket.name} (x{quantity})</span><span>€{subtotal.toFixed(2)}</span></div>
            <div className="summary-row"><span>Processing Fee (5%)</span><span>€{processingFee.toFixed(2)}</span></div>
            <div className="summary-row total"><span>Total</span><span>€{total.toFixed(2)}</span></div>
          </div>

          <div>
            <PaymentDetailsCard onValidityChange={setIsFormValid} />
            
            <button 
              className="pay-btn" 
              onClick={handlePayment}
              disabled={!isFormValid || isProcessing}
              style={{ opacity: (!isFormValid || isProcessing) ? 0.6 : 1, cursor: (!isFormValid || isProcessing) ? 'not-allowed' : 'pointer' }}
            >
              {isProcessing ? 'Processing...' : `Pay €${total.toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default Checkout;