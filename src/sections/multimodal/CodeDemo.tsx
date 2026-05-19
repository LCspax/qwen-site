import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, CheckCircle, Terminal } from 'lucide-react';

type Phase = 'idle' | 'selecting' | 'deleting' | 'typing' | 'compiled' | 'runnable' | 'running';

const initialCode = [
  'def calculate_sum(numbers):',
  '    result = 0',
  '    for n in numbers:',
  '        result += n',
  '    return result',
  '',
  'data = [1, 2, 3, 4, 5]',
  'print(calculate_sum(data))',
];

// Lines 1-3 (indices) will be selected and deleted
const selectedIndices = [1, 2, 3];
const replacementText = '    return sum(numbers)';

export default function CodeDemo() {
  const [phase, setPhase] = useState<Phase>('idle');
  const [visibleLines, setVisibleLines] = useState(initialCode);
  const [highlighted, setHighlighted] = useState(false);
  const [typedLine, setTypedLine] = useState('');
  const [output, setOutput] = useState('');

  const startEdit = () => {
    setPhase('selecting');
    setHighlighted(true);
    setTimeout(() => {
      setPhase('deleting');
      // Remove selected lines one by one
      let removed = 0;
      const timer = setInterval(() => {
        if (removed < selectedIndices.length) {
          setVisibleLines(prev => {
            const next = [...prev];
            next.splice(selectedIndices[0], 1);
            return next;
          });
          removed++;
        } else {
          clearInterval(timer);
          setHighlighted(false);
          setPhase('typing');
        }
      }, 300);
    }, 800);
  };

  // Typing phase
  useEffect(() => {
    if (phase !== 'typing') return;
    let charIndex = 0;
    setTypedLine('');
    const timer = setInterval(() => {
      charIndex++;
      setTypedLine(replacementText.slice(0, charIndex));
      if (charIndex >= replacementText.length) {
        clearInterval(timer);
        setPhase('compiled');
      }
    }, 80);
    return () => clearInterval(timer);
  }, [phase]);

  // Compiled → runnable
  useEffect(() => {
    if (phase !== 'compiled') return;
    setTimeout(() => setPhase('runnable'), 1000);
  }, [phase]);

  const handleRun = () => {
    setPhase('running');
    setOutput('15');
  };

  return (
    <div className="space-y-4">
      {/* Code editor */}
      <div className="glass-strong rounded-2xl overflow-hidden">
        {/* Terminal header */}
        <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06]">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="text-white/50 text-xs ml-2">main.py</span>
        </div>

        {/* Code content */}
        <div className="p-4 font-mono text-sm leading-6 overflow-x-auto">
          {visibleLines.map((line, idx) => {
            const isSelectedLine = highlighted && selectedIndices.includes(idx);
            return (
              <div
                key={`${idx}-${line}`}
                className={`flex transition-colors duration-300 ${
                  isSelectedLine ? 'bg-brand-blue/20 rounded' : ''
                }`}
              >
                <span className="text-white/30 w-6 text-right mr-3 select-none">{idx + 1}</span>
                <span className="text-emerald-300/80">
                  {line || <br />}
                </span>
              </div>
            );
          })}

          {/* Typed replacement line */}
          {(phase === 'typing' || phase === 'compiled' || phase === 'runnable' || phase === 'running') && typedLine && (
            <div className="flex">
              <span className="text-white/30 w-6 text-right mr-3 select-none">{2}</span>
              <span className="text-emerald-300/80">{typedLine}</span>
            </div>
          )}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center gap-3">
        {phase === 'idle' && (
          <button
            onClick={startEdit}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Play className="w-4 h-4 inline mr-1" />
            开始编辑
          </button>
        )}

        <AnimatePresence>
          {(phase === 'compiled' || phase === 'runnable' || phase === 'running') && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/40 rounded-full px-3 py-1.5"
            >
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span className="text-emerald-400 text-sm font-medium">编译完成</span>
            </motion.div>
          )}
        </AnimatePresence>

        {phase === 'runnable' && (
          <button
            onClick={handleRun}
            className="px-4 py-2 rounded-full glass-strong text-white/80 text-sm font-medium hover:text-white hover:border-white/20 transition-all"
          >
            <Terminal className="w-4 h-4 inline mr-1" />
            运行
          </button>
        )}
      </div>

      {/* Output */}
      <AnimatePresence>
        {output && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass rounded-xl px-4 py-3 font-mono text-sm"
          >
            <span className="text-white/40 mr-2">&gt;&gt;&gt;</span>
            <span className="text-brand-cyan">{output}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}