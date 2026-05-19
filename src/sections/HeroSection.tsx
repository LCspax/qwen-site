import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const slideDown = {
  initial: { opacity: 0, y: -60 },
  animate: { opacity: 1, y: 0 },
};

const ease = [0.16, 1, 0.3, 1];

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          {...slideDown}
          transition={{ duration: 0.8, ease, delay: 0 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-white/80">下一代 AI 智能伙伴</span>
          </div>
        </motion.div>

        <motion.h1
          {...slideDown}
          transition={{ duration: 0.8, ease, delay: 0.15 }}
          className="text-7xl md:text-9xl font-bold tracking-tight mb-6"
        >
          <span className="text-gradient">千问</span>
        </motion.h1>

        <motion.p
          {...slideDown}
          transition={{ duration: 0.8, ease, delay: 0.3 }}
          className="text-xl md:text-2xl text-white/60 mb-4 font-light"
        >
          重新定义人与 AI 的关系
        </motion.p>

        <motion.p
          {...slideDown}
          transition={{ duration: 0.8, ease, delay: 0.45 }}
          className="text-base text-white/40 mb-12"
        >
          连接您与世界。
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border border-white/20 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1.5 h-3 bg-white/40 rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
