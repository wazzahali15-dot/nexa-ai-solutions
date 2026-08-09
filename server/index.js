import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: true,
  credentials: true
}));

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const LEADS_FILE = path.join(DATA_DIR, 'leads.json');

// Initial seed leads if file doesn't exist
const INITIAL_LEADS = [
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

if (!fs.existsSync(LEADS_FILE)) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(INITIAL_LEADS, null, 2));
}

const getStoredLeads = () => {
  try {
    const data = fs.readFileSync(LEADS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return INITIAL_LEADS;
  }
};

const saveStoredLeads = (leads) => {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
};

// Cryptographic Password Hash Configuration
// Salt and PBKDF2 Hashed Password for Admin user: admin@nexaai.solutions
const ADMIN_EMAIL = 'admin@nexaai.solutions';
const ADMIN_SALT = 'e649a374b89f8120c15c544d673b2a8d';
// Salted PBKDF2 hash of admin password
const ADMIN_PASSWORD_HASH = crypto.pbkdf2Sync('NexaAI2026!Admin', ADMIN_SALT, 100000, 64, 'sha512').toString('hex');

// In-Memory Active Admin Sessions Store & Rate Limiter
const activeSessions = new Map(); // token => { email, expiresAt }
const loginAttempts = new Map(); // ip => { count, lockUntil }

// Middleware: Require Admin Auth
const requireAdminAuth = (req, res, next) => {
  const token = req.cookies.nexa_admin_session || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ authenticated: false, error: 'Unauthorized. Admin authentication required.' });
  }

  const session = activeSessions.get(token);
  if (!session || session.expiresAt < Date.now()) {
    if (session) activeSessions.delete(token);
    res.clearCookie('nexa_admin_session');
    return res.status(401).json({ authenticated: false, error: 'Session expired or invalid.' });
  }

  req.adminUser = session;
  next();
};

// Rate Limiting Check
const checkRateLimit = (ip) => {
  const record = loginAttempts.get(ip);
  if (!record) return { allowed: true };

  if (record.lockUntil && record.lockUntil > Date.now()) {
    const remainingSecs = Math.ceil((record.lockUntil - Date.now()) / 1000);
    return { allowed: false, error: `Too many failed attempts. Try again in ${remainingSecs} seconds.` };
  }

  if (record.lockUntil && record.lockUntil <= Date.now()) {
    loginAttempts.delete(ip);
    return { allowed: true };
  }

  return { allowed: true };
};

const recordFailedAttempt = (ip) => {
  const record = loginAttempts.get(ip) || { count: 0 };
  record.count += 1;
  if (record.count >= 5) {
    record.lockUntil = Date.now() + 15 * 60 * 1000; // 15 min lock
  }
  loginAttempts.set(ip, record);
};

const clearFailedAttempts = (ip) => {
  loginAttempts.delete(ip);
};

// -------------------------------------------------------------
// PUBLIC ENDPOINTS
// -------------------------------------------------------------

// Submit Consultation Lead (Public)
app.post('/api/public/leads', (req, res) => {
  try {
    const { name, business_name, email, phone, business_type, service_interest, message } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Missing required lead fields' });
    }

    const currentLeads = getStoredLeads();
    const newLead = {
      id: 'lead-' + Date.now().toString(36),
      name: name.trim(),
      business_name: business_name ? business_name.trim() : 'N/A',
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      business_type: business_type || 'Small / Medium Business',
      service_interest: service_interest || 'General Consultation',
      message: message ? message.trim() : '',
      status: 'New',
      created_at: new Date().toISOString()
    };

    const updated = [newLead, ...currentLeads];
    saveStoredLeads(updated);

    return res.status(201).json({ success: true, message: 'Consultation request logged successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to save lead' });
  }
});

// -------------------------------------------------------------
// AUTHENTICATION ENDPOINTS
// -------------------------------------------------------------

// Admin Login
app.post('/api/admin/login', (req, res) => {
  const ip = req.ip || req.connection.remoteAddress;
  const rateLimitStatus = checkRateLimit(ip);

  if (!rateLimitStatus.allowed) {
    return res.status(429).json({ error: rateLimitStatus.error });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Invalid email or password.' });
  }

  const inputEmail = email.trim().toLowerCase();
  
  // Verify credentials server-side using salted PBKDF2 hash comparison
  const inputHash = crypto.pbkdf2Sync(password, ADMIN_SALT, 100000, 64, 'sha512').toString('hex');
  
  const emailMatches = crypto.timingSafeEqual(Buffer.from(inputEmail), Buffer.from(ADMIN_EMAIL));
  const passwordMatches = crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(ADMIN_PASSWORD_HASH));

  if (!emailMatches || !passwordMatches) {
    recordFailedAttempt(ip);
    // Generic error message - do not reveal if email exists
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  // Clear failed attempts on successful login
  clearFailedAttempts(ip);

  // Generate cryptographic session token
  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

  activeSessions.set(token, { email: ADMIN_EMAIL, expiresAt });

  res.cookie('nexa_admin_session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60 * 1000
  });

  return res.status(200).json({
    authenticated: true,
    token,
    user: { email: ADMIN_EMAIL }
  });
});

// Verify Current Session Status
app.get('/api/admin/me', requireAdminAuth, (req, res) => {
  return res.status(200).json({
    authenticated: true,
    user: { email: req.adminUser.email }
  });
});

// Admin Logout
app.post('/api/admin/logout', (req, res) => {
  const token = req.cookies.nexa_admin_session || req.headers['authorization']?.replace('Bearer ', '');
  if (token) {
    activeSessions.delete(token);
  }
  res.clearCookie('nexa_admin_session');
  return res.status(200).json({ authenticated: false, message: 'Logged out successfully' });
});

// -------------------------------------------------------------
// PROTECTED ADMIN DATA ENDPOINTS (REQUIRE AUTHORIZATION)
// -------------------------------------------------------------

// Fetch All Leads & Statistics (Protected Admin Only)
app.get('/api/admin/leads', requireAdminAuth, (req, res) => {
  const leads = getStoredLeads();
  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === 'New').length,
    contacted: leads.filter((l) => l.status === 'Contacted').length,
    qualified: leads.filter((l) => l.status === 'Qualified').length,
    closed: leads.filter((l) => l.status === 'Closed').length
  };

  return res.status(200).json({ leads, stats });
});

// Update Lead Status (Protected Admin Only)
app.patch('/api/admin/leads/:id/status', requireAdminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const validStatuses = ['New', 'Contacted', 'Qualified', 'Closed'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  const leads = getStoredLeads();
  let updated = false;

  const newLeads = leads.map((lead) => {
    if (lead.id === id) {
      updated = true;
      return { ...lead, status };
    }
    return lead;
  });

  if (!updated) {
    return res.status(404).json({ error: 'Lead not found' });
  }

  saveStoredLeads(newLeads);
  return res.status(200).json({ success: true, status });
});

app.listen(PORT, () => {
  console.log(`[Security Auth Backend] Running on http://127.0.0.1:${PORT}`);
});
