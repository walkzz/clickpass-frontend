import { useState, useEffect } from 'react';

const PaymentDetailsCard = ({ onValidityChange, showErrors }) => {
  const [card, setCard] = useState({ number: '', expiry: '', cvc: '' });
  const [touched, setTouched] = useState({ number: false, expiry: false, cvc: false });

  const numberValid = /^\d{16}$/.test(card.number.replace(/\s+/g, ''));
  const expiryValid = /^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(card.expiry);
  const cvcValid = /^\d{3,4}$/.test(card.cvc);

  const errors = {};
  if ((touched.number || showErrors) && !numberValid && card.number.length > 0) errors.number = 'Invalid card number';
  if ((touched.expiry || showErrors) && !expiryValid && card.expiry.length > 0) errors.expiry = 'Invalid expiry (MM/YY)';
  if ((touched.cvc || showErrors) && !cvcValid && card.cvc.length > 0) errors.cvc = 'Invalid CVC';

  const isFormValid = numberValid && expiryValid && cvcValid;

  useEffect(() => {
    onValidityChange(isFormValid);
  }, [isFormValid, onValidityChange]);

  const formatCard = (val) => val.replace(/\s+/g, '').replace(/(\d{4})/g, '$1 ').trim();
  const formatExpiry = (val) => val.replace(/\D/g, '').replace(/^(\d{2})(\d)/, '$1/$2').substring(0, 5);

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  return (
    <div className="payment-card">
      <h2 className="card-title">Payment Details</h2>
      
      <div className="input-group">
        <label className="input-label">Card Number</label>
        <div className="input-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-credit-card absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect width="20" height="14" x="2" y="5" rx="2"></rect><line x1="2" x2="22" y1="10" y2="10"></line></svg>
          <input 
            type="text" 
            placeholder="0000 0000 0000 0000" 
            className="payment-input"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: formatCard(e.target.value.replace(/[^\d ]/g, '')) })}
            onBlur={() => handleBlur('number')}
            maxLength="19"
          />
        </div>
        {errors.number && <span style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.number}</span>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="input-group">
          <label className="input-label">Expiry Date</label>
          <div className="input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>
            <input 
              type="text" 
              placeholder="MM/YY" 
              className="payment-input"
              value={card.expiry}
              onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
              onBlur={() => handleBlur('expiry')}
            />
          </div>
          {errors.expiry && <span style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.expiry}</span>}
        </div>

        <div className="input-group">
          <label className="input-label">CVC</label>
          <div className="input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-lock absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <input 
              type="text" 
              placeholder="123" 
              className="payment-input"
              value={card.cvc}
              onChange={(e) => setCard({ ...card, cvc: e.target.value.replace(/\D/g, '').substring(0, 4) })}
              onBlur={() => handleBlur('cvc')}
            />
          </div>
          {errors.cvc && <span style={{ color: '#f43f5e', fontSize: '12px', marginTop: '4px', display: 'block' }}>{errors.cvc}</span>}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetailsCard;