import React from 'react';
import { 
  Globe, 
  Users, 
  UserCheck, 
  Calculator, 
  Megaphone, 
  Building, 
  Plus 
} from 'lucide-react';
import TiltCard from './TiltCard';

const BusinessSolutions = () => {
  const solutions = [
    {
      icon: Globe,
      title: "AI Website Assistant",
      description: "24/7 customer support and engagement on your website"
    },
    {
      icon: Users,
      title: "CRM AI",
      description: "Intelligent customer relationship management automation"
    },
    {
      icon: UserCheck,
      title: "HR Interview Bot",
      description: "Streamline recruitment with automated screening"
    },
    {
      icon: Calculator,
      title: "Accounting AI",
      description: "Financial data processing and automated reporting"
    },
    {
      icon: Megaphone,
      title: "Marketing Agent",
      description: "Content creation and campaign optimization"
    },
    {
      icon: Building,
      title: "Real Estate Agent",
      description: "Property inquiries and client management"
    }
  ];

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Business AI Solutions
          </h2>
          <p className="text-xl text-[#CCCCCC] max-w-3xl mx-auto">
            Custom AI agents designed for specific business functions and industries
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <TiltCard 
              key={index}
              maxTilt={10}
              scale={1.02}
              speed={350}
              glare={true}
              className="h-full"
            >
              <div className="group relative bg-[#2D2D3A]/10 backdrop-blur-sm rounded-2xl border border-[#2D2D3A]/20 p-8 h-full transition-all duration-400 hover:bg-[#2D2D3A]/20">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-[#2D2D3A]/20 rounded-xl border border-[#2D2D3A]/30 flex items-center justify-center group-hover:bg-[#2D2D3A]/30 transition-colors duration-400">
                    <solution.icon className="h-8 w-8 text-white" />
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-4">
                  {solution.title}
                </h3>
                
                <p className="text-[#CCCCCC] leading-relaxed">
                  {solution.description}
                </p>

                {/* Subtle inner glow on hover */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2D2D3A]/0 via-[#2D2D3A]/5 to-[#2D2D3A]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* More Solutions Button with Tilt Effect */}
        <div className="mt-12 text-center">
          <TiltCard maxTilt={8} scale={1.05} speed={300}>
            <button className="group inline-flex items-center space-x-2 px-8 py-4 bg-transparent text-white rounded-lg border border-[#2D2D3A] hover:bg-[#2D2D3A]/10 transition-all duration-400">
              <Plus className="h-5 w-5" />
              <span className="font-medium">More Solutions</span>
            </button>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default BusinessSolutions;