interface VoiceflowChat {
  load: (config: {
    verify: { projectID: string };
    url: string;
    versionID: string;
    voice?: {
      url: string;
    };
  }) => void;
}

declare global {
  interface Window {
    voiceflow: {
      chat: VoiceflowChat;
    };
  }
}

export {};
