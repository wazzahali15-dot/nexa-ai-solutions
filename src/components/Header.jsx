import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, ArrowRight } from 'lucide-react';
import logoImg from '../assets/logo.png';
import './Header.css';

export default function Header({ onOpenAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'Solutions', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'About', href: '#industries' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetEl = document.querySelector(href);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        {/* Logo */}
        <a href="#hero" className="logo-brand" aria-label="NexaAI Solutions Home">
          <div className="logo-wrapper">
            <img src={logoImg} alt="NexaAI Solutions Logo" className="brand-logo-img" />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Actions Right */}
        <div className="header-actions">
          <button 
            type="button" 
            className="admin-link-btn"
            onClick={onOpenAdmin}
            title="Access Admin Portal"
          >
            <Shield size={14} />
            <span>Admin Portal</span>
          </button>

          <a 
            href="#contact" 
            className="btn btn-primary header-cta"
            onClick={(e) => handleNavClick(e, '#contact')}
          >
            <span>Book Consultation</span>
            <ArrowRight size={16} />
          </a>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <nav aria-label="Mobile Navigation">
            <ul className="mobile-nav-list">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="mobile-nav-link"
                    onClick={(e) => handleNavClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="mobile-drawer-actions">
            <button 
              type="button" 
              className="admin-link-btn mobile-admin-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
            >
              <Shield size={16} />
              <span>Admin Portal</span>
            </button>

            <a 
              href="#contact" 
              className="btn btn-primary w-full"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              <span>Book Consultation</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
