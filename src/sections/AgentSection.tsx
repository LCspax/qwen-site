import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Globe, Map, Calendar, Code, Folder, MousePointer, Search, FileText } from 'lucide-react';
import { fadeInUp } from '../lib/animations';

const windows = [
  { icon: Globe, label: '浏览器', color: 'from-blue-500/20 to-cyan-500/20' },
  { icon: Map, label: '地图', color: 'from-green-500/20 to-emerald-500/20' },
  { icon: Calendar, label: '日历', color: 'from-purple-500/20 to-pink-500/20' },
  { icon: Code, label: 'IDE', color: 'from-orange-500/20 to-amber-500/20' },
  { icon: Folder, label: '文件', color: 'from-yellow-500/20 to-orange-500/20' },
];

const tasks = [
  { icon: MousePointer, text: '自动操作界面' },
  { icon: Search, text: '智能搜索资料' },
  { icon: FileText, text: '生成日程安排' },
  { icon: Code, text: '编写代码程序' },
];

export default function AgentSection() {
  const [activeTask, setActiveTask] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTask((prev) => (prev + 1) % tasks.length);
      setMousePos({ x: 20 + Math.random() * 60, y: 20 + Math.random() * 60 });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="agent" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">Agent 智能执行</h2>
          <p className="section-subtitle">
            不只是回答，更能替你完成任务
          </p>
        </motion.div>

        <div className="relative h-[500px] md:h-[600px]">
          {windows.map((win, i) => {
            const angle = (i * 72 - 90) * (Math.PI / 180);

            return (
              <motion.div
                key={win.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="absolute w-32 h-24 md:w-40 md:h-28"
                style={{
                  left: `calc(50% + ${Math.cos(angle) * 200}px)`,
                  top: `calc(50% + ${Math.sin(angle) * 150}px)`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className={`w-full h-full rounded-2xl bg-gradient-to-br ${win.color} backdrop-blur-xl border border-white/20 p-4 flex flex-col items-center justify-center gap-2`}>
                  <win.icon className="w-6 h-6 text-white/80" />
                  <span className="text-xs text-white/60">{win.label}</span>
                </div>
              </motion.div>
            );
          })}

          <motion.div
            className="absolute left-1/2 top-1/2 w-48 h-48 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
            <div className="absolute inset-4 rounded-full border border-blue-500/20" />
            <div className="absolute inset-8 rounded-full border border-purple-500/20" />
          </motion.div>

          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ left: `${mousePos.x}%`, top: `${mousePos.y}%` }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50">
              <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping" />
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4">
            {tasks.map((task, i) => (
              <motion.div
                key={task.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 ${
                  activeTask === i
                    ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                    : 'bg-white/5 border-white/10 text-white/40'
                }`}
              >
                <task.icon className="w-4 h-4" />
                <span className="text-sm">{task.text}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 flex items-center justify-center gap-8 text-white/40"
        >
          <span>需求</span>
          <div className="w-16 h-px bg-gradient-to-r from-white/20 to-cyan-500/50" />
          <span>分析</span>
          <div className="w-16 h-px bg-gradient-to-r from-cyan-500/50 to-blue-500/50" />
          <span>执行</span>
          <div className="w-16 h-px bg-gradient-to-r from-blue-500/50 to-purple-500/50" />
          <span>完成</span>
        </motion.div>
      </div>
    </section>
  );
}
