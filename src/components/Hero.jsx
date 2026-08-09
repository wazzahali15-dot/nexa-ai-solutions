import React, { useState } from 'react';
import { ArrowRight, ChevronRight, Cpu, Zap, Database, Bot, Activity } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  const [activeNode, setActiveNode] = useState(null);

  const nodes = [
    { id: 1, name: 'Data Pipeline', type: 'Ingestion', x: 20, y: 30, icon: Database, status: 'Active (1.2k req/s)' },
    { id: 2, name: 'AI Core Agent', type: 'LLM & Reasoning', x: 50, y: 20, icon: Cpu, status: 'Processing Node' },
    { id: 3, name: 'Workflow Engine', type: 'Automation', x: 80, y: 35, icon: Zap, status: '0.4s Latency' },
    { id: 4, name: 'Chatbot Gateway', type: 'Conversational', x: 35, y: 70, icon: Bot, status: '24/7 Live' },
    { id: 5, name: 'Predictive Model', type: 'Analytics', x: 70, y: 75, icon: Activity, status: '99.4% Accuracy' },
  ];

  return (
    <section id="hero" className="hero-section bg-circuit-pattern">
      <div className="container hero-container">
        {/* Hero Left Content */}
        <div className="hero-content">
          <div className="eyebrow">
            <span>AI AUTOMATION &amp; INTELLIGENCE</span>
          </div>
          
          <h1 className="hero-title">
            Transform Your Business With{' '}
            <span className="highlight-orange">Practical AI.</span>
          </h1>
          
          <p className="hero-subtitle">
            NexaAI Solutions builds intelligent automation, AI chatbots, analytics systems, and custom AI workflows that help businesses save time, reduce costs, and grow smarter.
          </p>
          
          <div className="hero-cta-group">
            <a href="#contact" className="btn btn-primary hero-btn-main">
              <span>BOOK A FREE CONSULTATION</span>
              <ArrowRight size={18} />
            </a>
            
            <a href="#services" className="btn btn-secondary hero-btn-sub">
              <span>EXPLORE SOLUTIONS</span>
              <ChevronRight size={18} />
            </a>
          </div>

          <div className="hero-metrics-strip">
            <div className="hero-metric">
              <span className="metric-value">100%</span>
              <span className="metric-label">Custom Enterprise Logic</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric">
              <span className="metric-value">24/7</span>
              <span className="metric-label">Automated Operations</span>
            </div>
            <div className="metric-divider"></div>
            <div className="hero-metric">
              <span className="metric-value">Rs 0</span>
              <span className="metric-label">Wasted Work Hours</span>
            </div>
          </div>
        </div>

        {/* Hero Right Visualization */}
        <div className="hero-visual-wrapper">
          <div className="hero-network-card">
            <div className="network-header">
              <div className="network-title-box">
                <span className="status-dot pulsing"></span>
                <span className="network-title">NexaAI Enterprise Network Architecture</span>
              </div>
              <span className="network-badge">SYSTEM LIVE</span>
            </div>

            {/* SVG Circuit Lines & Dynamic Flow */}
            <div className="svg-network-container">
              <svg viewBox="0 0 400 300" className="network-svg">
                {/* Circuit Grid Background */}
                <defs>
                  <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8A00" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FF9D1A" stopOpacity="0.2" />
                  </linearGradient>
                </defs>

                {/* Connecting Paths */}
                <path d="M 80 90 L 200 60" className="circuit-path" />
                <path d="M 200 60 L 320 105" className="circuit-path" />
                <path d="M 80 90 L 140 210" className="circuit-path" />
                <path d="M 200 60 L 140 210" className="circuit-path" />
                <path d="M 200 60 L 280 225" className="circuit-path" />
                <path d="M 320 105 L 280 225" className="circuit-path" />
                <path d="M 140 210 L 280 225" className="circuit-path" />

                {/* Animated Data Pulses */}
                <circle cx="80" cy="90" r="3" className="data-pulse">
                  <animate attributeName="cx" values="80;200;80" dur="4s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="90;60;90" dur="4s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="60" r="3" className="data-pulse">
                  <animate attributeName="cx" values="200;320;200" dur="3.5s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="60;105;60" dur="3.5s" repeatCount="indefinite" />
                </circle>
                <circle cx="200" cy="60" r="3" className="data-pulse">
                  <animate attributeName="cx" values="200;140;200" dur="5s" repeatCount="indefinite" />
                  <animate attributeName="cy" values="60;210;60" dur="5s" repeatCount="indefinite" />
                </circle>
              </svg>

              {/* Interactive HTML Node Elements Overlay */}
              <div className="interactive-nodes-layer">
                {nodes.map((node) => {
                  const Icon = node.icon;
                  const isHovered = activeNode === node.id;
                  return (
                    <div
                      key={node.id}
                      className={`network-node ${isHovered ? 'node-active' : ''}`}
                      style={{ left: `${node.x}%`, top: `${node.y}%` }}
                      onMouseEnter={() => setActiveNode(node.id)}
                      onMouseLeave={() => setActiveNode(null)}
                    >
                      <div className="node-icon-box">
                        <Icon size={18} />
                      </div>
                      <div className="node-tooltip">
                        <span className="tooltip-type">{node.type}</span>
                        <span className="tooltip-name">{node.name}</span>
                        <span className="tooltip-status">{node.status}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Network Footer Telemetry */}
            <div className="network-footer-telemetry">
              <div className="telemetry-item">
                <span className="telemetry-label">AUTOMATED WORKFLOWS</span>
                <span className="telemetry-value">Active Sync</span>
              </div>
              <div className="telemetry-item">
                <span className="telemetry-label">RELIABILITY</span>
                <span className="telemetry-value highlight-orange">99.98%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
