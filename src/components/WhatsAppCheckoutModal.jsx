// src/components/WhatsAppCheckoutModal.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, MapPin, Phone, User, MessageSquare, CheckCircle, ShieldAlert } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function WhatsAppCheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartSubtotal,
    deliveryFee,
    cartTotal,
    zones,
    selectedZoneId,
    setSelectedZoneId,
    selectedZone,
    formatNaira,
    createOrder,
    getWhatsAppLink,
    setOrderConfirmation,
    settings
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!cart.length) {
      setFormError('Your cart is empty. Add a meal before checking out.');
      return;
    }
    if (!settings.whatsappPhone || settings.whatsappPhone.replace(/\D/g, '').length < 10) {
      setFormError('WhatsApp ordering is temporarily unavailable. Please contact the kitchen directly.');
      return;
    }
    if (!fullName.trim()) {
      setFormError('Please enter your full name.');
      return;
    }
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      setFormError('Enter a valid phone number with 10 to 15 digits.');
      return;
    }
    if (!address.trim()) {
      setFormError('Please provide your delivery street address in Lagos.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    // Create the order in store
    const newOrder = createOrder({
      customer: fullName.trim(),
      phone: phone.trim(),
      address: address.trim(),
      zoneName: selectedZone.name,
      notes: notes.trim(),
      paymentMethod
    });

    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}

    // Generate WhatsApp URL
    const waUrl = getWhatsAppLink(newOrder);

    // Open WhatsApp in a new tab/window
    window.open(waUrl, '_blank');

    // Show order confirmation modal
    setOrderConfirmation({
      order: newOrder,
      waUrl
    });

    setIsSubmitting(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="modal-backdrop" onClick={() => setIsCheckoutOpen(false)}>
      <div className="modal-card checkout-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-header-text">
            <span className="modal-eyebrow">FINAL STEP</span>
            <h3 className="modal-title">WhatsApp Order Checkout</h3>
          </div>
          <button 
            onClick={() => setIsCheckoutOpen(false)} 
            className="modal-close-btn"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="checkout-notice-banner">
          <div className="notice-icon">💬</div>
          <div className="notice-text">
            <strong>No online payment required now.</strong> Your order will be sent directly to <strong>{settings.kitchenName}</strong> on WhatsApp to confirm delivery time and arrange payment (Bank Transfer or Pay on Delivery).
          </div>
        </div>

        {formError && (
          <div className="form-error-alert">
            <ShieldAlert size={16} />
            <span>{formError}</span>
          </div>
        )}

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="checkout-form">
          {/* Customer Full Name */}
          <div className="form-group">
            <label className="form-label" htmlFor="cust-name">
              <User size={15} />
              <span>Your Full Name *</span>
            </label>
            <input 
              id="cust-name"
              type="text" 
              placeholder="e.g. Chidi Eze / Bola Adeyemi"
              value={fullName}
              maxLength={80}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* WhatsApp Phone Number */}
          <div className="form-group">
            <label className="form-label" htmlFor="cust-phone">
              <Phone size={15} />
              <span>WhatsApp Phone Number *</span>
            </label>
            <input 
              id="cust-phone"
              type="tel" 
              placeholder="e.g. +234 803 123 4567 or 08031234567"
              value={phone}
              maxLength={24}
              onChange={(e) => setPhone(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Lagos Delivery Zone */}
          <div className="form-group">
            <label className="form-label" htmlFor="cust-zone">
              <MapPin size={15} />
              <span>Delivery Area (Lagos) *</span>
            </label>
            <select 
              id="cust-zone"
              value={selectedZoneId}
              onChange={(e) => setSelectedZoneId(e.target.value)}
              className="form-input"
            >
              {zones.map(z => (
                <option key={z.id} value={z.id}>
                  {z.name} — {formatNaira(z.fee)} ({z.estTime})
                </option>
              ))}
            </select>
          </div>

          {/* Detailed Street Address */}
          <div className="form-group">
            <label className="form-label" htmlFor="cust-address">
              <MapPin size={15} />
              <span>Delivery Street Address *</span>
            </label>
            <input 
              id="cust-address"
              type="text" 
              placeholder="e.g. Plot 12 Admiralty Way, Flat 3B, Lekki Phase 1"
              value={address}
              maxLength={240}
              onChange={(e) => setAddress(e.target.value)}
              className="form-input"
              required
            />
          </div>

          {/* Special Instructions / Notes */}
          <div className="form-group">
            <label className="form-label" htmlFor="cust-notes">
              <MessageSquare size={15} />
              <span>Special Instructions / Dietary Preferences (Optional)</span>
            </label>
            <textarea 
              id="cust-notes"
              rows={2}
              placeholder="e.g. Extra spicy pepper sauce, cutlery needed, call at security gate..."
              value={notes}
              maxLength={500}
              onChange={(e) => setNotes(e.target.value)}
              className="form-textarea"
            />
          </div>

          {/* Payment Method Radio */}
          <div className="form-group">
            <label className="form-label">Payment Preference</label>
            <div className="payment-options-row">
              <label className={`payment-pill ${paymentMethod === 'Bank Transfer' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Bank Transfer"
                  checked={paymentMethod === 'Bank Transfer'}
                  onChange={() => setPaymentMethod('Bank Transfer')}
                />
                <span>🏦 Bank Transfer (Instant)</span>
              </label>

              <label className={`payment-pill ${paymentMethod === 'Pay on Delivery' ? 'selected' : ''}`}>
                <input 
                  type="radio" 
                  name="paymentMethod" 
                  value="Pay on Delivery"
                  checked={paymentMethod === 'Pay on Delivery'}
                  onChange={() => setPaymentMethod('Pay on Delivery')}
                />
                <span>💵 Pay on Delivery (Cash/POS)</span>
              </label>
            </div>
          </div>

          {/* Order Summary Mini-Box */}
          <div className="checkout-summary-box">
            <div className="summary-items-preview">
              <span className="summary-preview-title">Order Items ({cart.length})</span>
              <ul className="summary-preview-list">
                {cart.map(item => (
                  <li key={item.id}>
                    <span>{item.quantity}x {item.name}</span>
                    <span>{formatNaira(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="summary-fee-line">
              <span>Subtotal: {formatNaira(cartSubtotal)}</span>
              <span>Delivery: {deliveryFee === 0 ? 'FREE' : formatNaira(deliveryFee)}</span>
            </div>
            <div className="summary-grand-total">
              <span>Total to Pay:</span>
              <span className="total-amount">{formatNaira(cartTotal)}</span>
            </div>
          </div>

          {/* Submit CTA */}
          <button 
            type="submit" 
            className="btn-submit-whatsapp-order"
            disabled={isSubmitting}
          >
            <Send size={18} />
            <span>Send Order via WhatsApp ({formatNaira(cartTotal)})</span>
          </button>
        </form>
      </div>
    </div>
  );
}
