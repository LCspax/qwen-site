import { motion } from 'framer-motion';
import { Pen, Video, Image, Music, Code, Sparkles } from 'lucide-react';
import { fadeInUp } from '../lib/animations';

const creations = [
  { icon: Pen, label: '写作', desc: '文章、诗歌、故事', color: 'from-blue-500/20 to-cyan-500/20' },
  { icon: Image, label: '绘画', desc: '插画、海报、概念图', color: 'from-purple-500/20 to-pink-500/20' },
  { icon: Video, label: '视频', desc: '脚本、剪辑、特效', color: 'from-cyan-500/20 to-teal-500/20' },
  { icon: Music, label: '音乐', desc: '作曲、编曲、混音', color: 'from-pink-500/20 to-rose-500/20' },
  { icon: Code, label: '编程', desc: '应用、网站、工具', color: 'from-green-500/20 to-emerald-500/20' },
];

export default function CreationSection() {
  return (
    <section id="creation" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">释放创造力</h2>
          <p className="section-subtitle">
            从灵感到成品，千问 AI 陪伴你的每一个创作瞬间
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {creations.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="group relative glass-strong rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">{item.label}</h3>
              <p className="text-sm text-white/50">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-6 py-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-white/60 text-sm">更多创作能力持续解锁中</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
