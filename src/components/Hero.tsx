import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import VoiceAI from './VoiceAI';

const Hero = () => {
  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen lg:h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content - Left Side */}
          <div className="text-center lg:text-left">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Your Own AI Assistant — Built for You
            </h1>

            {/* Subtext */}
            <p className="text-xl sm:text-2xl text-[#CCCCCC] mb-12 leading-relaxed">
              Smart agents that reply, book, suggest, and act like your assistant.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <button 
                onClick={scrollToDemo}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#0A0A0B] to-[#2D2D3A] text-white rounded-lg border border-[#2D2D3A] hover:shadow-xl hover:shadow-[#2D2D3A]/30 hover:scale-105 transition-all duration-400"
              >
                <Play className="h-5 w-5" />
                <span className="font-medium">Try the Demo Agent</span>
              </button>
              
              <button 
                onClick={scrollToContact}
                className="group flex items-center justify-center space-x-2 px-8 py-4 bg-transparent text-white rounded-lg border border-white hover:shadow-lg hover:shadow-white/20 transition-all duration-400"
              >
                <span className="font-medium">Book Consultation</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Live Voice AI Component - Right Side */}
          <div className="relative flex items-center justify-center">
            <VoiceAI />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;