import React, { useState, useEffect } from 'react';
import { X, Shield, Search, Filter, RefreshCw, LogOut, AlertCircle } from 'lucide-react';
import { getAdminLeads, updateAdminLeadStatus, logoutAdmin } from '../services/leadService';
import './AdminPortal.css';

export default function AdminPortal({ onLogout, onGoHome }) {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, qualified: 0, closed: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedLead, setSelectedLead] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const data = await getAdminLeads();
      setLeads(data.leads || []);
      setStats(data.stats || { total: 0, new: 0, contacted: 0, qualified: 0, closed: 0 });
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      if (err.message === 'UNAUTHORIZED') {
        if (onLogout) onLogout();
      } else {
        setErrorMessage(err.message || 'Failed to load protected admin leads.');
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await updateAdminLeadStatus(leadId, newStatus);
      await loadData();
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead((prev) => ({ ...prev, status: newStatus }));
      }
    } catch (err) {
      if (err.message === 'UNAUTHORIZED' && onLogout) {
        onLogout();
      } else {
        alert('Failed to update lead status: ' + err.message);
      }
    }
  };

  const handleLogoutClick = async () => {
    await logoutAdmin();
    if (onLogout) {
      onLogout();
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.service_interest.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-portal-page">
      <div className="admin-portal-container">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-title-row">
            <div className="admin-shield-icon">
              <Shield size={20} />
            </div>
            <div>
              <h3 className="admin-title">NexaAI Leads &amp; Operations Portal</h3>
              <span className="admin-subtitle">PROTECTED ENTERPRISE MANAGEMENT SYSTEM</span>
            </div>
          </div>

          <div className="admin-header-right">
            <button
              type="button"
              className="admin-refresh-btn"
              onClick={loadData}
              title="Refresh Lead Data"
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              className="admin-logout-btn"
              onClick={handleLogoutClick}
              title="Log out of Admin Portal"
            >
              <LogOut size={16} />
              <span>LOG OUT</span>
            </button>
          </div>
        </header>

        {/* Body Content */}
        <main className="admin-body">
          {errorMessage && (
            <div className="admin-error-banner">
              <AlertCircle size={18} />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Overview Metrics Cards */}
          <div className="admin-metrics-grid">
            <div className="metric-card">
              <span className="metric-card-label">TOTAL LEADS</span>
              <span className="metric-card-value">{stats.total}</span>
            </div>
            <div className="metric-card border-new">
              <span className="metric-card-label">NEW LEADS</span>
              <span className="metric-card-value highlight-orange">{stats.new}</span>
            </div>
            <div className="metric-card">
              <span className="metric-card-label">CONTACTED</span>
              <span className="metric-card-value">{stats.contacted}</span>
            </div>
            <div className="metric-card">
              <span className="metric-card-label">QUALIFIED</span>
              <span className="metric-card-value">{stats.qualified}</span>
            </div>
            <div className="metric-card">
              <span className="metric-card-label">CLOSED</span>
              <span className="metric-card-value">{stats.closed}</span>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="admin-toolbar">
            <div className="admin-search-box">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search leads by name, business, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="admin-search-input"
              />
            </div>

            <div className="admin-filter-group">
              <Filter size={16} className="filter-icon" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="admin-filter-select"
              >
                <option value="ALL">All Statuses</option>
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Qualified">Qualified</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="admin-table-container">
            {isLoading ? (
              <div className="loading-state">
                <RefreshCw size={24} className="spinning-icon" />
                <p>Authorizing and fetching lead database...</p>
              </div>
            ) : (
              <table className="admin-leads-table">
                <thead>
                  <tr>
                    <th>Client / Business</th>
                    <th>Contact Info</th>
                    <th>Service Interest</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="no-leads-cell">
                        No leads match your filter query.
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="lead-table-row">
                        <td>
                          <div className="client-cell">
                            <span className="client-name">{lead.name}</span>
                            <span className="client-biz">{lead.business_name} ({lead.business_type})</span>
                          </div>
                        </td>
                        <td>
                          <div className="contact-cell">
                            <span className="contact-email">{lead.email}</span>
                            <span className="contact-phone">{lead.phone}</span>
                          </div>
                        </td>
                        <td>
                          <span className="service-interest-badge">{lead.service_interest}</span>
                        </td>
                        <td>
                          <select
                            value={lead.status}
                            onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                            className={`status-select status-${lead.status.toLowerCase()}`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Qualified">Qualified</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td>
                          <span className="date-text">
                            {new Date(lead.created_at).toLocaleDateString([], {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </td>
                        <td>
                          <button
                            type="button"
                            className="view-lead-btn"
                            onClick={() => setSelectedLead(lead)}
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            )}
          </div>
        </main>

        {/* Lead Details Submodal */}
        {selectedLead && (
          <div className="lead-detail-modal">
            <div className="detail-modal-card">
              <div className="detail-modal-header">
                <h4>Lead Details: {selectedLead.name}</h4>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="close-submodal-btn"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="detail-modal-body">
                <div className="detail-row-item">
                  <span className="detail-label">Client Name:</span>
                  <span className="detail-val">{selectedLead.name}</span>
                </div>
                <div className="detail-row-item">
                  <span className="detail-label">Business Name:</span>
                  <span className="detail-val">{selectedLead.business_name}</span>
                </div>
                <div className="detail-row-item">
                  <span className="detail-label">Industry:</span>
                  <span className="detail-val">{selectedLead.business_type}</span>
                </div>
                <div className="detail-row-item">
                  <span className="detail-label">Email:</span>
                  <span className="detail-val">{selectedLead.email}</span>
                </div>
                <div className="detail-row-item">
                  <span className="detail-label">Phone:</span>
                  <span className="detail-val">{selectedLead.phone}</span>
                </div>
                <div className="detail-row-item">
                  <span className="detail-label">Service Interest:</span>
                  <span className="detail-val highlight-orange">{selectedLead.service_interest}</span>
                </div>
                <div className="detail-row-item">
                  <span className="detail-label">Status:</span>
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleStatusChange(selectedLead.id, e.target.value)}
                    className={`status-select status-${selectedLead.status.toLowerCase()}`}
                  >
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Qualified">Qualified</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="detail-row-item vertical">
                  <span className="detail-label">Message / ROI Notes:</span>
                  <div className="message-content-box">
                    {selectedLead.message || 'No additional message notes provided.'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
