import React, { useState } from 'react';
import { Calculator, ArrowRight, TrendingUp, Clock, DollarSign, Users } from 'lucide-react';
import './RoiCalculator.css';

export default function RoiCalculator({ onAssessmentRequest }) {
  const [teamMembers, setTeamMembers] = useState(10);
  const [hoursPerWeek, setHoursPerWeek] = useState(15);
  const [hourlyCost, setHourlyCost] = useState(2500); // PKR per hour
  const [automationPct, setAutomationPct] = useState(60); // %

  // Accurate Calculations
  const weeklyHoursSaved = Math.round(teamMembers * hoursPerWeek * (automationPct / 100));
  const monthlyHoursSaved = Math.round(weeklyHoursSaved * 4.333);
  const monthlyValue = Math.round(monthlyHoursSaved * hourlyCost);
  const annualValue = monthlyValue * 12;

  const formatPKR = (amount) => {
    return 'Rs. ' + amount.toLocaleString('en-PK');
  };

  const handleAssessment = () => {
    const summary = `ROI Assessment Request:\n- Team Size: ${teamMembers}\n- Weekly Task Hrs: ${hoursPerWeek} hrs/person\n- Hourly Rate: ${formatPKR(hourlyCost)}\n- Estimated Automation: ${automationPct}%\n- Projected Monthly Savings: ${formatPKR(monthlyValue)} (${monthlyHoursSaved} hrs/mo)`;
    if (onAssessmentRequest) {
      onAssessmentRequest(summary);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="roi-calculator" className="section-padding roi-section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="eyebrow">
            <span>INTERACTIVE ROI ESTIMATOR</span>
          </div>
          <h2>TURN DATA INTO DECISIONS.</h2>
          <p>Estimate how much time and operational value automation could save your business.</p>
        </div>

        {/* Calculator Main Layout */}
        <div className="roi-calculator-card">
          <div className="roi-grid">
            {/* Left Controls */}
            <div className="roi-inputs-col">
              <div className="roi-input-group">
                <div className="slider-label-row">
                  <span className="slider-title">
                    <Users size={16} className="slider-icon" />
                    Number of Team Members
                  </span>
                  <span className="slider-val-badge">{teamMembers} members</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={teamMembers}
                  onChange={(e) => setTeamMembers(Number(e.target.value))}
                  className="roi-range-slider"
                />
                <div className="range-bounds">
                  <span>1 member</span>
                  <span>100 members</span>
                </div>
              </div>

              <div className="roi-input-group">
                <div className="slider-label-row">
                  <span className="slider-title">
                    <Clock size={16} className="slider-icon" />
                    Repetitive Task Hours / Week
                  </span>
                  <span className="slider-val-badge">{hoursPerWeek} hrs/week</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(Number(e.target.value))}
                  className="roi-range-slider"
                />
                <div className="range-bounds">
                  <span>1 hour</span>
                  <span>40 hours</span>
                </div>
              </div>

              <div className="roi-input-group">
                <div className="slider-label-row">
                  <span className="slider-title">
                    <DollarSign size={16} className="slider-icon" />
                    Average Hourly Cost (PKR)
                  </span>
                  <span className="slider-val-badge">{formatPKR(hourlyCost)}/hr</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={hourlyCost}
                  onChange={(e) => setHourlyCost(Number(e.target.value))}
                  className="roi-range-slider"
                />
                <div className="range-bounds">
                  <span>Rs. 500</span>
                  <span>Rs. 10,000</span>
                </div>
              </div>

              <div className="roi-input-group">
                <div className="slider-label-row">
                  <span className="slider-title">
                    <TrendingUp size={16} className="slider-icon" />
                    Estimated Automation Percentage
                  </span>
                  <span className="slider-val-badge">{automationPct}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="5"
                  value={automationPct}
                  onChange={(e) => setAutomationPct(Number(e.target.value))}
                  className="roi-range-slider"
                />
                <div className="range-bounds">
                  <span>10%</span>
                  <span>90%</span>
                </div>
              </div>
            </div>

            {/* Right Output Dashboard */}
            <div className="roi-results-col">
              <div className="results-card-inner">
                <div className="results-badge">
                  <Calculator size={16} />
                  <span>PROJECTED AUTOMATION ROI</span>
                </div>

                <div className="hours-saved-row">
                  <div className="hours-stat">
                    <span className="stat-num">{weeklyHoursSaved.toLocaleString()}</span>
                    <span className="stat-unit">Weekly Hours Saved</span>
                  </div>
                  <div className="stat-divider"></div>
                  <div className="hours-stat">
                    <span className="stat-num">{monthlyHoursSaved.toLocaleString()}</span>
                    <span className="stat-unit">Monthly Hours Saved</span>
                  </div>
                </div>

                <div className="value-output-box">
                  <span className="value-label">ESTIMATED MONTHLY VALUE</span>
                  <span className="value-amount highlight-orange">{formatPKR(monthlyValue)}</span>
                </div>

                <div className="value-output-box annual-box">
                  <span className="value-label">ESTIMATED ANNUAL VALUE</span>
                  <span className="value-amount">{formatPKR(annualValue)}</span>
                </div>

                <button
                  type="button"
                  className="btn btn-primary w-full roi-cta-btn"
                  onClick={handleAssessment}
                >
                  <span>GET MY CUSTOM AUTOMATION ASSESSMENT</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
