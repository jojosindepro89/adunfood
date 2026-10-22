// src/components/CategoryFilter.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { LayoutGrid, Utensils, Soup, Flame, Coffee, Sparkles, Award } from 'lucide-react';

const CATEGORIES = [
  { id: 'All', label: 'All', icon: LayoutGrid },
  { id: 'Rice Dishes', label: 'Rice Dishes', icon: Utensils },
  { id: 'Soups', label: 'Soups', icon: Soup },
  { id: 'Swallows', label: 'Swallows', icon: Award },
  { id: 'Grills', label: 'Grills', icon: Flame },
  { id: 'Snacks', label: 'Snacks', icon: Sparkles },
  { id: 'Drinks', label: 'Drinks', icon: Coffee },
  { id: 'Combos', label: 'Combos', icon: Award }
];

export default function CategoryFilter() {
  const { selectedCategory, setSelectedCategory } = useApp();

  return (
    <section className="category-section">
      <div className="section-header text-center">
        <span className="section-eyebrow">TASTE EXCEPTIONAL NIGERIAN FLAVOURS</span>
        <h2 className="section-title">What are you craving?</h2>
        <p className="section-subtitle">
          Explore our menu of freshly prepared Nigerian favourites.
        </p>
      </div>

      <div className="category-pills-wrapper">
        <div className="category-pills-row">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`category-pill ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                <div className="category-pill-icon">
                  <Icon size={17} />
                </div>
                <span className="category-pill-label">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
