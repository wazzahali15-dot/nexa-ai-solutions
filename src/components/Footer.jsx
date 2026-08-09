import React from 'react';
import { ArrowUp, Mail, Phone, MapPin, Shield } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Footer.css';

export default function Footer({ onOpenAdmin }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer bg-circuit-pattern">
      <div className="container">
        <div className="footer-top">
          {/* Brand Col */}
          <div className="footer-brand-col">
            <div className="footer-logo-wrapper">
              <img src={logoImg} alt="NexaAI Solutions Logo" className="footer-logo-img" />
            </div>
            
            <p className="footer-tagline">Automate Today. Lead Tomorrow.</p>
            
            <p className="footer-desc">
              NexaAI Solutions empowers businesses to automate repetitive operations, leverage real-time business data, and build scalable custom AI systems.
            </p>

            <div className="footer-contact-details">
              <div className="contact-detail-line">
                <Mail size={14} className="detail-icon" />
                <span>contact@nexaai.solutions</span>
              </div>
              <div className="contact-detail-line">
                <Phone size={14} className="detail-icon" />
                <span>+92 300 1234567</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-title">NAVIGATION</h4>
            <ul className="footer-links-list">
              <li><a href="#hero">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#how-it-works">Solutions &amp; Process</a></li>
              <li><a href="#roi-calculator">ROI Estimator</a></li>
              <li><a href="#pricing">Pricing Plans</a></li>
              <li><a href="#contact">Book Consultation</a></li>
            </ul>
          </div>

          {/* AI Services */}
          <div className="footer-col">
            <h4 className="footer-col-title">AI SERVICES</h4>
            <ul className="footer-links-list">
              <li><a href="#services">AI Chatbots</a></li>
              <li><a href="#services">Business Automation</a></li>
              <li><a href="#services">Data Analytics</a></li>
              <li><a href="#services">E-commerce AI</a></li>
              <li><a href="#services">Predictive Analytics</a></li>
              <li><a href="#services">Custom AI Solutions</a></li>
            </ul>
          </div>

          {/* Legal & System */}
          <div className="footer-col">
            <h4 className="footer-col-title">PORTAL &amp; LEGAL</h4>
            <ul className="footer-links-list">
              <li>
                <button type="button" onClick={onOpenAdmin} className="footer-admin-link">
                  <Shield size={14} />
                  <span>Admin Lead Portal</span>
                </button>
              </li>
              <li><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
              <li><a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
              <li><a href="#security" onClick={(e) => e.preventDefault()}>Security Architecture</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} NexaAI Solutions. All rights reserved. Built with precision for modern enterprise.
          </p>

          <button
            type="button"
            className="scroll-top-btn"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
          >
            <span>Top</span>
            <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
}
