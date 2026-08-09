import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Calendar, DollarSign, Cpu } from 'lucide-react';
import './ChatWidget.css';

export default function ChatWidget({ onBookConsultation }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      sender: 'bot',
      text: "Hi! I'm NexaAI's assistant. How can I help you automate your business?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    'What services do you offer?',
    'Which solution is right for my business?',
    'How much does automation cost?',
    'Book a consultation'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');

    // Generate intelligent assistant response
    setTimeout(() => {
      let botResponse = '';
      const lowerQuery = query.toLowerCase();

      if (lowerQuery.includes('service') || lowerQuery.includes('what services')) {
        botResponse = "We offer 6 primary AI & automation services:\n1. AI Chatbots (24/7 Support & WhatsApp)\n2. Business Automation (Workflow integration)\n3. Data Analytics (Live dashboards)\n4. E-commerce AI (Recommendations & insights)\n5. Predictive Analytics (Demand forecasting)\n6. Custom AI Solutions";
      } else if (lowerQuery.includes('right for my business') || lowerQuery.includes('solution')) {
        botResponse = "If you manage customer inquiries, our AI Chatbots are ideal. For repetitive manual task reduction, Business Automation yields immediate 60%+ time savings. You can also try our ROI Calculator above to estimate exact value!";
      } else if (lowerQuery.includes('cost') || lowerQuery.includes('price') || lowerQuery.includes('pricing')) {
        botResponse = "Our fixed pricing plans start at:\n- Starter: Rs. 12,000 (Workflow & Leads)\n- Chatbot Pro: Rs. 20,000 (AI Chatbot & FAQ)\n- Complete AI Suite: Rs. 40,000 (Full Automation & Analytics)\nPlus, we currently offer a 30% discount for limited slots!";
      } else if (lowerQuery.includes('book') || lowerQuery.includes('consultation') || lowerQuery.includes('contact')) {
        botResponse = "Great! You can fill out our short Consultation Form on the page, or click below to jump straight to booking.";
      } else {
        botResponse = `Thanks for asking about "${query}". NexaAI Solutions helps businesses eliminate manual bottlenecks and scale operations. Would you like to schedule a technical consultation or explore our pricing?`;
      }

      const botMsg = {
        id: 'bot-' + Date.now(),
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  return (
    <div className="chat-widget-container">
      {/* Chat Panel */}
      {isOpen && (
        <div className="chat-panel">
          {/* Panel Header */}
          <div className="chat-header">
            <div className="chat-header-brand">
              <div className="bot-avatar-box">
                <Bot size={20} />
              </div>
              <div className="chat-title-box">
                <h4 className="chat-title">NexaAI Virtual Assistant</h4>
                <span className="chat-status">
                  <span className="status-dot pulsing"></span> Online &amp; Ready
                </span>
              </div>
            </div>
            <button
              type="button"
              className="chat-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close Chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Body */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender === 'user' ? 'msg-user' : 'msg-bot'}`}>
                {msg.sender === 'bot' && (
                  <div className="msg-avatar">
                    <Bot size={14} />
                  </div>
                )}
                <div className="msg-bubble-wrapper">
                  <div className="msg-bubble">
                    {msg.text.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                  <span className="msg-time">{msg.time}</span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="chat-chips-row">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                type="button"
                className="chat-chip"
                onClick={() => {
                  if (q === 'Book a consultation') {
                    if (onBookConsultation) onBookConsultation();
                    setIsOpen(false);
                  } else {
                    handleSend(q);
                  }
                }}
              >
                <span>{q}</span>
              </button>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="chat-input-form"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about AI automation, chatbots..."
              className="chat-input"
            />
            <button type="submit" className="chat-send-btn" aria-label="Send message">
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        type="button"
        className={`floating-chat-trigger ${isOpen ? 'trigger-active' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with NexaAI"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageSquare size={22} />
            <span className="trigger-label">Chat with NexaAI</span>
          </>
        )}
      </button>
    </div>
  );
}
