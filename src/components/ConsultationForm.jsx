import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Send, PhoneCall } from 'lucide-react';
import { savePublicLead } from '../services/leadService';
import './ConsultationForm.css';

export default function ConsultationForm({ initialService = '', initialMessage = '' }) {
  const [formData, setFormData] = useState({
    name: '',
    business_name: '',
    email: '',
    phone: '',
    business_type: 'E-commerce',
    service_interest: 'AI Chatbots',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    if (initialService) {
      setFormData((prev) => ({ ...prev, service_interest: initialService }));
    }
    if (initialMessage) {
      setFormData((prev) => ({ ...prev, message: initialMessage }));
    }
  }, [initialService, initialMessage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.business_name.trim()) newErrors.business_name = 'Business name is required';
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      await savePublicLead(formData);
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({
        name: '',
        business_name: '',
        email: '',
        phone: '',
        business_type: 'E-commerce',
        service_interest: 'AI Chatbots',
        message: ''
      });
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ form: err.message || 'An error occurred saving your request. Please try again.' });
    }
  };

  return (
    <section id="contact" className="section-padding contact-section bg-circuit-pattern">
      <div className="container">
        <div className="contact-card">
          <div className="contact-grid">
            {/* Left Info Panel */}
            <div className="contact-info-col">
              <div className="eyebrow">
                <span>GET IN TOUCH</span>
              </div>
              <h2 className="contact-title">
                READY TO AUTOMATE YOUR <span className="highlight-orange">BUSINESS?</span>
              </h2>
              <p className="contact-subtext">
                Book a technical consultation and discover how NexaAI Solutions can streamline your operations, save costs, and deploy enterprise AI workflows.
              </p>

              <div className="contact-highlights">
                <div className="highlight-item">
                  <div className="highlight-icon-box">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <h4 className="highlight-head">Direct Technical Consultation</h4>
                    <p className="highlight-body">Speak directly with lead AI architecture experts.</p>
                  </div>
                </div>

                <div className="highlight-item">
                  <div className="highlight-icon-box">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h4 className="highlight-head">Tailored Solution Proposal</h4>
                    <p className="highlight-body">Receive custom architecture blueprint &amp; exact ROI scope.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form Panel */}
            <div className="contact-form-col">
              {submittedSuccess ? (
                <div className="success-confirmation-box">
                  <div className="success-icon-wrapper">
                    <CheckCircle2 size={48} className="success-icon" />
                  </div>
                  <h3>CONSULTATION REQUEST SUBMITTED!</h3>
                  <p>
                    Thank you for reaching out to NexaAI Solutions. Our engineering team has received your lead details and will contact you within 24 hours.
                  </p>
                  <button
                    type="button"
                    className="btn btn-secondary mt-4"
                    onClick={() => setSubmittedSuccess(false)}
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="consultation-form" noValidate>
                  {errors.form && (
                    <div className="form-error-banner">
                      <AlertCircle size={16} />
                      <span>{errors.form}</span>
                    </div>
                  )}

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Tariq Malik"
                        className={`form-input ${errors.name ? 'input-error' : ''}`}
                      />
                      {errors.name && <span className="error-text">{errors.name}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="business_name" className="form-label">
                        Business Name *
                      </label>
                      <input
                        type="text"
                        id="business_name"
                        name="business_name"
                        value={formData.business_name}
                        onChange={handleChange}
                        placeholder="e.g. Apex Logistics Ltd"
                        className={`form-input ${errors.business_name ? 'input-error' : ''}`}
                      />
                      {errors.business_name && <span className="error-text">{errors.business_name}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        Work Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@company.com"
                        className={`form-input ${errors.email ? 'input-error' : ''}`}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone" className="form-label">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+92 300 1234567"
                        className={`form-input ${errors.phone ? 'input-error' : ''}`}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="business_type" className="form-label">
                        Business Industry
                      </label>
                      <select
                        id="business_type"
                        name="business_type"
                        value={formData.business_type}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="E-commerce">E-commerce</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Real Estate">Real Estate</option>
                        <option value="Education">Education</option>
                        <option value="Finance">Financial Services</option>
                        <option value="Retail">Retail</option>
                        <option value="Professional Services">Professional Services</option>
                        <option value="Startup / SME">Startup / SME</option>
                        <option value="Other">Other Industry</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="service_interest" className="form-label">
                        Services Interested In
                      </label>
                      <select
                        id="service_interest"
                        name="service_interest"
                        value={formData.service_interest}
                        onChange={handleChange}
                        className="form-select"
                      >
                        <option value="AI Chatbots">AI Chatbots</option>
                        <option value="Business Automation">Business Automation</option>
                        <option value="Data Analytics">Data Analytics</option>
                        <option value="E-commerce AI">E-commerce AI</option>
                        <option value="Predictive Analytics">Predictive Analytics</option>
                        <option value="Custom AI Solutions">Custom AI Solutions</option>
                        <option value="Starter (Rs. 12,000)">Starter Plan (Rs. 12,000)</option>
                        <option value="Chatbot Pro (Rs. 20,000)">Chatbot Pro (Rs. 20,000)</option>
                        <option value="Complete AI Suite (Rs. 40,000)">Complete AI Suite (Rs. 40,000)</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      Message / Automation Needs
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows="4"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your current bottlenecks or what you want to automate..."
                      className="form-textarea"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full submit-btn"
                  >
                    {isSubmitting ? (
                      <span>PROCESSING LEAD...</span>
                    ) : (
                      <>
                        <span>START YOUR AI JOURNEY</span>
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
