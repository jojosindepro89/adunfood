// src/components/OrderConfirmationModal.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, MessageCircle, Copy, Check } from 'lucide-react';

export default function OrderConfirmationModal() {
  const { orderConfirmation, setOrderConfirmation, formatNaira } = useApp();
  const [copied, setCopied] = React.useState(false);

  if (!orderConfirmation) return null;

  const { order, waUrl } = orderConfirmation;

  const handleCopy = () => {
    navigator.clipboard.writeText(order.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-backdrop" onClick={() => setOrderConfirmation(null)}>
      <div className="modal-card confirmation-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Celebration Header */}
        <div className="confirmation-header text-center">
          <div className="confirmation-icon-circle">
            <CheckCircle2 size={44} className="text-white" />
          </div>
          <span className="confirmation-badge">ORDER INITIATED</span>
          <h2 className="confirmation-title">Order Placed Successfully!</h2>
          <p className="confirmation-subtitle">
            Your delicious meal request has been generated and prepped for WhatsApp confirmation.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="confirmation-details-box">
          <div className="confirmation-detail-row">
            <span className="detail-label">Order Reference</span>
            <div className="reference-code-group">
              <strong className="reference-code">{order.id}</strong>
              <button 
                onClick={handleCopy} 
                className="copy-btn"
                title="Copy reference"
              >
                {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          <div className="confirmation-detail-row">
            <span className="detail-label">Customer</span>
            <span className="detail-val">{order.customer} ({order.phone})</span>
          </div>

          <div className="confirmation-detail-row">
            <span className="detail-label">Delivery Zone</span>
            <span className="detail-val">{order.zone}</span>
          </div>

          <div className="confirmation-detail-row">
            <span className="detail-label">Delivery Address</span>
            <span className="detail-val address">{order.address}</span>
          </div>

          <div className="confirmation-detail-row total-row">
            <span className="detail-label font-bold">Total Amount</span>
            <span className="detail-val font-bold text-orange">{formatNaira(order.total)}</span>
          </div>
        </div>

        {/* WhatsApp Action Buttons */}
        <div className="confirmation-actions">
          <a 
            href={waUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-whatsapp-direct"
          >
            <MessageCircle size={19} />
            <span>Open WhatsApp to Confirm Order</span>
          </a>

          <button 
            onClick={() => setOrderConfirmation(null)} 
            className="btn-close-confirmation"
          >
            Done & Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
}
