// This is a minimal hook that just loads the Voiceflow script once
// and provides a way to trigger the chat

import { useEffect, useCallback } from 'react';

export const useVoiceflow = () => {
  const loadScript = useCallback(() => {
    // Check if script is already loaded
    if (document.querySelector('script[src*="voiceflow"]')) {
      return;
    }
    
    const script = document.createElement('script');
    script.src = 'https://cdn.voiceflow.com/widget-next/bundle.js';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      // Initialize Voiceflow chat using the global window object
      const voiceflow = (window as { voiceflow?: { chat?: { load: (config: unknown) => void } } }).voiceflow;
      if (voiceflow?.chat) {
        voiceflow.chat.load({
          verify: { projectID: '6869b71486bd4c6c36457fb7' },
          url: 'https://general-runtime.voiceflow.com',
          versionID: 'production'
        });
      }
    };
    document.body.appendChild(script);
  }, []);

  const openChat = useCallback(() => {
    // This will be called when the user clicks the card
    const chatButton = document.querySelector('.vfrc-launcher') as HTMLElement;
    if (chatButton) {
      chatButton.click();
    }
  }, []);

  useEffect(() => {
    loadScript();
  }, [loadScript]);

  return { openChat };
};
