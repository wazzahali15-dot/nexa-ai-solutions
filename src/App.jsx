import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';

import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import RoiCalculator from './components/RoiCalculator';
import Industries from './components/Industries';
import Results from './components/Results';
import Pricing from './components/Pricing';
import PromoBanner from './components/PromoBanner';
import ConsultationForm from './components/ConsultationForm';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

import AdminLogin from './components/AdminLogin';
import AdminPortal from './components/AdminPortal';
import { checkAdminAuth } from './services/leadService';

import './styles/theme.css';

// Public Marketing Website Component (UNCHANGED VISUAL DESIGN)
function PublicWebsite() {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState('');
  const [initialMessage, setInitialMessage] = useState('');

  const handleOpenAdmin = () => {
    navigate('/admin');
  };

  const handleSelectService = (serviceName) => {
    setSelectedService(serviceName);
  };

  const handleAssessmentRequest = (summaryText) => {
    setInitialMessage(summaryText);
  };

  const handleSelectPlan = (planName) => {
    setSelectedService(planName);
  };

  const handleBookConsultation = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-main-wrapper">
      <Header onOpenAdmin={handleOpenAdmin} />
      <Hero />
      <Services onSelectService={handleSelectService} />
      <HowItWorks />
      <RoiCalculator onAssessmentRequest={handleAssessmentRequest} />
      <Industries />
      <Results />
      <Pricing onSelectPlan={handleSelectPlan} />
      <PromoBanner />
      <ConsultationForm
        initialService={selectedService}
        initialMessage={initialMessage}
      />
      <Footer onOpenAdmin={handleOpenAdmin} />
      <ChatWidget onBookConsultation={handleBookConsultation} />
    </div>
  );
}

// Protected Admin Route Guard Component
function ProtectedAdminRoute() {
  const [authStatus, setAuthStatus] = useState({ checking: true, authenticated: false });
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
    const verifyAuth = async () => {
      const status = await checkAdminAuth();
      if (isMounted) {
        setAuthStatus({ checking: false, authenticated: status.authenticated });
      }
    };
    verifyAuth();
    return () => { isMounted = false; };
  }, []);

  if (authStatus.checking) {
    return (
      <div className="admin-portal-page" style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <div style={{ color: '#FF8A00', fontWeight: 600 }}>Verifying Admin Authentication...</div>
      </div>
    );
  }

  if (!authStatus.authenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminPortal
      onLogout={() => navigate('/admin/login', { replace: true })}
      onGoHome={() => navigate('/')}
    />
  );
}

// Admin Login Route Wrapper
function AdminLoginRoute() {
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    navigate('/admin', { replace: true });
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return <AdminLogin onLoginSuccess={handleLoginSuccess} onGoHome={handleGoHome} />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        {/* Public Marketing Website */}
        <Route path="/" element={<PublicWebsite />} />

        {/* Dedicated Admin Login Page */}
        <Route path="/admin/login" element={<AdminLoginRoute />} />

        {/* Protected Admin Routes (Redirects to /admin/login if unauthenticated) */}
        <Route path="/admin" element={<ProtectedAdminRoute />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute />} />
        <Route path="/admin/leads" element={<ProtectedAdminRoute />} />
        <Route path="/admin/services" element={<ProtectedAdminRoute />} />
        <Route path="/admin/pricing" element={<ProtectedAdminRoute />} />
        <Route path="/admin/settings" element={<ProtectedAdminRoute />} />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}
