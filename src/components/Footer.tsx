import React, { useState } from 'react';
import { Bot, Mail, MapPin, Phone, Send } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-[#2D2D3A]/20">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* About */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Bot className="h-8 w-8 text-white" />
              <span className="text-xl font-bold text-white">RuyaaCapital</span>
            </div>
            <p className="text-[#CCCCCC] leading-relaxed">
              Elite AI system builder specializing in custom AI agents for businesses and individuals.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-[#CCCCCC]">
                <Mail className="h-4 w-4" />
                <span>contact@ruyaacapital.ai</span>
              </div>
              <div className="flex items-center space-x-2 text-[#CCCCCC]">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-[#CCCCCC]">
                <MapPin className="h-4 w-4" />
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Services</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Custom AI Agents</a></li>
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Business Automation</a></li>
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Personal AI</a></li>
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Integration Services</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Resources</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Documentation</a></li>
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Case Studies</a></li>
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Blog</a></li>
              <li><a href="#" className="text-[#CCCCCC] hover:text-white transition-colors duration-300">Support</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6">Stay Updated</h3>
            <p className="text-[#CCCCCC] mb-4">
              Get the latest insights on AI automation and custom agent development.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-[#2D2D3A]/20 border border-[#2D2D3A]/30 rounded-lg text-white placeholder-[#CCCCCC]/50 focus:outline-none focus:border-[#2D2D3A] focus:ring-2 focus:ring-[#2D2D3A]/20 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-[#2D2D3A] text-white rounded-lg hover:bg-[#2D2D3A]/80 transition-colors duration-300"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-[#2D2D3A]/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-[#CCCCCC] text-sm">
              © 2024 RuyaaCapital-AI. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-[#CCCCCC] hover:text-white text-sm transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-[#CCCCCC] hover:text-white text-sm transition-colors duration-300">Terms of Service</a>
              <a href="#" className="text-[#CCCCCC] hover:text-white text-sm transition-colors duration-300">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;