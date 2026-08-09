import React from 'react';
import { Check, ArrowRight, Star } from 'lucide-react';
import './Pricing.css';

export default function Pricing({ onSelectPlan }) {
  const plans = [
    {
      id: 'starter',
      name: 'STARTER',
      price: 'Rs. 12,000',
      description: 'Ideal for small businesses starting with basic automation.',
      popular: false,
      features: [
        'Basic Workflow Automation',
        'Lead Capture System',
        'Email & WhatsApp Alerts',
        '7 Days Support'
      ],
      cta: 'GET STARTED →',
      planName: 'Starter (Rs. 12,000)'
    },
    {
      id: 'chatbot-pro',
      name: 'CHATBOT PRO',
      price: 'Rs. 20,000',
      description: 'Complete 24/7 AI conversational agent for sales & support.',
      popular: true,
      badge: 'MOST POPULAR',
      features: [
        'AI Chatbot for Website/WhatsApp',
        'Smart Replies + FAQ Setup',
        'Lead Generation Integration',
        'Basic Analytics'
      ],
      cta: 'CHOOSE CHATBOT PRO →',
      planName: 'Chatbot Pro (Rs. 20,000)'
    },
    {
      id: 'complete-ai-suite',
      name: 'COMPLETE AI SUITE',
      price: 'Rs. 40,000',
      description: 'Full-scale enterprise AI automation and data dashboard system.',
      popular: false,
      features: [
        'Full Business Automation',
        'AI Chatbot + CRM Integration',
        'Data Analytics Dashboard',
        'Custom AI Workflows'
      ],
      cta: 'BUILD MY AI SYSTEM →',
      planName: 'Complete AI Suite (Rs. 40,000)'
    }
  ];

  const handlePlanClick = (planName) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="section-padding pricing-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>TRANSPARENT INVESTMENT</span>
          </div>
          <h2>PRICING THAT SPEAKS FOR ITSELF.</h2>
          <p>Clear, fixed plans built for measurable business return.</p>
        </div>

        {/* 3 Plans Grid */}
        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`nexa-card pricing-card ${plan.popular ? 'popular-card' : ''}`}
            >
              {plan.popular && (
                <div className="popular-badge">
                  <Star size={12} fill="#FF8A00" color="#FF8A00" />
                  <span>{plan.badge}</span>
                </div>
              )}

              <h3 className="plan-name">{plan.name}</h3>
              
              <div className="plan-price-box">
                <span className="plan-price highlight-orange">{plan.price}</span>
              </div>
              
              <p className="plan-desc">{plan.description}</p>
              
              <ul className="plan-features">
                {plan.features.map((feat, idx) => (
                  <li key={idx} className="feature-item">
                    <div className="feature-check-icon">
                      <Check size={14} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
              
              <button
                type="button"
                className={`btn w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => handlePlanClick(plan.planName)}
              >
                <span>{plan.cta}</span>
                <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
