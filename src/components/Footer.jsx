// src/components/Footer.jsx
import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  const { settings, storeOpen } = useApp();

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-container">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="brand-logo footer-brand">
            <div className="brand-badge light">
              <span className="brand-badge-letter">À</span>
            </div>
            <div className="brand-text">
              <span className="brand-title text-white">Àdùn</span>
              <span className="brand-subtitle text-orange">KITCHEN</span>
            </div>
          </div>
          <p className="footer-desc">
            Authentic Nigerian dining delivered fresh and hot across Lagos. Crafted with passion, authentic spices, and true love for our rich food heritage.
          </p>
          <div className="footer-status-pill">
            <span className={`status-indicator-dot ${storeOpen ? 'open' : 'closed'}`}></span>
            <span className="status-indicator-text">{storeOpen ? 'Kitchen Open & Cooking' : 'Kitchen Closed'}</span>
          </div>
        </div>

        {/* Explore Links */}
        <div className="footer-col">
          <h4 className="footer-col-title">Explore</h4>
          <ul className="footer-links-list">
            <li><a href="#menu">Our Menu</a></li>
            <li><a href="#menu">Party Jollof Specials</a></li>
            <li><a href="#menu">Soups & Swallows</a></li>
            <li><a href="#menu">Family Feast Combos</a></li>
          </ul>
        </div>

        {/* Visit & Connect */}
        <div className="footer-col">
          <h4 className="footer-col-title">Visit & Connect</h4>
          <ul className="footer-contact-list">
            <li className="contact-item">
              <MapPin size={17} className="contact-icon" />
              <span>{settings.address}</span>
            </li>
            <li className="contact-item">
              <Phone size={17} className="contact-icon" />
              <a href={`tel:${settings.whatsappPhone}`}>{settings.displayPhone}</a>
            </li>
            <li className="contact-item">
              <Mail size={17} className="contact-icon" />
              <a href={`mailto:${settings.email}`}>{settings.email}</a>
            </li>
          </ul>
        </div>

        {/* Opening Hours */}
        <div className="footer-col">
          <h4 className="footer-col-title">Opening hours</h4>
          <div className="hours-block">
            <p className="hours-row">
              <span className="days">Mon - Sat:</span>
              <span className="times">10:00am - 9:00pm</span>
            </p>
            <p className="hours-row">
              <span className="days">Sunday:</span>
              <span className="times">12:00pm - 8:00pm</span>
            </p>
          </div>
          <div className="footer-badge-open">
            <span className="dot"></span>
            <span>{storeOpen ? 'Open Now' : 'Currently Closed'}</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2026 Àdùn Kitchen. All rights reserved.</p>
          <p className="footer-credit">
            Crafted for exceptional Nigerian cuisine lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}
