import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceAIProps {
  className?: string;
}

type VoiceState = 'idle' | 'listening' | 'thinking' | 'speaking';

const VoiceAI: React.FC<VoiceAIProps> = ({ className = '' }) => {
  const [voiceState, setVoiceState] = useState<VoiceState>('idle');
  const [isEnabled, setIsEnabled] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [audioLevel, setAudioLevel] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationFrameRef = useRef<number>();

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      if (recognitionRef.current) {
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'ar-SY'; // Syrian Arabic
        
        recognitionRef.current.onstart = () => {
          setVoiceState('listening');
        };
        
        recognitionRef.current.onresult = (event) => {
          const current = event.resultIndex;
          const transcript = event.results[current][0].transcript;
          setTranscript(transcript);
          
          if (event.results[current].isFinal) {
            handleVoiceInput(transcript);
          }
        };
        
        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setVoiceState('idle');
          
          // Provide user-friendly error messages based on error type
          let errorMessage = '';
          switch (event.error) {
            case 'network':
              errorMessage = 'حدث خطأ في الشبكة. يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.';
              break;
            case 'not-allowed':
              errorMessage = 'يرجى السماح بالوصول للميكروفون لاستخدام المساعد الصوتي.';
              break;
            case 'no-speech':
              errorMessage = 'لم يتم اكتشاف أي كلام. يرجى المحاولة مرة أخرى.';
              break;
            case 'audio-capture':
              errorMessage = 'حدث خطأ في تسجيل الصوت. يرجى التحقق من الميكروفون.';
              break;
            case 'service-not-allowed':
              errorMessage = 'خدمة التعرف على الكلام غير متاحة حالياً.';
              break;
            default:
              errorMessage = 'حدث خطأ في التعرف على الكلام. يرجى المحاولة مرة أخرى.';
          }
          
          setResponse(errorMessage);
        };
        
        recognitionRef.current.onend = () => {
          if (voiceState === 'listening') {
            setVoiceState('idle');
          }
        };
      }
    }
    
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, [voiceState]);

  // Audio level monitoring
  const startAudioMonitoring = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      microphoneRef.current = audioContextRef.current.createMediaStreamSource(stream);
      
      microphoneRef.current.connect(analyserRef.current);
      analyserRef.current.fftSize = 256;
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        if (analyserRef.current && voiceState === 'listening') {
          analyserRef.current.getByteFrequencyData(dataArray);
          const average = dataArray.reduce((a, b) => a + b) / bufferLength;
          setAudioLevel(average / 255);
          animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
        }
      };
      
      updateAudioLevel();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleVoiceInput = async (text: string) => {
    setVoiceState('thinking');
    
    try {
      // Call OpenRouter API with Llama model
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-3-8b-instruct',
          messages: [
            {
              role: 'system',
              content: `أنت "رؤيا AI" - المساعد الذكي الرسمي لشركة RuyaaCapital.
تحدث بالعربية السورية بطريقة ودودة وطبيعية.
مهمتك:
- شرح خدمات الوكلاء الذكيين المخصصين من رؤيا بوضوح
- مساعدة المستخدمين في التنقل في الموقع
- توجيه المستخدمين خلال عملية بناء الوكيل إذا كانوا مهتمين
- لا تبدو آلياً أو عاماً - تحدث كمساعد حقيقي
- ابق ضمن نطاق رؤيا فقط - لا مواضيع خارجية
- إذا كان المستخدم مهتماً، اعرض مساعدته في التسجيل أو توجيهه لملء نموذج "بناء وكيلي"`
            },
            {
              role: 'user',
              content: text
            }
          ],
          max_tokens: 150,
          temperature: 0.7
        })
      });

      const data = await response.json();
      const aiResponse = data.choices[0]?.message?.content || 'عذراً، لم أتمكن من فهم طلبك.';
      
      setResponse(aiResponse);
      await speakResponse(aiResponse);
      
    } catch (error) {
      console.error('Error processing voice input:', error);
      const errorMessage = 'عذراً، حدث خطأ في المعالجة.';
      setResponse(errorMessage);
      await speakResponse(errorMessage);
    }
  };

  const speakResponse = async (text: string) => {
    setVoiceState('speaking');
    
    try {
      // Call ElevenLabs TTS API
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/QRq5hPRAKf5ZhSlTBH6r`, {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': 'sk_5985b309e0ae65140d345358dd7007092e33e182ee9e9cb9'
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.5,
            use_speaker_boost: true
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        
        audio.onended = () => {
          setVoiceState('idle');
          URL.revokeObjectURL(audioUrl);
        };
        
        await audio.play();
      } else {
        // Fallback to browser TTS
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ar-SA';
        utterance.rate = 0.9;
        utterance.pitch = 1;
        
        utterance.onend = () => {
          setVoiceState('idle');
        };
        
        speechSynthesis.speak(utterance);
      }
    } catch (error) {
      console.error('Error with TTS:', error);
      setVoiceState('idle');
    }
  };

  const toggleVoice = async () => {
    if (!isEnabled) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsEnabled(true);
        await startAudioMonitoring();
      } catch (error) {
        console.error('Microphone permission denied:', error);
        alert('يرجى السماح بالوصول للميكروفون لاستخدام المساعد الصوتي');
        return;
      }
    }

    if (voiceState === 'idle') {
      if (recognitionRef.current) {
        setTranscript('');
        setResponse('');
        recognitionRef.current.start();
      }
    } else if (voiceState === 'listening') {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setVoiceState('idle');
    }
  };

  const getStateText = () => {
    switch (voiceState) {
      case 'listening': return 'أستمع...';
      case 'thinking': return 'أفكر...';
      case 'speaking': return 'أتحدث...';
      default: return 'اضغط للتحدث';
    }
  };

  const getWaveformIntensity = () => {
    if (voiceState === 'listening') return audioLevel;
    if (voiceState === 'thinking') return Math.sin(Date.now() / 200) * 0.5 + 0.5;
    if (voiceState === 'speaking') return Math.sin(Date.now() / 100) * 0.8 + 0.2;
    return 0.1;
  };

  return (
    <div className={`relative flex flex-col items-center ${className}`}>
      {/* AI Head/Orb */}
      <div className="relative mb-8">
        {/* Main AI Orb */}
        <div 
          className="w-80 h-80 bg-gradient-to-br from-[#2D2D3A]/30 to-transparent rounded-full border border-[#2D2D3A]/20 backdrop-blur-sm flex items-center justify-center relative overflow-hidden"
          style={{
            boxShadow: `0 0 ${50 + getWaveformIntensity() * 100}px rgba(45, 45, 58, ${0.3 + getWaveformIntensity() * 0.4})`
          }}
        >
          {/* Inner Orb */}
          <div 
            className="w-56 h-56 bg-gradient-to-br from-[#2D2D3A]/50 to-transparent rounded-full border border-[#2D2D3A]/30 flex items-center justify-center relative"
            style={{
              transform: `scale(${1 + getWaveformIntensity() * 0.1})`,
              transition: voiceState === 'idle' ? 'transform 0.3s ease' : 'none'
            }}
          >
            {/* Core */}
            <div 
              className="w-32 h-32 bg-gradient-to-br from-[#2D2D3A]/70 to-transparent rounded-full border border-[#2D2D3A]/40 flex items-center justify-center"
              style={{
                transform: `scale(${1 + getWaveformIntensity() * 0.15})`,
                transition: voiceState === 'idle' ? 'transform 0.3s ease' : 'none'
              }}
            >
              {/* Voice State Icon */}
              <div className="relative">
                {voiceState === 'listening' && (
                  <Mic className="h-16 w-16 text-white animate-pulse" />
                )}
                {voiceState === 'thinking' && (
                  <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                {voiceState === 'speaking' && (
                  <Volume2 className="h-16 w-16 text-white animate-pulse" />
                )}
                {voiceState === 'idle' && (
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-white rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Waveform Rings */}
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute inset-0 rounded-full border border-white/10"
              style={{
                transform: `scale(${1 + (getWaveformIntensity() * ring * 0.1)})`,
                opacity: getWaveformIntensity() * (1 - ring * 0.2),
                transition: voiceState === 'idle' ? 'all 0.3s ease' : 'none'
              }}
            />
          ))}
        </div>

        {/* Floating Elements */}
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#2D2D3A]/60 rounded-full border border-[#2D2D3A]/40 flex items-center justify-center animate-bounce">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
        </div>
        <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-[#2D2D3A]/60 rounded-full border border-[#2D2D3A]/40 flex items-center justify-center animate-bounce delay-500">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-500"></div>
        </div>
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-[#2D2D3A]/60 rounded-full border border-[#2D2D3A]/40 flex items-center justify-center animate-bounce delay-1000">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-1000"></div>
        </div>
        <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 w-16 h-16 bg-[#2D2D3A]/60 rounded-full border border-[#2D2D3A]/40 flex items-center justify-center animate-bounce delay-700">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse delay-700"></div>
        </div>
      </div>

      {/* Talk to Me Button */}
      <button
        onClick={toggleVoice}
        disabled={voiceState === 'thinking' || voiceState === 'speaking'}
        className={`group flex items-center space-x-3 px-8 py-4 rounded-lg border transition-all duration-400 font-medium ${
          voiceState === 'listening'
            ? 'bg-red-500/20 border-red-500/50 text-red-300'
            : 'bg-[#2D2D3A]/20 border-[#2D2D3A]/50 text-white hover:bg-[#2D2D3A]/30 hover:border-[#2D2D3A]/70'
        } ${
          (voiceState === 'thinking' || voiceState === 'speaking') ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {voiceState === 'listening' ? (
          <MicOff className="h-5 w-5" />
        ) : (
          <Mic className="h-5 w-5" />
        )}
        <span>{getStateText()}</span>
      </button>

      {/* Status Display */}
      <div className="mt-6 text-center max-w-md">
        {transcript && (
          <div className="mb-4 p-3 bg-[#2D2D3A]/20 rounded-lg border border-[#2D2D3A]/30">
            <p className="text-sm text-[#CCCCCC] mb-1">أنت قلت:</p>
            <p className="text-white">{transcript}</p>
          </div>
        )}
        
        {response && (
          <div className="p-3 bg-[#2D2D3A]/20 rounded-lg border border-[#2D2D3A]/30">
            <p className="text-sm text-[#CCCCCC] mb-1">رؤيا AI:</p>
            <p className="text-white">{response}</p>
          </div>
        )}
        
        {!isEnabled && (
          <p className="text-sm text-[#CCCCCC]/70 mt-4">
            اضغط "تحدث معي" للسماح بالوصول للميكروفون
          </p>
        )}
      </div>
    </div>
  );
};

export default VoiceAI;