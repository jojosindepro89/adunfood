// src/components/Testimonials.jsx
import React from 'react';
import { Star } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    quote: '"This jollof has that proper smoky party flavour. My order arrived piping hot and the portion size was generous."',
    author: 'Amaka O.',
    location: 'Lekki'
  },
  {
    id: 2,
    quote: '"The egusi soup is exactly how my mother makes it back home in Enugu. Utterly delicious and fresh!"',
    author: 'Tunde A.',
    location: 'Ikeja'
  },
  {
    id: 3,
    quote: '"Ordered for family Sunday lunch and everyone loved it. Best suya and grilled fish right to our door."',
    author: 'Kemi B.',
    location: 'Victoria Island'
  }
];

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="section-header text-center">
          <span className="section-eyebrow">FROM OUR COMMUNITY</span>
          <h2 className="section-title">Food that feels like home</h2>
        </div>

        <div className="testimonials-grid">
          {REVIEWS.map(item => (
            <div key={item.id} className="testimonial-card">
              <div className="stars-row">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#f59e0b" color="#f59e0b" />
                ))}
              </div>
              <p className="testimonial-quote">{item.quote}</p>
              <div className="testimonial-author">
                <span className="author-name">{item.author}</span>
                <span className="author-location">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
