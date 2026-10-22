// src/components/FeaturedMenu.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, Heart, Plus, Minus, ArrowRight, Search, X } from 'lucide-react';

export default function FeaturedMenu() {
  const { 
    meals, 
    selectedCategory, 
    setSelectedCategory,
    searchQuery, 
    setSearchQuery,
    addToCart, 
    cart, 
    updateCartQuantity,
    wishlist, 
    toggleWishlist,
    formatNaira,
    setSelectedMealDetails 
  } = useApp();

  const [showAllMenu, setShowAllMenu] = useState(false);

  // Filter meals based on selected category and search query
  const filteredMeals = meals.filter(meal => {
    const matchesCategory = selectedCategory === 'All' || meal.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Display either the top featured items or full filtered list
  const displayMeals = (showAllMenu || selectedCategory !== 'All' || searchQuery)
    ? filteredMeals
    : meals.slice(0, 4);

  return (
    <section id="menu" className="featured-section">
      <div className="featured-container">
        {/* Section Header */}
        <div className="featured-header">
          <div className="featured-title-group">
            <span className="section-eyebrow">OUR CUSTOMERS' FAVOURITES</span>
            <h2 className="section-title">
              {selectedCategory !== 'All' ? selectedCategory : 'Featured this week'}
            </h2>
          </div>
          
          <div className="menu-search">
            <Search size={17} aria-hidden="true" />
            <input id="menu-search-input" type="search" placeholder="Search dishes" value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} aria-label="Search menu" />
            {searchQuery && <button type="button" className="menu-search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search"><X size={16} /></button>}
          </div>
          <button 
            onClick={() => {
              setShowAllMenu(!showAllMenu);
              if (selectedCategory !== 'All') setSelectedCategory('All');
            }} 
            className="view-all-link"
          >
            <span>{showAllMenu ? 'Show featured only' : 'View full menu'}</span>
            <ArrowRight size={17} />
          </button>
        </div>

        {/* Meals Grid */}
        {displayMeals.length === 0 ? (
          <div className="empty-menu-state">
            <p>No meals found matching "{searchQuery || selectedCategory}".</p>
            <button 
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="btn-reset-filter"
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="meals-grid">
            {displayMeals.map(meal => {
              const isFav = wishlist.includes(meal.id);
              const cartItem = cart.find(i => i.id === meal.id);
              const currentQty = cartItem ? cartItem.quantity : 0;

              return (
                <div key={meal.id} className="meal-card">
                  {/* Card Image Wrapper */}
                  <div className="meal-card-media" onClick={() => setSelectedMealDetails(meal)}>
                    <img 
                      src={meal.image} 
                      alt={meal.name} 
                      className="meal-card-img" 
                      loading="lazy"
                    />

                    {/* Badge */}
                    {meal.tag && (
                      <span className={`meal-badge badge-${meal.tagColor || 'orange'}`}>
                        {meal.tag}
                      </span>
                    )}

                    {/* Wishlist Heart */}
                    <button 
                      type="button"
                      className={`meal-card-wishlist ${isFav ? 'active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(meal.id);
                      }}
                      aria-label="Add to wishlist"
                    >
                      <Heart size={16} fill={isFav ? '#e25822' : 'none'} color={isFav ? '#e25822' : '#4b5563'} />
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="meal-card-body">
                    {/* Category & Rating Row */}
                    <div className="meal-card-meta">
                      <span className="meal-card-category">{meal.category?.toUpperCase()}</span>
                      <div className="meal-card-rating">
                        <Star size={13} fill="#f59e0b" color="#f59e0b" />
                        <span className="rating-num">{meal.rating.toFixed(1)}</span>
                      </div>
                    </div>

                    {/* Meal Title */}
                    <h3 
                      className="meal-card-title" 
                      onClick={() => setSelectedMealDetails(meal)}
                      title="View details"
                    >
                      {meal.name}
                    </h3>

                    {/* Short Description */}
                    <p className="meal-card-desc">
                      {meal.description}
                    </p>

                    {/* Price and Add to Cart Action */}
                    <div className="meal-card-footer">
                      <div className="meal-price-box">
                        <span className="meal-price-amount">{formatNaira(meal.price)}</span>
                      </div>

                      {currentQty > 0 ? (
                        <div className="meal-qty-stepper">
                          <button 
                            type="button" 
                            className="stepper-btn minus"
                            onClick={() => updateCartQuantity(meal.id, -1)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="stepper-count">{currentQty}</span>
                          <button 
                            type="button" 
                            className="stepper-btn plus"
                            onClick={() => updateCartQuantity(meal.id, 1)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          type="button"
                          className="btn-add-meal"
                          onClick={() => addToCart(meal, 1)}
                          disabled={!meal.inStock}
                        >
                          <Plus size={15} />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
