import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Mic, Sparkles } from 'lucide-react';

type Phase = 'idle' | 'listening' | 'responding' | 'done';

const responseText = '你唱的真好，我打100分';

const POINTS = 80;
const CENTER_Y = 50;
const WIDTH = 800;
const HEIGHT = 100;

function generateFlatPath(): string {
  const points: string[] = [];
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * WIDTH;
    points.push(`${i === 0 ? 'M' : 'L'} ${x} ${CENTER_Y}`);
  }
  return points.join(' ');
}

function generateWavePath(elapsed: number): string {
  const points: string[] = [];
  for (let i = 0; i <= POINTS; i++) {
    const x = (i / POINTS) * WIDTH;
    const t = i / POINTS;
    const distFromCenter = Math.abs(2 * t - 1);
    const edgeEnvelope = Math.pow(distFromCenter, 2);
    const noise = (Math.random() - 0.5) * 12 * edgeEnvelope;
    const amplitude = 30 * edgeEnvelope + Math.random() * 8 * edgeEnvelope;
    const y = CENTER_Y + Math.sin(i * 0.4 + elapsed * 50) * amplitude
              + Math.sin(i * 0.9 + elapsed * 25) * (amplitude * 0.2)
              + noise;
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
  }
  return points.join(' ');
}

export default function AudioDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [wavePath, setWavePath] = useState(generateFlatPath());
  const [displayedText, setDisplayedText] = useState('');
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  const startListening = useCallback(() => {
    if (phase !== 'idle') return;
    setPhase('listening');
    startTimeRef.current = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startTimeRef.current) / 1000;
      setWavePath(generateWavePath(elapsed));
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
  }, [phase]);

  const stopListening = useCallback(() => {
    if (phase !== 'listening') return;
    cancelAnimationFrame(rafRef.current);
    setWavePath(generateFlatPath());
    setPhase('responding');
  }, [phase]);

  useEffect(() => {
    if (phase !== 'responding') return;
    const dotsDelay = setTimeout(() => {
      let charIndex = 0;
      const timer = setInterval(() => {
        charIndex++;
        setDisplayedText(responseText.slice(0, charIndex));
        if (charIndex >= responseText.length) {
          clearInterval(timer);
          setPhase('done');
        }
      }, 80);
      return () => clearInterval(timer);
    }, 1000);
    return () => clearTimeout(dotsDelay);
  }, [phase]);

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <>
      {/* Waveform — rendered at the highest z-layer, spans full viewport */}
      <div className="fixed inset-x-0 top-[65%] z-[210] pointer-events-none">
        <svg className="w-full h-24" viewBox={`0 0 ${WIDTH} ${HEIGHT}`}>
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
          <path
            d={wavePath}
            stroke="url(#waveGradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Content — Qwen response above, mic button below */}
      <div className="flex flex-col items-center gap-4 relative z-[215] mt-16">
        {/* Response area */}
        {(phase === 'responding' || phase === 'done') && (
          <div className="glass-strong rounded-2xl px-5 py-4 w-full max-w-lg">
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
        )}

        {/* Status text */}
        <div className="text-center h-6">
          {phase === 'listening' && (
            <p className="text-brand-cyan text-sm animate-pulse">千问聆听中...</p>
          )}
          {phase === 'idle' && (
            <p className="text-white/40 text-sm">按下麦克风开始对话</p>
          )}
        </div>

        {/* Mic button */}
        <button
          onPointerDown={startListening}
          onPointerUp={stopListening}
          onPointerLeave={phase === 'listening' ? stopListening : undefined}
          onPointerCancel={phase === 'listening' ? stopListening : undefined}
          className={`w-16 h-16 rounded-full flex items-center justify-center transition-all select-none ${
            phase === 'listening'
              ? 'bg-gradient-to-br from-brand-blue to-brand-cyan scale-110 glow-blue'
              : 'glass-strong hover:border-white/20'
          }`}
        >
          <Mic className={`w-6 h-6 ${phase === 'listening' ? 'text-white animate-pulse' : 'text-white/80'}`} />
        </button>
      </div>
    </>
  );
}