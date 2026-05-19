import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

type Phase = 'idle' | 'responding' | 'done';

const responseText = '哈哈，看到你了，想给我看些什么有趣的呀';

export default function VideoDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [displayedText, setDisplayedText] = useState('');
  const [ended, setEnded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7;
    }
  }, []);

  useEffect(() => {
    // Auto-start response after 1s
    if (phase !== 'idle') return;
    const timer = setTimeout(() => setPhase('responding'), 1000);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'responding') return;

    // 1.5s of bouncing dots, then start typing
    const startDelay = setTimeout(() => {
      let charIndex = 0;
      const typingTimer = setInterval(() => {
        charIndex++;
        setDisplayedText(responseText.slice(0, charIndex));
        if (charIndex >= responseText.length) {
          clearInterval(typingTimer);
          setPhase('done');
        }
      }, 40);
      return () => clearInterval(typingTimer);
    }, 1500);

    return () => clearTimeout(startDelay);
  }, [phase]);

  return (
    <div className="space-y-6">
      {/* Video */}
      <div className="aspect-video glass rounded-xl relative overflow-hidden">
        <video
          ref={videoRef}
          src="/demo-video.mp4"
          className={`w-full h-full object-cover transition-all duration-[1500ms] ${ended ? 'blur-md brightness-75' : ''}`}
          autoPlay
          muted
          playsInline
          onEnded={() => setEnded(true)}
        />
      </div>

      {/* Response area */}
      <div className="glass-strong rounded-2xl px-5 py-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span className="text-cyan-400 text-xs font-medium">Qwen</span>
        </div>

        {phase === 'responding' && displayedText === '' && (
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
        )}

        {displayedText && (
          <p className="text-white/90 text-sm leading-relaxed">{displayedText}</p>
        )}
      </div>
    </div>
  );
}