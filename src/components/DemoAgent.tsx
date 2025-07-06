import { ArrowRight, Bot } from 'lucide-react';
import { useVoiceflow } from '../hooks/useVoiceflow';
import TiltCard from './TiltCard';

const DemoAgent = () => {
  const { openChat } = useVoiceflow();

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Experience Our AI Agent
          </h2>
          <p className="text-xl text-[#CCCCCC] max-w-2xl mx-auto">
            Interact with a live demo of our custom AI agent technology
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <TiltCard 
            maxTilt={10} 
            scale={1.02} 
            speed={350} 
            glare={true}
            className="h-full"
          >
            <div 
              onClick={openChat}
              className="group relative bg-[#2D2D3A]/10 backdrop-blur-sm rounded-2xl border border-[#2D2D3A]/20 p-8 h-full transition-all duration-400 hover:bg-[#2D2D3A]/20 cursor-pointer"
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-[#2D2D3A]/20 rounded-xl border border-[#2D2D3A]/30 flex items-center justify-center group-hover:bg-[#2D2D3A]/30 transition-colors duration-400">
                  <Bot className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4">
                Test Your Agent
              </h3>
              
              <p className="text-[#CCCCCC] leading-relaxed mb-6">
                Click here to start a conversation with our intelligent AI assistant. Get instant answers to your questions and experience the future of AI interaction.
              </p>

              <div className="inline-flex items-center text-white/70 group-hover:text-white transition-colors duration-300">
                <span>Start Chatting</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 duration-300" />
              </div>

              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2D2D3A]/0 via-[#2D2D3A]/5 to-[#2D2D3A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
            </div>
          </TiltCard>
        </div>
        
        {/* Voiceflow Container (hidden, only used for the chat button) */}
        <div id="voiceflow-chat" className="hidden"></div>
      </div>
    </section>
  );
};

export default DemoAgent;