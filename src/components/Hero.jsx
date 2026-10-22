// src/components/Hero.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Star, Clock, Sparkles } from 'lucide-react';

export default function Hero() {
  const { settings } = useApp();

  const handleWhatsAppDirect = () => {
    const rawNumber = settings.whatsappPhone || '+2348142004872';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${settings.kitchenName}! 👋\n\nI would like to order some delicious authentic Nigerian food delivered today. Could you share today's available menu specials? Thank you!`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  const scrollToMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) menuEl.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero-section">
      <div className="hero-container">
        {/* Left Column: Headline & Value Proposition */}
        <div className="hero-content">
          {/* Top Pill Tag */}
          <div className="hero-tag">
            <span className="hero-tag-line"></span>
            <span className="hero-tag-text">MADE FRESH DAILY IN LAGOS</span>
            <span className="hero-tag-line"></span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-headline">
            Authentic<br />
            Nigerian Food,<br />
            <span className="hero-headline-accent">Delivered Fresh.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext">
            From smoky party jollof to rich, comforting soups—enjoy the true taste
            of home, made with love and delivered to your door.
          </p>

          {/* Action Buttons */}
          <div className="hero-ctas">
            <button onClick={scrollToMenu} className="btn-primary-orange">
              <span>Explore our menu</span>
              <ArrowRight size={18} />
            </button>
            <button onClick={handleWhatsAppDirect} className="btn-secondary-whatsapp">
              <span className="wa-icon-dot"></span>
              <span>Order on WhatsApp</span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="hero-social-proof">
            <div className="avatar-group">
              <img 
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Happy customer" 
                className="avatar-img"
              />
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Happy customer" 
                className="avatar-img"
              />
              <img 
                src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&h=120&q=80" 
                alt="Happy customer" 
                className="avatar-img"
              />
            </div>
            <div className="rating-info">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <span className="rating-text">5.0 rating (1,200+ foodies)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Circular Food Platter Visual with Floating Badges */}
        <div className="hero-visual">
          <div className="hero-visual-backdrop"></div>
          
          <div className="hero-platter-wrapper">
            <div className="hero-circle-frame">
              <img 
                src="/images/jollof.jpg" 
                alt="Authentic Nigerian feast: smoky party jollof with grilled chicken and plantain" 
                className="hero-main-dish-img"
              />
            </div>

            {/* Floating Badge Top-Right */}
            <div className="floating-badge badge-top-right">
              <span className="badge-dot-orange"></span>
              <div className="badge-text-group">
                <span className="badge-title">Freshly made daily</span>
                <span className="badge-sub">in our kitchen</span>
              </div>
            </div>

            {/* Floating Badge Bottom-Left */}
            <div className="floating-badge badge-bottom-left">
              <div className="badge-icon-box">
                <Clock size={16} />
              </div>
              <div className="badge-text-group">
                <span className="badge-title">Fast delivery</span>
                <span className="badge-sub">30-45 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
