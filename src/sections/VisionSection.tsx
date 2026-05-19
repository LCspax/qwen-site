import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeInUp } from '../lib/animations';

export default function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const glowScale = useTransform(scrollYProgress, [0.3, 0.7], [1, 3]);

  return (
    <section
      id="vision"
      ref={containerRef}
      className="section-padding relative overflow-hidden min-h-screen flex items-center"
    >
      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        <motion.div className="relative mb-16" style={{ scale: glowScale }}>
          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto animate-pulse-slow" />
          <div className="absolute inset-0 w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 mx-auto blur-xl opacity-60" />
          <div className="absolute inset-0 w-16 h-16 -m-6 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 mx-auto blur-2xl" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/60 text-lg md:text-xl mb-6 tracking-wide"
        >
          AI，不只是技术
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-3xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-8"
        >
          而是下一代人与世界的
          <br />
          <span className="text-gradient">连接方式</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="space-y-2"
        >
          <p className="text-2xl md:text-4xl font-light text-white/90">千问</p>
          <p className="text-white/50 text-base md:text-lg">与你一起进入智能时代</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
