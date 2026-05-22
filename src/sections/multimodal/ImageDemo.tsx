import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';

type Phase = 'idle' | 'scanning' | 'detecting' | 'done';

const detections = [
  { label: '公交车', x: 3, y: 50, w: 28, h: 20 },
  { label: '轿车', x: 54, y: 46, w: 20, h: 18 },
  { label: '公寓楼', x: 0, y: 0, w: 15, h: 50 },
  { label: '公寓楼', x: 15, y: 0, w: 12, h: 50 },
  { label: '公寓楼', x: 27, y: 0, w: 13, h: 50 },
  { label: '公寓楼', x: 40, y: 0, w: 12, h: 50 },
  { label: '公寓楼', x: 52, y: 0, w: 13, h: 50 },
  { label: '公寓楼', x: 65, y: 0, w: 12, h: 50 },
  { label: '公寓楼', x: 77, y: 0, w: 23, h: 50 },
  { label: '道路', x: 0, y: 62, w: 100, h: 38 },
  { label: '人行道', x: 0, y: 46, w: 100, h: 16 },
];

export default function ImageDemo() {
  const [phase, setPhase] = useState<Phase>('idle');

  const startScan = () => {
    setPhase('scanning');
    setTimeout(() => setPhase('detecting'), 2000);
    setTimeout(() => setPhase('done'), 2000 + detections.length * 150 + 400);
  };

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] rounded-xl overflow-hidden">
        <img
          src={`${ASSET_BASE}street-scene.png`}
          alt="街景"
          className="w-full h-full object-cover"
        />

        {/* Scanning line */}
        {phase === 'scanning' && (
          <motion.div
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-brand-cyan to-transparent shadow-[0_0_12px_rgba(34,211,238,0.6)]"
            initial={{ top: '0%' }}
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, ease: 'linear' }}
          />
        )}

        {/* Detection boxes */}
        {(phase === 'detecting' || phase === 'done') && detections.map((d, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.3,
              delay: i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute border-2 border-white/90 rounded-sm"
            style={{
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: `${d.w}%`,
              height: `${d.h}%`,
            }}
          >
            <span className="absolute -top-1 left-0 text-[10px] bg-white/90 text-black px-1 rounded-sm font-medium leading-tight">
              {d.label}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        {phase === 'idle' && (
          <button
            onClick={startScan}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Play className="w-4 h-4 inline mr-1" />
            开始识别
          </button>
        )}

        <AnimatePresence>
          {phase === 'done' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-3 py-1.5"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">识别完成</span>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === 'scanning' && (
          <span className="text-white/50 text-sm animate-pulse">正在扫描...</span>
        )}
      </div>
    </div>
  );
}