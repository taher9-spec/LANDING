import React, { useEffect } from 'react';
import { MessageSquare } from 'lucide-react';

const DemoAgent = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `\
  (function(d,t){
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function(){
      window.voiceflow.chat.load({
        verify:{projectID:'6869b71486bd4c6c36457fb7'},
        url:'https://general-runtime.voiceflow.com',
        versionID:'production',
        voice:{url:"https://runtime-api.voiceflow.com"},
        enablePopover:true
      });
    };
    v.src="https://cdn.voiceflow.com/widget-next/bundle.mjs";
    v.type="text/javascript";
    s.parentNode.insertBefore(v,s);
  })(document,'script');`;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
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

        {/* Demo Container */}
        <div className="relative">
          <div className="aspect-video bg-[#2D2D3A]/10 backdrop-blur-sm rounded-2xl border border-[#2D2D3A]/20 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2D2D3A]/5 to-transparent"></div>
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center">
                <MessageSquare className="h-16 w-16 text-[#CCCCCC] mx-auto mb-4 opacity-50" />
                <h3 className="text-2xl font-semibold text-white mb-2">Try our Voiceflow Agent</h3>
                <p className="text-[#CCCCCC] max-w-md mx-auto">
                  Click the chat bubble in the corner to start a conversation with our AI agent.
                </p>
              </div>
            </div>
          </div>
          
          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#2D2D3A]/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 pointer-events-none"></div>
        </div>
      </div>
    </section>
  );
};

export default DemoAgent;