// src/components/Navbar.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

export default function Navbar() {
  const { cartCount, setIsCartOpen, setCurrentView, currentView } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    if (currentView !== 'storefront') {
      setCurrentView('storefront');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="header-container">
        {/* Brand Logo */}
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollToSection('home'); }} 
          className="brand-logo"
        >
          <div className="brand-badge">
            <span className="brand-badge-letter">À</span>
          </div>
          <div className="brand-text">
            <span className="brand-title">Àdùn</span>
            <span className="brand-subtitle">KITCHEN</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          <button onClick={() => scrollToSection('home')} className="nav-link active">Home</button>
          <button onClick={() => scrollToSection('menu')} className="nav-link">Our Menu</button>
          <button onClick={() => scrollToSection('how-it-works')} className="nav-link">How it works</button>
          <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
        </nav>

        {/* Right Actions */}
        <div className="header-actions">
          {/* Quick Search */}
          <button 
            className="icon-btn" 
            title="Search menu"
            onClick={() => scrollToSection('menu')}
          >
            <Search size={19} />
          </button>

          {/* Cart Button */}
          <button 
            className="cart-pill-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <ShoppingBag size={18} />
            <span className="cart-label">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge-count">{cartCount}</span>
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <nav className="mobile-nav-links">
            <button onClick={() => scrollToSection('home')} className="mobile-nav-link">Home</button>
            <button onClick={() => scrollToSection('menu')} className="mobile-nav-link">Our Menu</button>
            <button onClick={() => scrollToSection('how-it-works')} className="mobile-nav-link">How it works</button>
            <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Contact & Location</button>
          </nav>
        </div>
      )}
    </header>
  );
}
