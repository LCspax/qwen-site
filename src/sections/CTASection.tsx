import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { fadeInUp } from '../lib/animations';

export default function CTASection() {
  return (
    <section id="cta" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/[0.06] via-transparent to-transparent pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div {...fadeInUp} className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-sm font-medium">立即开始</span>
          </div>

          <h2 className="section-heading">
            准备好体验
            <span className="text-gradient"> 下一代 AI </span>了吗？
          </h2>
          <p className="section-subtitle mb-12">
            无论是工作、创作还是学习，千问 AI 都能成为你最得力的智能伙伴
          </p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <a href="https://www.qianwen.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-medium text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-brand-purple/20">
              免费体验
              <ArrowRight className="w-5 h-5" />
            </a>
            <button className="px-8 py-4 rounded-full border border-white/20 text-white font-medium text-lg hover:bg-white/5 transition-colors">
              了解更多
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
