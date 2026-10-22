// src/components/CartDrawer.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MapPin } from 'lucide-react';

export default function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    cartTotal,
    deliveryFee,
    zones,
    selectedZoneId,
    setSelectedZoneId,
    selectedZone,
    formatNaira,
    setIsCheckoutOpen,
    settings
  } = useApp();

  const [orderNotes, setOrderNotes] = useState('');

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="drawer-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="text-orange" />
            <h3 className="drawer-title">Your Order</h3>
            <span className="drawer-count-badge">
              {cart.reduce((sum, i) => sum + i.quantity, 0)} items
            </span>
          </div>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="drawer-close-btn"
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content */}
        {cart.length === 0 ? (
          <div className="drawer-empty-state">
            <div className="empty-cart-icon-circle">
              <ShoppingBag size={36} />
            </div>
            <h4>Your cart is empty</h4>
            <p>Looks like you haven't added any delicious Nigerian dishes yet.</p>
            <button 
              onClick={() => setIsCartOpen(false)} 
              className="btn-primary-orange mt-4"
            >
              Browse Our Menu
            </button>
          </div>
        ) : (
          <>
            <div className="drawer-items-list">
              {cart.map(item => (
                <div key={item.id} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-thumb" />
                  
                  <div className="cart-item-info">
                    <h4 className="cart-item-name">{item.name}</h4>
                    <span className="cart-item-price-unit">{formatNaira(item.price)} each</span>
                    
                    {/* Stepper & Line Total */}
                    <div className="cart-item-actions">
                      <div className="cart-stepper">
                        <button 
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="cart-stepper-btn"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="cart-stepper-value">{item.quantity}</span>
                        <button 
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="cart-stepper-btn"
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      <span className="cart-item-line-total">
                        {formatNaira(item.price * item.quantity)}
                      </span>

                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="cart-item-remove-btn"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Zone Selector */}
            <div className="drawer-zone-box">
              <label className="zone-label">
                <MapPin size={15} className="text-orange" />
                <span>Delivery Area in Lagos</span>
              </label>
              <select 
                value={selectedZoneId}
                onChange={(e) => setSelectedZoneId(e.target.value)}
                className="zone-select"
              >
                {zones.map(z => (
                  <option key={z.id} value={z.id}>
                    {z.name} — {formatNaira(z.fee)} ({z.estTime})
                  </option>
                ))}
              </select>
            </div>

            {/* Free Delivery Bar */}
            {cartSubtotal < settings.freeDeliveryThreshold ? (
              <div className="free-delivery-progress-box">
                <div className="free-delivery-text">
                  Add <strong>{formatNaira(settings.freeDeliveryThreshold - cartSubtotal)}</strong> more for <strong>FREE Delivery</strong>!
                </div>
                <div className="progress-bar-track">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${Math.min(100, (cartSubtotal / settings.freeDeliveryThreshold) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="free-delivery-unlocked">
                🎉 Congratulations! You unlocked <strong>FREE Delivery</strong>!
              </div>
            )}

            {/* Order Summary & Checkout */}
            <div className="drawer-footer">
              <div className="summary-line">
                <span>Subtotal</span>
                <span className="summary-val">{formatNaira(cartSubtotal)}</span>
              </div>
              <div className="summary-line">
                <span>Delivery ({selectedZone.name})</span>
                <span className="summary-val">
                  {deliveryFee === 0 ? <strong className="text-green-600">FREE</strong> : formatNaira(deliveryFee)}
                </span>
              </div>
              <div className="summary-line total-line">
                <span>Total Amount</span>
                <span className="summary-total-val">{formatNaira(cartTotal)}</span>
              </div>

              <button 
                onClick={handleProceedToCheckout}
                className="btn-checkout-whatsapp"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
