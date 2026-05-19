import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Code, Music } from 'lucide-react';
import { fadeInUp } from '../lib/animations';
import ImageDemo from './multimodal/ImageDemo';
import VideoDemo from './multimodal/VideoDemo';
import CodeDemo from './multimodal/CodeDemo';
import AudioDemo from './multimodal/AudioDemo';

type DemoKey = null | 'image' | 'video' | 'code' | 'audio';

const cards = [
  { icon: Image, label: '图片', desc: '智能识别', color: 'from-blue-500/40 to-purple-500/40', demo: 'image' as DemoKey },
  { icon: Video, label: '视频', desc: '理解画面', color: 'from-purple-500/40 to-pink-500/40', demo: 'video' as DemoKey },
  { icon: Code, label: '代码', desc: '辅助编程', color: 'from-yellow-500/40 to-orange-500/40', demo: 'code' as DemoKey },
  { icon: Music, label: '音频', desc: '语音对话', color: 'from-green-500/40 to-cyan-500/40', demo: 'audio' as DemoKey },
];

export default function MultimodalSection() {
  const [activeDemo, setActiveDemo] = useState<DemoKey>(null);

  return (
    <section id="multimodal" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">
            <span className="text-gradient">理解一切内容</span>
          </h2>
          <p className="section-subtitle">
            文字、图片、视频、语音、代码。世界的信息，不止一种形式。
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ y: 30 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -4 }}
                onClick={() => setActiveDemo(card.demo)}
                className="group cursor-pointer glass-strong rounded-2xl p-6 hover:border-white/20 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{card.label}</h3>
                <p className="text-sm text-white/50">{card.desc}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-white/30 text-sm mt-8">点击卡片体验</p>
      </div>

      {/* Full-screen demo overlay */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            key={activeDemo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black/70 backdrop-blur-md flex items-center justify-center p-6 md:p-12"
            onClick={() => setActiveDemo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {activeDemo === 'image' && <ImageDemo />}
              {activeDemo === 'video' && <VideoDemo />}
              {activeDemo === 'code' && <CodeDemo />}
              {activeDemo === 'audio' && <AudioDemo />}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}