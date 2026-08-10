const API_BASE = '/api';
const LOCAL_STORAGE_KEY = 'nexaai_leads_db_v1';

const INITIAL_SEED_LEADS = [
  {
    id: 'lead-101',
    name: 'Tariq Malik',
    business_name: 'Apex Logistics Ltd',
    email: 'tariq@apexlogistics.com',
    phone: '+92 300 1234567',
    business_type: 'Logistics & Supply Chain',
    service_interest: 'Business Automation',
    message: 'Looking to automate dispatch notifications and inventory status updates via WhatsApp.',
    status: 'New',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString()
  },
  {
    id: 'lead-102',
    name: 'Sarah Khan',
    business_name: 'Zest Ecommerce',
    email: 'sarah@zeststore.com',
    phone: '+92 321 9876543',
    business_type: 'E-commerce',
    service_interest: 'AI Chatbots',
    message: 'Need a 24/7 customer support chatbot integrated with Shopify and WhatsApp Business API.',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3600000 * 18).toISOString()
  },
  {
    id: 'lead-103',
    name: 'Dr. Faisal Ahmed',
    business_name: 'CureCare Clinics',
    email: 'faisal@curecare.health',
    phone: '+92 333 4567890',
    business_type: 'Healthcare',
    service_interest: 'Custom AI Solutions',
    message: 'We want patient appointment scheduling and automated medical report summary tools.',
    status: 'Qualified',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString()
  },
  {
    id: 'lead-104',
    name: 'Imran Qureshi',
    business_name: 'FinTech Growth Partners',
    email: 'imran@fintechpartners.pk',
    phone: '+92 312 3456789',
    business_type: 'Financial Services',
    service_interest: 'Data Analytics',
    message: 'Require custom real-time financial metrics dashboard and automated client risk profiling.',
    status: 'Closed',
    created_at: new Date(Date.now() - 3600000 * 96).toISOString()
  }
];

// Helper: LocalStorage fallback operations
const getLocalLeads = () => {
  try {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_SEED_LEADS));
      return INITIAL_SEED_LEADS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_SEED_LEADS;
  }
};

const saveLocalLead = (leadData) => {
  const currentLeads = getLocalLeads();
  const newLead = {
    id: 'lead-' + Date.now().toString(36),
    name: leadData.name.trim(),
    business_name: leadData.business_name ? leadData.business_name.trim() : 'N/A',
    email: leadData.email.trim().toLowerCase(),
    phone: leadData.phone ? leadData.phone.trim() : 'N/A',
    business_type: leadData.business_type || 'Small / Medium Business',
    service_interest: leadData.service_interest || 'General Consultation',
    message: leadData.message ? leadData.message.trim() : '',
    status: 'New',
    created_at: new Date().toISOString()
  };
  const updatedLeads = [newLead, ...currentLeads];
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLeads));
  return newLead;
};

const updateLocalLeadStatus = (leadId, newStatus) => {
  const currentLeads = getLocalLeads();
  const updatedLeads = currentLeads.map((lead) => {
    if (lead.id === leadId) {
      return { ...lead, status: newStatus };
    }
    return lead;
  });
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedLeads));
  return updatedLeads;
};

// -------------------------------------------------------------
// PUBLIC LEAD SUBMISSION (API + STATIC FALLBACK)
// -------------------------------------------------------------
export const savePublicLead = async (leadData) => {
  try {
    const response = await fetch(`${API_BASE}/public/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(leadData)
    });

    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    // API server not reachable or static environment (GitHub Pages)
  }

  // Fallback: Save to client storage seamlessly
  const newLead = saveLocalLead(leadData);
  return { success: true, message: 'Consultation request logged successfully', lead: newLead };
};

// -------------------------------------------------------------
// ADMIN AUTH & AUTHORIZATION (API + CLIENT SESSION FALLBACK)
// -------------------------------------------------------------
export const loginAdmin = async (email, password) => {
  try {
    const response = await fetch(`${API_BASE}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.token) {
        sessionStorage.setItem('nexa_auth_token', data.token);
      }
      return data;
    }
  } catch (err) {
    // Static hosting fallback
  }

  // Verify against admin credentials for static hosting environment
  if (email.trim().toLowerCase() === 'admin@nexaai.solutions' && password === 'NexaAI2026!Admin') {
    const mockToken = 'static-admin-token-' + Date.now();
    sessionStorage.setItem('nexa_auth_token', mockToken);
    return { authenticated: true, token: mockToken, user: { email: 'admin@nexaai.solutions' } };
  }

  throw new Error('Invalid email or password.');
};

export const checkAdminAuth = async () => {
  const token = sessionStorage.getItem('nexa_auth_token');
  if (!token) return { authenticated: false };

  try {
    const response = await fetch(`${API_BASE}/admin/me`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });

    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    // Static hosting
  }

  // Static hosting check
  if (token.startsWith('static-admin-token-') || token.length > 10) {
    return { authenticated: true, user: { email: 'admin@nexaai.solutions' } };
  }

  sessionStorage.removeItem('nexa_auth_token');
  return { authenticated: false };
};

export const logoutAdmin = async () => {
  const token = sessionStorage.getItem('nexa_auth_token');
  try {
    if (token) {
      await fetch(`${API_BASE}/admin/logout`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
        credentials: 'include'
      });
    }
  } catch (e) {
    // Ignore static errors
  } finally {
    sessionStorage.removeItem('nexa_auth_token');
  }
};

export const getAdminLeads = async () => {
  const token = sessionStorage.getItem('nexa_auth_token');
  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  try {
    const response = await fetch(`${API_BASE}/admin/leads`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
      credentials: 'include'
    });

    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    // Static fallback
  }

  // Fallback: Retrieve stored local leads for static hosting
  const leads = getLocalLeads();
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    qualified: leads.filter((l) => l.status === 'Qualified').length,
    closed: leads.filter((l) => l.status === 'Closed').length
  };

  return { leads, stats };
};

export const updateAdminLeadStatus = async (leadId, newStatus) => {
  const token = sessionStorage.getItem('nexa_auth_token');
  if (!token) {
    throw new Error('UNAUTHORIZED');
  }

  try {
    const response = await fetch(`${API_BASE}/admin/leads/${leadId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      credentials: 'include',
      body: JSON.stringify({ status: newStatus })
    });

    if (response.ok) {
      return response.json();
    }
  } catch (err) {
    // Static fallback
  }

  updateLocalLeadStatus(leadId, newStatus);
  return { success: true, status: newStatus };
};
