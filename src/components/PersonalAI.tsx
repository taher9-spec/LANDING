import React, { useState } from 'react';
import { User, Briefcase, TrendingUp, ArrowRight, X } from 'lucide-react';
import TiltCard from './TiltCard';

const PersonalAI = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const personalTypes = [
    {
      icon: User,
      title: "Creators",
      description: "Content scheduling, fan engagement, brand management"
    },
    {
      icon: Briefcase,
      title: "Influencers",
      description: "Social media automation, collaboration tracking"
    },
    {
      icon: TrendingUp,
      title: "Traders",
      description: "Market analysis, portfolio management, alerts"
    }
  ];

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'fullName':
        return value.trim() ? '' : 'Full name is required';
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case 'message':
        return value.trim() ? '' : 'Message is required';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const newErrors: Record<string, string> = {};
    newErrors.fullName = validateField('fullName', formData.fullName);
    newErrors.email = validateField('email', formData.email);
    newErrors.message = validateField('message', formData.message);
    
    const hasErrors = Object.values(newErrors).some(error => error !== '');
    setErrors(newErrors);
    
    if (hasErrors) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://formspree.io/f/mrbkvlrp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setIsSuccess(true);
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          businessType: '',
          message: ''
        });
        setTimeout(() => {
          setIsSuccess(false);
          setIsModalOpen(false);
        }, 3000);
      } else {
        throw new Error('Failed to submit form');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <section id="personal-ai" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Personal AI Agent
          </h2>
          <p className="text-xl text-[#CCCCCC] max-w-3xl mx-auto">
            For individuals who need intelligent automation and personalized assistance
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Personal Types */}
          <div className="space-y-6">
            {personalTypes.map((type, index) => (
              <TiltCard 
                key={index}
                maxTilt={8}
                scale={1.02}
                speed={400}
                glare={true}
              >
                <div className="group flex items-start space-x-4 p-6 bg-[#2D2D3A]/10 backdrop-blur-sm rounded-2xl border border-[#2D2D3A]/20 hover:bg-[#2D2D3A]/20 transition-all duration-400">
                  <div className="w-12 h-12 bg-[#2D2D3A]/20 rounded-lg border border-[#2D2D3A]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2D2D3A]/30 transition-colors duration-400">
                    <type.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">{type.title}</h3>
                    <p className="text-[#CCCCCC]">{type.description}</p>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* AI Agent Power Image with Tilt */}
          <div className="relative">
            <TiltCard maxTilt={15} scale={1.05} speed={500} glare={true}>
              <figure className="aspect-square bg-gradient-to-br from-[#2D2D3A]/20 to-transparent rounded-3xl border border-[#2D2D3A]/20 backdrop-blur-sm overflow-hidden">
                <img 
                  src="/ruyaa-agent-power.png"
                  alt="Ruyaa AI Agent showcasing intelligent automation capabilities including appointment scheduling, data analysis, and seamless integration across multiple business functions"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
            </TiltCard>
          </div>
        </div>

        {/* CTA with Tilt Effect */}
        <div className="mt-16 text-center">
          <TiltCard maxTilt={10} scale={1.08} speed={300}>
            <button 
              onClick={openModal}
              className="group inline-flex items-center space-x-2 px-8 py-4 bg-[#2D2D3A] text-white rounded-lg border border-[#2D2D3A] hover:shadow-xl hover:shadow-[#2D2D3A]/20 transition-all duration-400"
            >
              <span className="font-medium">Build My Agent</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </TiltCard>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={closeModal}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-[#0A0A0B] border border-[#2D2D3A]/30 rounded-2xl p-8 w-full max-w-md max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-[#CCCCCC] hover:text-white transition-colors duration-300"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Header */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Build My Agent</h3>
              <p className="text-[#CCCCCC]">Tell us about your needs and we'll create a custom AI agent for you.</p>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-green-400 text-center font-medium">
                  Thanks! We'll get back to you shortly.
                </p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#2D2D3A]/20 border rounded-lg text-white placeholder-[#CCCCCC]/50 focus:outline-none focus:ring-2 focus:ring-[#2D2D3A]/50 transition-all duration-300 ${
                    errors.fullName ? 'border-red-500/50' : 'border-[#2D2D3A]/30'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <p className="mt-1 text-sm text-red-400">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 bg-[#2D2D3A]/20 border rounded-lg text-white placeholder-[#CCCCCC]/50 focus:outline-none focus:ring-2 focus:ring-[#2D2D3A]/50 transition-all duration-300 ${
                    errors.email ? 'border-red-500/50' : 'border-[#2D2D3A]/30'
                  }`}
                  placeholder="Enter your email address"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2D2D3A]/20 border border-[#2D2D3A]/30 rounded-lg text-white placeholder-[#CCCCCC]/50 focus:outline-none focus:ring-2 focus:ring-[#2D2D3A]/50 transition-all duration-300"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Business Type */}
              <div>
                <label htmlFor="businessType" className="block text-sm font-medium text-white mb-2">
                  Business Type
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-[#2D2D3A]/20 border border-[#2D2D3A]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#2D2D3A]/50 transition-all duration-300"
                >
                  <option value="">Select business type</option>
                  <option value="Clinic">Clinic</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Trading">Trading</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 bg-[#2D2D3A]/20 border rounded-lg text-white placeholder-[#CCCCCC]/50 focus:outline-none focus:ring-2 focus:ring-[#2D2D3A]/50 transition-all duration-300 resize-none ${
                    errors.message ? 'border-red-500/50' : 'border-[#2D2D3A]/30'
                  }`}
                  placeholder="Tell us about your AI agent requirements..."
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                  <p className="text-red-400 text-sm">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || isSuccess}
                className="w-full px-6 py-3 bg-[#2D2D3A] text-white rounded-lg border border-[#2D2D3A] hover:shadow-lg hover:shadow-[#2D2D3A]/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-400 font-medium"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default PersonalAI;