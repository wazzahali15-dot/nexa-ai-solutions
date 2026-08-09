import React from 'react';
import { ShoppingBag, Stethoscope, Building2, GraduationCap, Landmark, Store, Briefcase, Rocket } from 'lucide-react';
import './Industries.css';

export default function Industries() {
  const industries = [
    {
      icon: ShoppingBag,
      name: 'E-commerce',
      challenge: 'High cart abandonment & heavy inquiry volume.',
      solution: '24/7 AI chatbot with product recommendations & order tracking.'
    },
    {
      icon: Stethoscope,
      name: 'Healthcare',
      challenge: 'Administrative overhead & scheduling delays.',
      solution: 'Automated appointment booking & triage routing.'
    },
    {
      icon: Building2,
      name: 'Real Estate',
      challenge: 'Slow lead response times & manual qualification.',
      solution: 'Instant WhatsApp lead capture & property matching.'
    },
    {
      icon: GraduationCap,
      name: 'Education',
      challenge: 'Repetitive admissions queries & student follow-ups.',
      solution: 'AI student advisor bots & automated lead triage.'
    },
    {
      icon: Landmark,
      name: 'Finance',
      challenge: 'Manual document review & delayed risk reporting.',
      solution: 'Automated document parsing & real-time analytics.'
    },
    {
      icon: Store,
      name: 'Retail',
      challenge: 'Inventory misalignments & fragmented customer data.',
      solution: 'Predictive stock forecasting & customer intelligence.'
    },
    {
      icon: Briefcase,
      name: 'Professional Services',
      challenge: 'Time spent on routine client status updates.',
      solution: 'Automated status workflows & client portal alerts.'
    },
    {
      icon: Rocket,
      name: 'Startups & SMEs',
      challenge: 'Limited headcount scaling operations fast.',
      solution: 'End-to-end AI automation replacing manual daily tasks.'
    }
  ];

  return (
    <section id="industries" className="section-padding industries-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>TAILORED SOLUTIONS</span>
          </div>
          <h2>AI BUILT FOR YOUR INDUSTRY.</h2>
          <p>Domain-specific automation systems designed for maximum efficiency.</p>
        </div>

        {/* 8 Grid Layout */}
        <div className="industries-grid">
          {industries.map((ind, idx) => {
            const Icon = ind.icon;
            return (
              <div key={idx} className="nexa-card industry-card">
                <div className="industry-header">
                  <div className="industry-icon-box">
                    <Icon size={20} />
                  </div>
                  <h3 className="industry-name">{ind.name}</h3>
                </div>

                <div className="industry-details">
                  <div className="detail-row">
                    <span className="detail-tag tag-challenge">CHALLENGE</span>
                    <p className="detail-text">{ind.challenge}</p>
                  </div>
                  
                  <div className="detail-row">
                    <span className="detail-tag tag-solution">NEXAAI SOLUTION</span>
                    <p className="detail-text solution-text">{ind.solution}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
