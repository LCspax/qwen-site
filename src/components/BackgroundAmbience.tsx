import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function BackgroundAmbience() {
  const ref = useRef<HTMLDivElement>(null);
  // 当滚动进度超过约 40%（大约到达 scroll story 区域）时淡出
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.35, 0.45], [1, 0]);

  return (
    <motion.div ref={ref} style={{ opacity }} className="fixed inset-0 pointer-events-none z-0">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050810] via-[#0a0e1a] to-[#0d1220]" />

      {/* Ambient light orbs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/[0.06] rounded-full blur-[120px] animate-pulse-slow" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/[0.05] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/[0.04] rounded-full blur-[140px]" />
      <div className="absolute top-1/3 left-0 w-[400px] h-[400px] bg-pink-400/[0.03] rounded-full blur-[100px] animate-pulse-slow" style={{ animationDelay: '3s' }} />
    </motion.div>
  );
}