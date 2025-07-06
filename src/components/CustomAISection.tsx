import React from 'react';
import { Brain, Calendar, MessageCircle, Settings, Users, Zap } from 'lucide-react';
import TiltCard from './TiltCard';

const CustomAISection = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            What Is a Custom AI Agent?
          </h2>
          <p className="text-xl text-[#CCCCCC] max-w-3xl mx-auto">
            This is NOT a chatbot. It's a sophisticated AI system trained specifically for your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Custom AI Agent Image with Enhanced Tilt */}
          <div className="relative">
            <TiltCard maxTilt={20} scale={1.08} speed={600} glare={true}>
              <figure className="aspect-square bg-gradient-to-br from-[#2D2D3A]/20 to-transparent rounded-3xl border border-[#2D2D3A]/20 backdrop-blur-sm overflow-hidden">
                <img 
                  src="/ruyaa-customizable-agent.png"
                  alt="Ruyaa's customizable AI agent system showcasing intelligent automation capabilities including appointment scheduling, data analysis, and seamless integration across multiple business functions"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </figure>
            </TiltCard>
          </div>

          {/* Content with Tilt Cards */}
          <div className="space-y-8">
            <div className="space-y-6">
              <TiltCard maxTilt={6} scale={1.01} speed={400}>
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-[#2D2D3A]/5 transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#2D2D3A]/20 rounded-lg border border-[#2D2D3A]/30 flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Book Appointments</h3>
                    <p className="text-[#CCCCCC]">
                      Automatically schedule meetings, handle cancellations, and manage your calendar with intelligent coordination.
                    </p>
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={6} scale={1.01} speed={400}>
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-[#2D2D3A]/5 transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#2D2D3A]/20 rounded-lg border border-[#2D2D3A]/30 flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Suggest, Follow Up, Reply</h3>
                    <p className="text-[#CCCCCC]">
                      Proactively suggest solutions, follow up on important matters, and handle routine communications with context.
                    </p>
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={6} scale={1.01} speed={400}>
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-[#2D2D3A]/5 transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#2D2D3A]/20 rounded-lg border border-[#2D2D3A]/30 flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">ChatGPT Integration</h3>
                    <p className="text-[#CCCCCC]">
                      Seamlessly integrate with ChatGPT or deploy as a standalone hosted agent with full customization.
                    </p>
                  </div>
                </div>
              </TiltCard>

              <TiltCard maxTilt={6} scale={1.01} speed={400}>
                <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-[#2D2D3A]/5 transition-colors duration-300">
                  <div className="w-12 h-12 bg-[#2D2D3A]/20 rounded-lg border border-[#2D2D3A]/30 flex items-center justify-center flex-shrink-0">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Full Business Control</h3>
                    <p className="text-[#CCCCCC]">
                      Monitor all conversations, maintain oversight, and control your AI agent's behavior and responses.
                    </p>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomAISection;