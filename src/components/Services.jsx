import React from 'react';
import { MessageSquare, Workflow, BarChart3, ShoppingBag, LineChart, Cpu, Check, ArrowRight } from 'lucide-react';
import './Services.css';

export default function Services({ onSelectService }) {
  const services = [
    {
      id: 'ai-chatbots',
      icon: MessageSquare,
      title: 'AI CHATBOTS',
      description: 'Smart AI-powered customer support and lead qualification.',
      benefits: ['24/7 support', 'Website & WhatsApp', 'Lead qualification'],
      cta: 'BUILD MY AI CHATBOT →',
      serviceName: 'AI Chatbots'
    },
    {
      id: 'business-automation',
      icon: Workflow,
      title: 'BUSINESS AUTOMATION',
      description: 'Automate repetitive workflows and connect the tools your team already uses.',
      benefits: ['Workflow automation', 'Notifications', 'CRM integration'],
      cta: 'AUTOMATE MY WORKFLOW →',
      serviceName: 'Business Automation'
    },
    {
      id: 'data-analytics',
      icon: BarChart3,
      title: 'DATA ANALYTICS',
      description: 'Turn business data into clear, actionable insights.',
      benefits: ['Live dashboards', 'Business metrics', 'Decision support'],
      cta: 'ANALYZE MY BUSINESS →',
      serviceName: 'Data Analytics'
    },
    {
      id: 'ecommerce-ai',
      icon: ShoppingBag,
      title: 'E-COMMERCE AI',
      description: 'AI-powered recommendations and customer intelligence for online stores.',
      benefits: ['Smart recommendations', 'Customer insights', 'Revenue growth'],
      cta: 'IMPROVE MY STORE →',
      serviceName: 'E-commerce AI'
    },
    {
      id: 'predictive-analytics',
      icon: LineChart,
      title: 'PREDICTIVE ANALYTICS',
      description: 'Forecast demand, customer behavior, and business trends.',
      benefits: ['Demand forecasting', 'Trend analysis', 'Risk reduction'],
      cta: 'EXPLORE PREDICTIVE AI →',
      serviceName: 'Predictive Analytics'
    },
    {
      id: 'custom-ai-solutions',
      icon: Cpu,
      title: 'CUSTOM AI SOLUTIONS',
      description: 'Purpose-built AI systems designed around your exact workflow.',
      benefits: ['Tailored logic', 'Enterprise integration', 'Scalable design'],
      cta: 'BUILD A CUSTOM SOLUTION →',
      serviceName: 'Custom AI Solutions'
    }
  ];

  const handleCtaClick = (serviceName) => {
    if (onSelectService) {
      onSelectService(serviceName);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" className="section-padding services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>CORE SERVICES</span>
          </div>
          <h2>AI SOLUTIONS THAT DRIVE REAL RESULTS</h2>
          <p>Practical AI systems designed around your business.</p>
        </div>

        {/* 6 Grid Cards */}
        <div className="services-grid">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div key={service.id} className="nexa-card service-card">
                <div className="service-icon-wrapper">
                  <IconComponent size={24} className="service-icon" />
                </div>
                
                <h3 className="service-title">{service.title}</h3>
                
                <p className="service-description">{service.description}</p>
                
                <ul className="service-benefits">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx} className="benefit-item">
                      <Check size={14} className="benefit-check" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <button
                  type="button"
                  className="service-cta-btn"
                  onClick={() => handleCtaClick(service.serviceName)}
                >
                  <span>{service.cta}</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
