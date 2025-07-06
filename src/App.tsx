import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import DemoAgent from './components/DemoAgent';
import CustomAISection from './components/CustomAISection';
import BusinessSolutions from './components/BusinessSolutions';
import PersonalAI from './components/PersonalAI';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <Header />
      <Hero />
      <DemoAgent />
      <CustomAISection />
      <BusinessSolutions />
      <PersonalAI />
      <Footer />
    </div>
  );
}

export default App;