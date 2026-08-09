import React from 'react';
import './HowItWorks.css';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'DISCOVER',
      description: 'Understand the business, workflow, data and bottlenecks.'
    },
    {
      number: '02',
      title: 'DESIGN',
      description: 'Create the right AI strategy and solution architecture.'
    },
    {
      number: '03',
      title: 'BUILD',
      description: 'Engineer, integrate and deploy the solution.'
    },
    {
      number: '04',
      title: 'OPTIMIZE',
      description: 'Monitor performance and continuously improve.'
    }
  ];

  return (
    <section id="how-it-works" className="section-padding how-it-works-section bg-circuit-pattern">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>METHODOLOGY</span>
          </div>
          <h2>BUILD WHAT'S NEXT.</h2>
          <p>A disciplined four-step process designed around measurable business outcomes.</p>
        </div>

        {/* 4 Steps Horizontal / Vertical Layout */}
        <div className="process-flow">
          {steps.map((step, index) => (
            <div key={step.number} className="process-step-card">
              <div className="step-number-container">
                <span className="step-number">{step.number}</span>
                {index < steps.length - 1 && <div className="step-connector-line"></div>}
              </div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
