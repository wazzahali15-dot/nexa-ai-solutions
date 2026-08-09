import React, { useState } from 'react';
import { Eye, EyeOff, Shield, ArrowRight, AlertCircle, Lock } from 'lucide-react';
import { loginAdmin } from '../services/leadService';
import logoImg from '../assets/logo.png';
import './AdminLogin.css';

export default function AdminLogin({ onLoginSuccess, onGoHome }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Invalid email or password.');
      return;
    }

    setIsSubmitting(true);

    try {
      await loginAdmin(email, password);
      setIsSubmitting(false);
      if (onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      setIsSubmitting(false);
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="admin-login-page bg-circuit-pattern">
      <div className="admin-login-card">
        {/* Logo Brand */}
        <div className="login-logo-container">
          <img src={logoImg} alt="NexaAI Solutions Logo" className="login-brand-logo" />
        </div>

        <div className="login-header">
          <div className="login-shield-badge">
            <Shield size={16} />
            <span>AUTHENTICATION REQUIRED</span>
          </div>
          <h2 className="login-title">ADMIN PORTAL</h2>
          <p className="login-subtitle">Secure access to your NexaAI dashboard.</p>
        </div>

        {error && (
          <div className="login-error-banner" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="login-field-group">
            <label htmlFor="admin-email" className="login-label">
              Email / Username
            </label>
            <input
              type="email"
              id="admin-email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. admin@nexaai.solutions"
              autoComplete="username"
              className="login-input"
            />
          </div>

          <div className="login-field-group">
            <label htmlFor="admin-password" className="login-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="admin-password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                className="login-input password-input"
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn btn-primary w-full login-submit-btn"
          >
            {isSubmitting ? (
              <span>VERIFYING CREDENTIALS...</span>
            ) : (
              <>
                <Lock size={16} />
                <span>LOGIN TO ADMIN PORTAL</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <button type="button" onClick={onGoHome} className="back-to-site-btn">
            &larr; Back to Public Website
          </button>
        </div>
      </div>
    </div>
  );
}
