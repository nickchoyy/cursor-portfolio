
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Mail, Linkedin, Phone } from 'lucide-react';

const ContactInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed top-8 left-8 z-50">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-mono transition-all duration-300 hover:opacity-70"
      >
        <span>contact</span>
        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
      
      <div className={`transition-all duration-500 ease-out overflow-hidden ${
        isExpanded ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
      }`}>
        <div className="space-y-3 text-sm font-mono">
          <a 
            href="mailto:hello@designer.com" 
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
          >
            <Mail size={14} />
            <span>hello@designer.com</span>
          </a>
          <a 
            href="https://linkedin.com/in/designer" 
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
          >
            <Linkedin size={14} />
            <span>linkedin</span>
          </a>
          <a 
            href="tel:+1234567890" 
            className="flex items-center gap-2 transition-opacity duration-200 hover:opacity-70"
          >
            <Phone size={14} />
            <span>+1 (234) 567-8900</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
