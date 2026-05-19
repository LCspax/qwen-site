import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { fadeInUp } from '../lib/animations';

const stats = [
  { value: 100, suffix: 'T+', label: '参数规模', sublabel: '万亿级参数' },
  { value: 128, suffix: 'K', label: '上下文长度', sublabel: '超长记忆' },
  { value: 99, suffix: '%', label: '推理准确率', sublabel: '行业领先' },
  { value: 0.1, suffix: 's', label: '响应速度', sublabel: '毫秒级响应', isDecimal: true },
];

function CountUp({ value, suffix, isDecimal }: { value: number; suffix: string; isDecimal?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = isDecimal ? Math.round(value * eased * 10) / 10 : Math.floor(value * eased);
      setDisplay(current);
      if (progress < 1) requestAnimationFrame(animate);
      else setDisplay(value);
    };
    requestAnimationFrame(animate);
  }, [isInView, value, isDecimal]);

  return (
    <span ref={ref} className="tabular-nums">
      {isDecimal ? display.toFixed(1) : display}{suffix}
    </span>
  );
}

export default function PerformanceSection() {
  return (
    <section id="performance" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">性能与规模</h2>
          <p className="section-subtitle">
            多模态统一模型，高性能推理引擎
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl md:text-7xl lg:text-8xl font-bold text-gradient mb-4">
                <CountUp value={stat.value} suffix={stat.suffix} isDecimal={stat.isDecimal} />
              </div>
              <div className="text-lg md:text-xl text-white font-medium mb-1">{stat.label}</div>
              <div className="text-sm text-white/50">{stat.sublabel}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}