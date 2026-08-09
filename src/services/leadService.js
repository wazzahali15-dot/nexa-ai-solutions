const API_BASE = '/api';

// Public endpoint for consultation form submission
export const savePublicLead = async (leadData) => {
  const response = await fetch(`${API_BASE}/public/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leadData)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || 'Failed to submit lead request.');
  }

  return response.json();
};

// Admin Login Handler
export const loginAdmin = async (email, password) => {
  const response = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Invalid email or password.');
  }

  if (data.token) {
    sessionStorage.setItem('nexa_auth_token', data.token);
  }

  return data;
};

// Verify Admin Session Status
export const checkAdminAuth = async () => {
  try {
    const token = sessionStorage.getItem('nexa_auth_token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE}/admin/me`, {
      method: 'GET',
      headers,
      credentials: 'include'
    });

    if (!response.ok) {
      sessionStorage.removeItem('nexa_auth_token');
      return { authenticated: false };
    }

    return response.json();
  } catch (err) {
    sessionStorage.removeItem('nexa_auth_token');
    return { authenticated: false };
  }
};

// Admin Logout Handler
export const logoutAdmin = async () => {
  try {
    const token = sessionStorage.getItem('nexa_auth_token');
    const headers = {};
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    await fetch(`${API_BASE}/admin/logout`, {
      method: 'POST',
      headers,
      credentials: 'include'
    });
  } catch (e) {
    // Ignore logout network errors
  } finally {
    sessionStorage.removeItem('nexa_auth_token');
  }
};

// Fetch Protected Leads & Stats (Server authorization check)
export const getAdminLeads = async () => {
  const token = sessionStorage.getItem('nexa_auth_token');
  const headers = {};
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/admin/leads`, {
    method: 'GET',
    headers,
    credentials: 'include'
  });

  if (!response.ok) {
    if (response.status === 401) {
      sessionStorage.removeItem('nexa_auth_token');
      throw new Error('UNAUTHORIZED');
    }
    throw new Error('Failed to fetch admin leads.');
  }

  return response.json();
};

// Update Protected Lead Status
export const updateAdminLeadStatus = async (leadId, newStatus) => {
  const token = sessionStorage.getItem('nexa_auth_token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}/admin/leads/${leadId}/status`, {
    method: 'PATCH',
    headers,
    credentials: 'include',
    body: JSON.stringify({ status: newStatus })
  });

  if (!response.ok) {
    if (response.status === 401) {
      sessionStorage.removeItem('nexa_auth_token');
      throw new Error('UNAUTHORIZED');
    }
    throw new Error('Failed to update lead status.');
  }

  return response.json();
};
