import Header from './components/Header';
import Hero from './components/Hero';
import CustomAISection from './components/CustomAISection';
import BusinessSolutions from './components/BusinessSolutions';
import PersonalAI from './components/PersonalAI';
import Footer from './components/Footer';
import { useVoiceflow } from './hooks/useVoiceflow';

function App() {
  // Initialize Voiceflow chat widget
  useVoiceflow();

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
      <Header />
      <Hero />
      <CustomAISection />
      <BusinessSolutions />
      <PersonalAI />
      <Footer />
    </div>
  );
}

export default App;