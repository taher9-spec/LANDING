export const useVoiceflow = () => {
  if (typeof window === 'undefined' || document.querySelector('script[src*="voiceflow"]')) {
    return;
  }

  (function(d: Document, t: string) {
    const v = d.createElement('script');
    const s = d.getElementsByTagName(t)[0];
    
    if (!s || !s.parentNode) return;
    
    (v as HTMLScriptElement).onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '6869b71486bd4c6c36457fb7' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production',
        voice: {
          url: "https://runtime-api.voiceflow.com"
        }
      });
    };
    
    (v as HTMLScriptElement).src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    (v as HTMLScriptElement).type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, 'script');
};
