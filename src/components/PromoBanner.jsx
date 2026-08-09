import React from 'react';
import { Tag, ArrowRight, Sparkles } from 'lucide-react';
import './PromoBanner.css';

export default function PromoBanner() {
  const handleBannerClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="promo-banner-wrapper">
      <div className="container">
        <div className="promo-card bg-circuit-pattern">
          <div className="promo-left">
            <div className="promo-tag-badge">
              <Tag size={18} className="promo-icon" />
              <span>SPECIAL PROMOTION</span>
            </div>
            
            <h2 className="promo-title">
              30% OFF — <span className="highlight-orange">LIMITED TIME OFFER</span>
            </h2>
            
            <p className="promo-subtext">
              Limited slots available for startups &amp; businesses looking to deploy enterprise automation this quarter.
            </p>
          </div>

          <div className="promo-right">
            <button
              type="button"
              className="btn btn-primary promo-btn"
              onClick={handleBannerClick}
            >
              <Sparkles size={18} />
              <span>CLAIM YOUR 30% DISCOUNT</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
