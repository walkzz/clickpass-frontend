import { useState, useEffect } from 'react';
import '../styles/Admin.css';

const ManageTicketsTab = () => {
  const [events, setEvents] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState('');
  const [offerings, setOfferings] = useState([]);
  const [orders, setOrders] = useState([]); 
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    totalQuantity: '',
    saleStart: '',
    saleEnd: ''
  });

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:3000/api/events/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) setEvents(await res.json());
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!selectedEventId) {
      setOfferings([]);
      setOrders([]);
      return;
    }

    const fetchEventData = async () => {
      const token = localStorage.getItem('token');
      const headers = { 'Authorization': `Bearer ${token}` };

      const offRes = await fetch(`http://localhost:3000/api/events/${selectedEventId}/ticket-offerings`);
      if (offRes.ok) setOfferings(await offRes.json());

      const ordRes = await fetch(`http://localhost:3000/api/orders/event/${selectedEventId}`, { headers });
      if (ordRes.ok) setOrders(await ordRes.json());
    };
    
    fetchEventData();
  }, [selectedEventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    const res = await fetch('http://localhost:3000/api/ticket-offerings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({ ...formData, eventId: selectedEventId })
    });

    if (res.ok) {
      setFormData({ name: '', price: '', totalQuantity: '', saleStart: '', saleEnd: '' });
      const updatedOfferings = await fetch(`http://localhost:3000/api/events/${selectedEventId}/ticket-offerings`);
      if (updatedOfferings.ok) setOfferings(await updatedOfferings.json());
    } else {
      const errorData = await res.json();
      alert(`Failed to create offering: ${errorData.message}`);
    }
  };

  return (
    <div className="management-card">
      <h2 className="management-title">Manage Tickets & Orders</h2>
      
      <div style={{ marginBottom: '30px' }}>
        <label className="input-label">Select Event</label>
        <select 
          className="auth-input" 
          value={selectedEventId} 
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">-- Choose an event --</option>
          {events.map(evt => (
            <option key={evt._id} value={evt._id}>{evt.title}</option>
          ))}
        </select>
      </div>

      {selectedEventId && (
        <>
          {/* create offering and see current offerings */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
            <div style={{ backgroundColor: '#f9fafb', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
              <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>Create New Offering</h3>
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <label className="input-label">Ticket Name (e.g., VIP)</label>
                  <input type="text" className="auth-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div className="input-group">
                    <label className="input-label">Price (€)</label>
                    <input type="number" min="0" step="0.01" className="auth-input" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
                  </div>
                  <div className="input-group">
                    <label className="input-label">Total Qty</label>
                    <input type="number" min="1" className="auth-input" required value={formData.totalQuantity} onChange={e => setFormData({...formData, totalQuantity: e.target.value})} />
                  </div>
                </div>

                <div className="input-group">
                  <label className="input-label">Sale Start Date</label>
                  <input type="date" className="auth-input" value={formData.saleStart} onChange={e => setFormData({...formData, saleStart: e.target.value})} />
                </div>
                <div className="input-group">
                  <label className="input-label">Sale End Date</label>
                  <input type="date" className="auth-input" value={formData.saleEnd} onChange={e => setFormData({...formData, saleEnd: e.target.value})} />
                </div>

                <button type="submit" className="btn-pink" style={{ width: '100%', marginTop: '10px' }}>Add Ticket Offering</button>
              </form>
            </div>

            <div>
              <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '18px' }}>Current Offerings</h3>
              {offerings.length === 0 ? (
                <p style={{ color: '#6b7280' }}>No tickets created for this event yet.</p>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Inventory</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offerings.map(off => (
                      <tr key={off._id}>
                        <td style={{ fontWeight: 'bold' }}>{off.name}</td>
                        <td>€{off.price.toFixed(2)}</td>
                        <td>{off.soldQuantity} / {off.totalQuantity}</td>
                        <td>
                          <span style={{ color: off.isActive ? 'green' : 'red', fontWeight: 'bold', fontSize: '12px' }}>
                            {off.isActive ? 'ACTIVE' : 'INACTIVE'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* orders section*/}
          <div style={{ marginTop: '40px', backgroundColor: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', color: '#111827' }}>Recent Orders</h3>
            
            {orders.length === 0 ? (
              <p style={{ color: '#6b7280' }}>No orders have been placed for this event yet.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Buyer</th>
                    <th>Tickets Purchased</th>
                    <th>Total Paid</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => {
                    const ticketCounts = {};
                    order.tickets.forEach(t => {
                        const name = t.ticketId?.ticketOfferingId?.name || 'Standard (Deleted)';
                        ticketCounts[name] = (ticketCounts[name] || 0) + 1;
                    });
                    const ticketSummary = Object.entries(ticketCounts).map(([name, count]) => `${count}x ${name}`).join(', ');

                    return (
                      <tr key={order._id}>
                        <td style={{ fontSize: '13px', color: '#6b7280', fontFamily: 'monospace' }}>
                          {order._id.substring(0,8).toUpperCase()}
                        </td>
                        <td>
                          <div style={{ fontWeight: '600', color: '#111827' }}>{order.userId?.fullName || 'Guest'}</div>
                          <div style={{ fontSize: '12px', color: '#6b7280' }}>{order.userId?.email}</div>
                        </td>
                        <td style={{ color: '#4b5563' }}>{ticketSummary}</td>
                        <td style={{ fontWeight: 'bold', color: '#10b981' }}>€{order.totalAmount.toFixed(2)}</td>
                        <td>
                          <span style={{ 
                            backgroundColor: order.paymentStatus === 'paid' ? '#dcfce7' : '#fef3c7', 
                            color: order.paymentStatus === 'paid' ? '#166534' : '#b45309', 
                            padding: '4px 8px', 
                            borderRadius: '99px', 
                            fontSize: '12px', 
                            fontWeight: 'bold', 
                            textTransform: 'uppercase' 
                          }}>
                            {order.paymentStatus}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageTicketsTab;