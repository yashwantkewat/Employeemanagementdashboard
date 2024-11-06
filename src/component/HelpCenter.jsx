import React, { useState, useEffect } from 'react';
import Groq from "groq-sdk"; 
import { FaPaperPlane } from 'react-icons/fa';

const groq = new Groq({ 
  apiKey: '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',
  
  dangerouslyAllowBrowser: true 
});

const HelpCenter = () => {
  const [state, setState] = useState({
    activeTab: 'faq', searchQuery: '', faqs: [], filteredFaqs: [], expandedFaq: null,
    ticket: { name: '', email: '', subject: '', message: '' }, showChatbot: false, chatMessages: [], userInput: ''
  });

  useEffect(() => {
    const faqData = [
      { id: 1, question: "How do I reset my password?", answer: "To reset your password, click on the 'Forgot Password' link on the login page." },
      { id: 2, question: "How can I update my profile information?", answer: "You can update your profile info by going to 'Settings' and clicking 'Edit Profile'." },
      { id: 3, question: "What payment methods do you accept?", answer: "We accept credit cards (Visa, MasterCard, American Express) and PayPal." },
      { id: 4, question: "How long does shipping take?", answer: "Shipping typically takes 3-5 business days for domestic orders." },
    ];
    setState(prev => ({ ...prev, faqs: faqData, filteredFaqs: faqData }));
  }, []);

  const handleChange = (e) => setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleTicketChange = (e) => setState(prev => ({ ...prev, ticket: { ...prev.ticket, [e.target.name]: e.target.value } }));

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = state.faqs.filter(faq =>
      faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query));
    setState(prev => ({ ...prev, searchQuery: query, filteredFaqs: filtered }));
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = state.ticket;
    if (!name || !email || !subject || !message) return alert('Please fill in all fields.');
    alert('Ticket submitted successfully!');
    setState(prev => ({ ...prev, ticket: { name: '', email: '', subject: '', message: '' } }));
  };

  const handleSendMessage = async () => {
    const { userInput, chatMessages } = state;
    if (!userInput.trim()) return;
    setState(prev => ({ ...prev, chatMessages: [...chatMessages, { type: 'user', content: userInput }], userInput: '' }));
    try {
      const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: userInput }],
        model: "mixtral-8x7b-32768",
      });
      const botMessage = completion.choices[0]?.message?.content || "Sorry, I didn't understand that.";
      setState(prev => ({ ...prev, chatMessages: [...chatMessages, { type: 'bot', content: botMessage }] }));
    } catch (error) {
      console.error("Error:", error);
      setState(prev => ({ ...prev, chatMessages: [...chatMessages, { type: 'bot', content: "Error occurred." }] }));
    }
  };

  const { activeTab, searchQuery, filteredFaqs, expandedFaq, ticket, showChatbot, chatMessages, userInput } = state;
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center mb-3">
        {['faq', 'support'].map(tab => (
          <button key={tab} className={`btn ${activeTab === tab ? 'btn-primary' : 'btn-light'} me-2`}
            onClick={() => setState(prev => ({ ...prev, activeTab: tab }))}>
            {tab === 'faq' ? 'FAQ' : 'Support'}
          </button>
        ))}
      </div>

      {activeTab === 'faq' && (
        <>
          <input type="text" className="form-control mb-3" placeholder="Search FAQs..." value={searchQuery} onChange={handleSearch} />
          {filteredFaqs.map(faq => (
            <div key={faq.id} className="card mb-2">
              <div className="card-header d-flex justify-content-between align-items-center" onClick={() => setState(prev => ({ ...prev, expandedFaq: expandedFaq === faq.id ? null : faq.id }))} style={{ cursor: 'pointer' }}>
                <strong>{faq.question}</strong>
              </div>
              {expandedFaq === faq.id && <div className="card-body">{faq.answer}</div>}
            </div>
          ))}
        </>
      )}

      {activeTab === 'support' && (
        <form onSubmit={handleTicketSubmit} className="d-flex flex-column">
          {['name', 'email', 'subject'].map(field => (
            <input key={field} type={field === 'email' ? 'email' : 'text'} name={field} className="form-control mb-2"
              placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`} value={ticket[field]} onChange={handleTicketChange} required />
          ))}
          <textarea name="message" className="form-control mb-2" placeholder="Your Message" value={ticket.message} onChange={handleTicketChange} required rows="4" />
          <button type="submit" className="btn btn-success">Submit Ticket</button>
        </form>
      )}

      <button onClick={() => setState(prev => ({ ...prev, showChatbot: !showChatbot }))} className="btn btn-info position-fixed bottom-0 end-0 m-3">
        {showChatbot ? 'Close Chat' : 'Chat with Support'}
      </button>

      {showChatbot && (
        <div className="position-fixed bottom-0 end-0 m-3 " style={{ maxWidth: '450px', width: '100%', height: 'auto', border: '1px solid #ddd', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
          <div className="bg-light text-dark p-2 border-bottom"><strong>Chat Support</strong></div>
          <div className="flex-grow-1 overflow-auto p-2" style={{ backgroundColor: "white", color: "black", maxHeight: '300px', overflowY: 'auto' }}>
            {chatMessages.map((msg, index) => (
              <div key={index} className={`d-flex mb-2 ${msg.type === 'user' ? 'justify-content-end' : 'justify-content-start '}`}>
                <span className={`p-2 rounded ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-light text-dark'} text-wrap`} style={{ maxWidth: '80%',backgroundColor:"red" }}>
                  {msg.content}
                </span>
              </div>
            ))}
          </div>
          <div className="p-2 border-top" style={{ backgroundColor: "#8FD14F" }} >
            <div className="d-flex align-items-center">
              <input type="text" className="form-control" value={userInput} onChange={handleChange} name="userInput" placeholder="Type your message..." />
              <button className="btn ms-1" onClick={handleSendMessage} style={{ backgroundColor: '#181C14', color: 'white' }}>
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpCenter;
