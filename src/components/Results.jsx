import React from 'react';
import { ShieldCheck, MessageSquare, Target, Cpu, BarChart } from 'lucide-react';
import './Results.css';

export default function Results() {
  const outcomes = [
    {
      category: 'CUSTOMER SUPPORT',
      icon: MessageSquare,
      title: 'Reduced Repetitive Support Workload',
      metric: '75% Reduction',
      detail: 'Automated 24/7 resolution of Tier-1 support tickets via website & WhatsApp bots.'
    },
    {
      category: 'LEAD GENERATION',
      icon: Target,
      title: 'Faster Lead Qualification',
      metric: '4x Speed Increase',
      detail: 'Instant automated lead scoring and CRM synchronization for inbound inquiries.'
    },
    {
      category: 'OPERATIONS',
      icon: Cpu,
      title: 'Automated Repetitive Workflows',
      metric: '120+ Hours Saved/Mo',
      detail: 'Streamlined invoice processing, dispatch notifications, and cross-platform sync.'
    },
    {
      category: 'ANALYTICS',
      icon: BarChart,
      title: 'Faster Business Reporting',
      metric: 'Real-Time Insights',
      detail: 'Replaced manual Excel compilation with automated live executive dashboards.'
    }
  ];

  return (
    <section id="results" className="section-padding results-section bg-circuit-pattern">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>PROVEN IMPACT</span>
          </div>
          <h2>MEASURABLE BUSINESS OUTCOMES</h2>
          <p>Illustrative benchmarks from our automated business deployments.</p>
        </div>

        {/* 4 Cards Grid */}
        <div className="results-grid">
          {outcomes.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="nexa-card result-card">
                <div className="result-category-row">
                  <Icon size={16} className="category-icon" />
                  <span className="result-category">{item.category}</span>
                </div>

                <div className="metric-badge-box">
                  <span className="result-metric highlight-orange">{item.metric}</span>
                </div>

                <h3 className="result-title">{item.title}</h3>
                <p className="result-detail">{item.detail}</p>
                
                <div className="illustrative-label">
                  <ShieldCheck size={12} />
                  <span>Illustrative Deployment Benchmark</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
