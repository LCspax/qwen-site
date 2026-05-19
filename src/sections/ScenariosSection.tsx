import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Briefcase, Code, Palette } from 'lucide-react';
import { fadeInUp } from '../lib/animations';

const scenarios = [
  {
    icon: BookOpen,
    title: '学习',
    subtitle: '你的全天候导师',
    features: ['解题', '总结', '论文辅助', '语言学习'],
    color: 'from-blue-500/20 to-cyan-500/20',
    glow: 'shadow-blue-500/10',
    stroke: '#3b82f6',
    stroke2: '#22d3ee',
  },
  {
    icon: Briefcase,
    title: '办公',
    subtitle: '更快完成复杂工作',
    features: ['写邮件', '数据分析', '会议总结', '自动生成 PPT'],
    color: 'from-purple-500/20 to-pink-500/20',
    glow: 'shadow-purple-500/10',
    stroke: '#8b5cf6',
    stroke2: '#ec4899',
  },
  {
    icon: Code,
    title: '编程',
    subtitle: '为开发者而生',
    features: ['代码生成', 'Debug', '项目架构', 'Unity / Web / AI 开发'],
    color: 'from-emerald-500/20 to-teal-500/20',
    glow: 'shadow-emerald-500/10',
    stroke: '#10b981',
    stroke2: '#14b8a6',
  },
  {
    icon: Palette,
    title: '创意',
    subtitle: '激发无限创造力',
    features: ['海报', '视频脚本', 'UI 设计', '游戏概念设计'],
    color: 'from-orange-500/20 to-amber-500/20',
    glow: 'shadow-orange-500/10',
    stroke: '#f97316',
    stroke2: '#f59e0b',
  },
];

/* ===== Line-style background animations ===== */

function LearnAnimation({ stroke, stroke2 }: { stroke: string; stroke2: string }) {
  const pageLeft  = "M 300 40 L 210 40 L 210 210 L 300 210 Z";
  const pageEdge  = "M 300 40 L 298 40 L 298 210 L 300 210 Z";
  const pageRight = "M 300 40 L 390 40 L 390 210 L 300 210 Z";
  const t = [0, 0.15, 0.30, 0.50, 0.65, 0.80, 1];

  return (
    <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" preserveAspectRatio="xMidYMid slice">
      {/* Spine */}
      <motion.path
        d="M 300 40 L 300 210" stroke={stroke} strokeWidth="2.5" strokeLinecap="round"
        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }}
        transition={{ duration: 0.5 }}
      />

      {/* Fixed left page */}
      <motion.path
        d="M 300 40 L 210 40 L 210 210 L 300 210 Z"
        stroke={stroke} strokeWidth="1.5" strokeLinejoin="round"
        animate={{ opacity: [0.03, 0.03, 0.25, 0.25, 0.25, 0.03, 0.03] }}
        transition={{ duration: 8, times: t, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Turning page */}
      <motion.path
        stroke={stroke2} strokeWidth="1.5" strokeLinejoin="round"
        fill={stroke2} fillOpacity={0.04}
        animate={{
          d: [pageLeft, pageEdge, pageRight, pageRight, pageEdge, pageLeft, pageLeft],
          fillOpacity: [0.04, 0.01, 0.03, 0.03, 0.01, 0.04, 0.04],
        }}
        transition={{ duration: 8, times: t, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Cover "Science" */}
      <motion.text
        x="255" y="115" textAnchor="middle" fontSize="14"
        fontFamily="'Georgia, serif'"
        fill={stroke2} fillOpacity={0.3}
        animate={{ fillOpacity: [0.3, 0, 0, 0, 0, 0.3, 0.3] }}
        transition={{ duration: 8, times: [0, 0.04, 0.15, 0.50, 0.82, 0.88, 1], repeat: Infinity }}
      >
        Science
      </motion.text>
      {/* Cover subtitle line */}
      <motion.path
        d="M 225 135 L 285 135" stroke={stroke} strokeWidth="0.8" strokeLinecap="round"
        animate={{ opacity: [0.2, 0, 0, 0, 0, 0.2, 0.2] }}
        transition={{ duration: 8, times: [0, 0.04, 0.15, 0.50, 0.82, 0.88, 1], repeat: Infinity }}
      />
      {/* Cover decorative mark */}
      <motion.path
        d="M 250 100 L 260 100 L 255 95 Z" stroke={stroke2} strokeWidth="0.8" strokeLinejoin="round"
        animate={{ opacity: [0.15, 0, 0, 0, 0, 0.15, 0.15] }}
        transition={{ duration: 8, times: [0, 0.04, 0.15, 0.50, 0.82, 0.88, 1], repeat: Infinity }}
      />

      {/* Left page text */}
      {[
        'M 218 65 L 290 65',
        'M 218 90 L 275 90',
        'M 218 115 L 292 115',
        'M 218 140 L 280 140',
        'M 218 165 L 285 165',
      ].map((d, i) => (
        <motion.path
          key={`lt${i}`}
          d={d} stroke={stroke} strokeWidth="0.8" strokeLinecap="round"
          animate={{ opacity: [0, 0, 0.2, 0.2, 0.2, 0, 0] }}
          transition={{ duration: 8, times: t, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}

      {/* Right page text */}
      {[
        'M 308 65 L 380 65',
        'M 308 90 L 370 90',
        'M 308 115 L 385 115',
        'M 308 140 L 365 140',
      ].map((d, i) => (
        <motion.path
          key={`rt${i}`}
          d={d} stroke={stroke2} strokeWidth="0.8" strokeLinecap="round"
          animate={{ opacity: [0, 0, 0.2, 0.2, 0.2, 0, 0] }}
          transition={{ duration: 8, times: t, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </svg>
  );
}

function OfficeAnimation({ stroke, stroke2 }: { stroke: string; stroke2: string }) {
  const cellYs = [55, 85, 115, 145, 175];

  return (
    <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" preserveAspectRatio="xMaxYMin slice">
      {/* Table border */}
      <motion.rect x="210" y="30" width="175" height="200" rx="4"
        stroke={stroke} strokeWidth="1.2"
        initial={{ opacity: 0 }} animate={{ opacity: 0.25 }}
        transition={{ duration: 0.8 }}
      />
      {/* Header row separator */}
      <motion.path
        d="M 215 55 L 380 55"
        stroke={stroke} strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.2 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      />
      {/* Header text indicators */}
      <motion.path d="M 225 42 L 255 42" stroke={stroke2} strokeWidth="1.2" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.18 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      <motion.path d="M 265 42 L 290 42" stroke={stroke2} strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.15 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      />
      <motion.path d="M 300 42 L 340 42" stroke={stroke} strokeWidth="1" strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.12 }}
        transition={{ duration: 0.4, delay: 0.6 }}
      />
      {/* Horizontal grid lines */}
      {cellYs.map((y, i) => (
        <motion.path key={`h${i}`}
          d={`M 215 ${y} L 380 ${y}`}
          stroke={stroke} strokeWidth="0.7" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.16 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
        />
      ))}
      {/* Vertical grid lines */}
      {[0, 1, 2].map((i) => (
        <motion.path key={`v${i}`}
          d={`M ${260 + i * 40} 35 L ${260 + i * 40} 225`}
          stroke={stroke} strokeWidth="0.7" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.12 }}
          transition={{ duration: 0.5, delay: 0.5 + i * 0.08 }}
        />
      ))}
      {/* Cycling cell highlight */}
      {cellYs.map((cy, i) => (
        <motion.rect key={`cell${i}`}
          x="215" y={cy} width="45" height="30" rx="2"
          stroke={stroke2} strokeWidth="1" fill={stroke2} fillOpacity={0.04}
          animate={{ opacity: [0, 0, 0.3, 0, 0] }}
          transition={{ duration: 7.5, delay: i * 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Data indicators in cells */}
      {[0, 1, 2].map((i) => (
        <motion.path key={`di${i}`}
          d={`M 225 ${cellYs[i] + 15} L 248 ${cellYs[i] + 15}`}
          stroke={stroke2} strokeWidth="1" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.15 }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.2 }}
        />
      ))}
      {/* Chart line */}
      <motion.path
        d="M 260 180 L 280 155 L 300 162 L 320 140 L 340 148 L 360 125"
        stroke={stroke2} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
        animate={{ pathLength: [0, 1], opacity: [0, 0.25] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Chart dots */}
      <motion.g animate={{ opacity: [0, 0.18, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}>
        <circle cx="280" cy="155" r="2" fill={stroke2} fillOpacity="0.3" />
        <circle cx="320" cy="140" r="2" fill={stroke2} fillOpacity="0.3" />
        <circle cx="360" cy="125" r="2" fill={stroke2} fillOpacity="0.3" />
      </motion.g>
    </svg>
  );
}

function CodeAnimation({ stroke, stroke2 }: { stroke: string; stroke2: string }) {
  const groupRef = useRef<SVGGElement>(null);

  const codeLines = [
    { text: 'import numpy as np', indent: 0, kw: true },
    { text: 'from utils import load', indent: 0, kw: true },
    { text: 'def process(data):', indent: 0, kw: true },
    { text: 'result = np.mean(data)', indent: 1 },
    { text: 'std = np.std(data)', indent: 1 },
    { text: 'return result, std', indent: 1, kw: true },
    { text: 'class Model:', indent: 0, kw: true },
    { text: 'def __init__(self, cfg):', indent: 1, kw: true },
    { text: 'self.cfg = cfg', indent: 2 },
    { text: 'self.weights = None', indent: 2 },
    { text: 'def train(self, X, y):', indent: 1, kw: true },
    { text: 'out = np.dot(X.T, y)', indent: 2 },
    { text: 'self.weights = out', indent: 2 },
    { text: 'def predict(self, x):', indent: 1, kw: true },
    { text: 'return np.dot(x, self.weights)', indent: 2, kw: true },
    { text: 'model = Model(config)', indent: 0 },
  ];

  const lh = 15;
  const baseY = 55;
  const indentPx = 26;
  const textX = 222;
  const dotX = 212;
  const scrollDist = codeLines.length * lh;
  const scrollDuration = 12;

  const cursorLineIdx = 6;
  const cursorEndX = 300;

  const allLines = [...codeLines, ...codeLines];

  useEffect(() => {
    let startTime = performance.now();
    let rafId: number;
    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000;
      const progress = (elapsed % scrollDuration) / scrollDuration;
      const offset = -progress * scrollDist;
      if (groupRef.current) {
        groupRef.current.setAttribute('transform', `translate(0,${offset})`);
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [scrollDist, scrollDuration]);

  return (
    <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="codeFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="8%" stopColor="white" stopOpacity="1" />
          <stop offset="92%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="codeMask" maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="400" height="250" fill="url(#codeFade)" />
        </mask>
      </defs>

      {/* Terminal header — inside scrolling group so it scrolls up together */}
      <g mask="url(#codeMask)">
        <g ref={groupRef}>
          {allLines.map((line, i) => {
            const homeY = baseY + i * lh;
            return (
              <g key={`row${i}`}>
                <circle
                  cx={dotX + line.indent * indentPx * 0.4}
                  cy={homeY}
                  r={1.5}
                  stroke={stroke} strokeWidth="0.7" fill="none"
                />
                <text
                  x={textX + line.indent * indentPx}
                  y={homeY}
                  fontSize="11"
                  fontFamily="'Consolas, Monaco, Courier New, monospace'"
                  fill={line.kw ? stroke2 : stroke}
                  fillOpacity={line.kw ? 0.35 : 0.25}
                >
                  {line.text}
                </text>
              </g>
            );
          })}

          {/* Cursor on original line */}
          <motion.line
            x1={cursorEndX} x2={cursorEndX}
            y1={baseY + cursorLineIdx * lh} y2={baseY + cursorLineIdx * lh + lh}
            stroke={stroke2} strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
          />
          {/* Cursor on duplicate line */}
          <motion.line
            x1={cursorEndX} x2={cursorEndX}
            y1={baseY + (codeLines.length + cursorLineIdx) * lh}
            y2={baseY + (codeLines.length + cursorLineIdx) * lh + lh}
            stroke={stroke2} strokeWidth="1.5" strokeLinecap="round"
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
          />
        </g>
      </g>
    </svg>
  );
}

function CreativeAnimation({ stroke, stroke2 }: { stroke: string; stroke2: string }) {
  const orbitRef = useRef<SVGGElement>(null);
  const icon0Ref = useRef<SVGGElement>(null);
  const icon1Ref = useRef<SVGGElement>(null);
  const icon2Ref = useRef<SVGGElement>(null);
  const icon3Ref = useRef<SVGGElement>(null);
  const icon4Ref = useRef<SVGGElement>(null);
  const iconRefs = [icon0Ref, icon1Ref, icon2Ref, icon3Ref, icon4Ref];
  const cx = 280, cy = 125;

  useEffect(() => {
    const radius = 70;
    const angles = [-90, -18, 54, 126, 198];
    const positions = angles.map(a => ({
      x: radius * Math.cos(a * Math.PI / 180),
      y: radius * Math.sin(a * Math.PI / 180),
    }));
    let rafId: number;
    const animate = () => {
      const angle = (performance.now() / 1000 / 12) * 360;
      if (orbitRef.current) {
        orbitRef.current.setAttribute('transform', `rotate(${angle})`);
      }
      iconRefs.forEach((ref, i) => {
        if (ref.current) {
          ref.current.setAttribute('transform', `translate(${positions[i].x}, ${positions[i].y}) rotate(${-angle})`);
        }
      });
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <svg className="w-full h-full" viewBox="0 0 400 250" fill="none" preserveAspectRatio="xMaxYMin slice">
      {/* Outer orbit */}
      <motion.circle cx={cx} cy={cy} r={70}
        stroke={stroke} strokeWidth="0.8" strokeDasharray="4 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.15 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      />
      {/* Inner orbit */}
      <motion.circle cx={cx} cy={cy} r={28}
        stroke={stroke2} strokeWidth="0.5" strokeDasharray="2 4"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 0.12 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      />

      {/* Rotating orbit — rAF-driven; icons counter-rotate to stay upright */}
      <g transform={`translate(${cx}, ${cy})`}>
        <g ref={orbitRef}>
          {/* Paintbrush */}
          <g ref={icon0Ref}>
            <motion.path d="M-4 -8 L4 -8 L2 4 L-2 4 Z" stroke={stroke} strokeWidth="1.2" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.5, delay: 0.4 }} />
            <motion.path d="M0 4 L0 12" stroke={stroke} strokeWidth="1" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 0.3, delay: 0.6 }} />
            <motion.path d="M-2 12 L0 15 L2 12" stroke={stroke2} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
              transition={{ duration: 0.3, delay: 0.8 }} />
          </g>

          {/* Camera */}
          <g ref={icon1Ref}>
            <motion.rect x="-9" y="-6" width="18" height="13" rx="2"
              stroke={stroke2} strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.5, delay: 0.6 }} />
            <motion.circle cx="0" cy="0.5" r="3.5"
              stroke={stroke2} strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 0.4, delay: 0.8 }} />
            <motion.path d="M-4 -6 L-2 -9 L2 -9 L4 -6" stroke={stroke} strokeWidth="0.8" strokeLinejoin="round"
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
              transition={{ delay: 1 }} />
          </g>

          {/* Game controller */}
          <g ref={icon2Ref}>
            <motion.path d="M-10 0 C-10 -6 -6 -6 -3 -6 L3 -6 C6 -6 10 -6 10 0 C10 6 6 6 3 6 L-3 6 C-6 6 -10 6 -10 0 Z"
              stroke={stroke} strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.6, delay: 0.8 }} />
            <motion.path d="M-4 -2 L-4 2 M-6 0 L-2 0" stroke={stroke} strokeWidth="0.8" strokeLinecap="round"
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
              transition={{ delay: 1.1 }} />
            <motion.circle cx="5" cy="0" r="1.5" stroke={stroke2} strokeWidth="0.8"
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }}
              transition={{ delay: 1.2 }} />
          </g>

          {/* Palette */}
          <g ref={icon3Ref}>
            <motion.path d="M0 -8 C8 -8 11 0 8 6 C5 11 0 9 -3 6 C-6 11 -8 6 -8 0 C-8 -8 0 -8 0 -8 Z"
              stroke={stroke2} strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.3 }}
              transition={{ duration: 0.6, delay: 1 }} />
            <motion.circle cx="-4" cy="-3" r="1.5" stroke={stroke} strokeWidth="0.7"
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.3 }} />
            <motion.circle cx="4" cy="-2" r="1.5" stroke={stroke2} strokeWidth="0.7"
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.4 }} />
            <motion.circle cx="0" cy="3" r="1.5" stroke={stroke} strokeWidth="0.7"
              initial={{ opacity: 0 }} animate={{ opacity: 0.2 }} transition={{ delay: 1.5 }} />
          </g>

          {/* Music note */}
          <g ref={icon4Ref}>
            <motion.ellipse cx="-2" cy="4" rx="4" ry="3"
              stroke={stroke2} strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 0.4, delay: 1.2 }} />
            <motion.path d="M2 4 L2 -8" stroke={stroke2} strokeWidth="1" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.25 }}
              transition={{ duration: 0.3, delay: 1.4 }} />
            <motion.path d="M2 -8 L8 -6 L8 -3" stroke={stroke} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 0.22 }}
              transition={{ duration: 0.3, delay: 1.6 }} />
          </g>
        </g>
      </g>

      {/* Center dot */}
      <motion.circle cx={cx} cy={cy} r="3.5" fill={stroke} stroke={stroke} strokeWidth="0.6"
        animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.85, 1.1, 0.85] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />
    </svg>
  );
}

const animations = [LearnAnimation, OfficeAnimation, CodeAnimation, CreativeAnimation];

export default function ScenariosSection() {
  return (
    <section id="scenarios" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">应用场景</h2>
          <p className="section-subtitle">
            千问 AI 适用于各种场景，让智能无处不在
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scenarios.map((scenario, index) => {
            const AnimComponent = animations[index];
            return (
              <motion.div
                key={scenario.title}
                initial={{ y: 40 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`relative group rounded-3xl p-8 bg-gradient-to-br ${scenario.color}
                  backdrop-blur-xl border border-white/10 overflow-hidden
                  hover:border-white/20 transition-all duration-300 ${scenario.glow} hover:shadow-2xl`}
              >
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/50 z-0" />

                {/* Line-style background animation */}
                <div className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none
                  [@media(hover:none)]:opacity-100">
                  <AnimComponent stroke={scenario.stroke} stroke2={scenario.stroke2} />
                </div>

                {/* Content */}
                <div className="relative z-[2]">
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center
                      group-hover:scale-110 transition-transform duration-300">
                      <scenario.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-semibold text-white mb-2">{scenario.title}</h3>
                  <p className="text-white/60 mb-6">{scenario.subtitle}</p>

                  <div className="flex flex-wrap gap-2">
                    {scenario.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-3 py-1.5 rounded-full text-sm bg-white/10 text-white/80
                          border border-white/10 group-hover:bg-white/15 transition-colors duration-300"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Decorative blur */}
                <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-white/5 blur-3xl
                  group-hover:bg-white/10 transition-colors duration-300 z-0" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}