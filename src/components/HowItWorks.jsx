// src/components/HowItWorks.jsx
import React from 'react';
import { ShieldCheck, Clock, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Choose your favourites',
      desc: 'Browse the menu and add handcrafted meals to your cart.'
    },
    {
      num: '02',
      title: 'Send on WhatsApp',
      desc: 'Share your order details and delivery info with one tap.'
    },
    {
      num: '03',
      title: 'Confirm & enjoy',
      desc: 'We confirm your order and payment is arranged seamlessly on WhatsApp.'
    }
  ];

  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="how-it-works-container">
        {/* Section Header */}
        <div className="how-it-works-header">
          <span className="how-eyebrow">SIMPLE, FAST & DELICIOUS</span>
          <h2 className="how-title">Your meal is three steps away</h2>
        </div>

        {/* 3 Step Cards */}
        <div className="steps-grid">
          {steps.map(step => (
            <div key={step.num} className="step-card">
              <span className="step-number">{step.num}</span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Guarantee Info Banner */}
        <div className="guarantee-banner">
          <div className="guarantee-icon-box">
            <ShieldCheck size={18} />
          </div>
          <span className="guarantee-text">
            Estimated delivery time: 30-45 mins. Pay cash on delivery or online bank transfer on WhatsApp.
          </span>
        </div>
      </div>
    </section>
  );
}
