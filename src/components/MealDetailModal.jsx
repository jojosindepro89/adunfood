// src/components/MealDetailModal.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Star, Clock, Flame, Plus, Minus, ShoppingBag, Heart } from 'lucide-react';

export default function MealDetailModal() {
  const { 
    selectedMealDetails, 
    setSelectedMealDetails, 
    addToCart, 
    formatNaira,
    wishlist,
    toggleWishlist
  } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [specialNotes, setSpecialNotes] = useState('');

  if (!selectedMealDetails) return null;

  const meal = selectedMealDetails;
  const isFav = wishlist.includes(meal.id);

  const handleAddToCart = () => {
    addToCart(meal, quantity, specialNotes);
    setSelectedMealDetails(null);
  };

  return (
    <div className="modal-backdrop" onClick={() => setSelectedMealDetails(null)}>
      <div className="modal-card meal-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button 
          onClick={() => setSelectedMealDetails(null)} 
          className="modal-close-floating-btn"
          aria-label="Close details"
        >
          <X size={20} />
        </button>

        {/* Media Top */}
        <div className="meal-detail-media">
          <img src={meal.image} alt={meal.name} className="meal-detail-img" />
          
          <button 
            type="button"
            className={`meal-detail-wishlist-btn ${isFav ? 'active' : ''}`}
            onClick={() => toggleWishlist(meal.id)}
            aria-label="Toggle favourite"
          >
            <Heart size={18} fill={isFav ? '#e25822' : 'none'} color={isFav ? '#e25822' : '#ffffff'} />
          </button>

          {meal.tag && (
            <span className={`meal-detail-tag badge-${meal.tagColor || 'orange'}`}>
              {meal.tag}
            </span>
          )}
        </div>

        {/* Content Body */}
        <div className="meal-detail-body">
          {/* Category & Rating */}
          <div className="meal-detail-meta-row">
            <span className="meal-detail-category">{meal.category?.toUpperCase()}</span>
            <div className="meal-detail-rating">
              <Star size={15} fill="#f59e0b" color="#f59e0b" />
              <span className="rating-value">{meal.rating.toFixed(1)}</span>
              <span className="rating-count">({meal.reviewsCount || 120} reviews)</span>
            </div>
          </div>

          <h2 className="meal-detail-title">{meal.name}</h2>

          {/* Quick Info Badges */}
          <div className="meal-detail-chips-row">
            <div className="detail-chip">
              <Clock size={14} className="text-orange" />
              <span>{meal.prepTime || '25-35 mins'}</span>
            </div>
            <div className="detail-chip">
              <Flame size={14} className="text-orange" />
              <span>{meal.spiceLevel || 'Medium Spicy'}</span>
            </div>
          </div>

          {/* Detailed Description */}
          <p className="meal-detail-description">
            {meal.longDescription || meal.description}
          </p>

          {/* Special Customization Notes */}
          <div className="detail-notes-group">
            <label className="detail-notes-label" htmlFor="dish-notes">
              Special instructions for the chef:
            </label>
            <input 
              id="dish-notes"
              type="text" 
              placeholder="e.g. Mild pepper, separate dodo, no onions..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              className="detail-notes-input"
            />
          </div>

          {/* Footer Controls: Quantity Stepper & Add Button */}
          <div className="meal-detail-footer">
            <div className="detail-stepper">
              <button 
                type="button" 
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="detail-stepper-btn"
                aria-label="Decrease quantity"
              >
                <Minus size={15} />
              </button>
              <span className="detail-stepper-val">{quantity}</span>
              <button 
                type="button" 
                onClick={() => setQuantity(q => q + 1)}
                className="detail-stepper-btn"
                aria-label="Increase quantity"
              >
                <Plus size={15} />
              </button>
            </div>

            <button 
              type="button"
              onClick={handleAddToCart}
              className="btn-detail-add"
              disabled={!meal.inStock}
            >
              <ShoppingBag size={18} />
              <span>
                Add to Order • {formatNaira(meal.price * quantity)}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
