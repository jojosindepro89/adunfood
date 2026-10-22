// src/components/FamilyFeastPromo.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag } from 'lucide-react';

export default function FamilyFeastPromo() {
  const { meals, addToCart, setIsCartOpen, formatNaira } = useApp();

  const feastMeal = meals.find(m => m.id === 'meal-5') || {
    id: 'meal-5',
    name: 'Family Feast Platter',
    price: 28500,
    category: 'Combos',
    image: '/images/family_feast.jpg'
  };

  const handleOrderFeast = () => {
    addToCart(feastMeal, 1);
    setIsCartOpen(true);
  };

  return (
    <section className="promo-banner-section">
      <div className="promo-banner-card">
        {/* Left Side: Orange Content */}
        <div className="promo-banner-content">
          <span className="promo-badge">FAMILY MEAL</span>
          <h2 className="promo-title">Feed the whole table</h2>
          <p className="promo-description">
            Get our huge family feast with party jollof, grilled chicken, plantain,
            moi moi and drinks for four.
          </p>

          <div className="promo-price-group">
            <span className="promo-price-current">₦28,500</span>
            <span className="promo-price-old">₦35,000</span>
          </div>

          <button onClick={handleOrderFeast} className="btn-order-feast">
            <ShoppingBag size={18} />
            <span>Order this feast</span>
          </button>
        </div>

        {/* Right Side: Dish Image */}
        <div className="promo-banner-media">
          <img 
            src="/images/family_feast.jpg" 
            alt="Family feast Nigerian food platter spread" 
            className="promo-dish-img"
          />
        </div>
      </div>
    </section>
  );
}
