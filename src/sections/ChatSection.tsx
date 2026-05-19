import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, FileText, Sparkles, Download, Expand } from 'lucide-react';
import { fadeInUp } from '../lib/animations';

interface Message {
  id: number;
  type: 'user' | 'ai';
  content: string;
  format?: 'text' | 'table' | 'document';
}

const userInputs = [
  '帮我总结这份报告',
  '规划一场日本旅行',
  '帮我写一份商业计划书',
];

const aiResponses: Message[] = [
  { id: 0, type: 'ai', content: '已为您生成报告摘要，核心要点如下：', format: 'text' },
  { id: 1, type: 'ai', content: '行程表', format: 'table' },
  { id: 2, type: 'ai', content: '商业计划书大纲', format: 'document' },
];

const reportSummary = [
  { label: '市场趋势', text: '2025年全球AI市场规模预计突破5000亿美元，年增长率38.2%' },
  { label: '竞争格局', text: '头部厂商占据60%份额，中小企业以垂直领域差异化突围' },
  { label: '技术路线', text: '多模态统一架构成为主流，推理效率提升3倍以上' },
  { label: '投资建议', text: '建议重点关注基础设施层与应用层，规避中间层泡沫风险' },
];

const itineraryData = [
  { day: 'Day 1', city: '东京', spots: '浅草寺 · 秋叶原 · 涩谷十字路口', hotel: '新宿酒店', cost: '¥1,200' },
  { day: 'Day 2', city: '东京', spots: '明治神宫 · 银座 · 东京塔夜景', hotel: '新宿酒店', cost: '¥1,000' },
  { day: 'Day 3', city: '箱根', spots: '芦之湖 · 大涌谷 · 温泉旅馆', hotel: '箱根温泉旅馆', cost: '¥2,500' },
  { day: 'Day 4', city: '京都', spots: '清水寺 · 岚山竹林 · 金阁寺', hotel: '京都民宿', cost: '¥900' },
  { day: 'Day 5', city: '大阪', spots: '道顿堀 · 大阪城 · 心斋桥', hotel: '大阪酒店', cost: '¥1,100' },
];

const businessPlan = {
  title: '商业计划书',
  filename: '商业计划书.docx',
  pages: 12,
  sections: ['执行摘要', '市场分析', '产品方案', '商业模式', '运营规划', '财务预测', '风险评估', '团队介绍'],
};

type PhaseState = 'typing' | 'waiting' | 'aiResponding' | 'done';

export default function ChatSection() {
  const [phase, setPhase] = useState(0);
  const [phaseState, setPhaseState] = useState<PhaseState>('typing');
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [tableExpanded, setTableExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (phaseState !== 'typing') return;
    const targetText = userInputs[phase];
    let charIndex = 0;
    setInputText('');
    const timer = setInterval(() => {
      charIndex++;
      setInputText(targetText.slice(0, charIndex));
      if (charIndex >= targetText.length) {
        clearInterval(timer);
        setPhaseState('waiting');
      }
    }, 80);
    return () => clearInterval(timer);
  }, [phase, phaseState]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, phaseState]);

  const handleSend = () => {
    if (phaseState !== 'waiting') return;
    const currentText = userInputs[phase];
    const userMsg: Message = { id: phase * 2, type: 'user', content: currentText };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setPhaseState('aiResponding');
    setTimeout(() => {
      setMessages(prev => [...prev, aiResponses[phase]]);
      if (phase + 1 < userInputs.length) {
        setPhase(phase + 1);
        setPhaseState('typing');
      } else {
        setPhase(phase + 1);
        setPhaseState('done');
      }
    }, 1200);
  };

  const handleDownloadDoc = () => {
    const htmlContent = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>${businessPlan.title}</title>
      <style>body{font-family:sans-serif;line-height:1.8;padding:40px 60px}
      h1{font-size:22px;margin-bottom:30px}h2{font-size:16px;margin-top:24px;border-bottom:1px solid #ccc;padding-bottom:4px}
      p{font-size:13px;margin:8px 0}</style></head><body>
      <h1>${businessPlan.title}</h1>
      ${businessPlan.sections.map(s => `<h2>${s}</h2><p>（此处为${s}的详细内容，由千问 AI 自动生成）</p>`).join('\n')}
      </body></html>`;
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = businessPlan.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="chat" className="section-padding relative overflow-hidden">
      <div className="section-container relative z-10">
        <motion.div {...fadeInUp} className="text-center mb-16 md:mb-20">
          <h2 className="section-heading">像人与人一样交流</h2>
          <p className="section-subtitle">
            了解你的需求，成为你最贴心的助手
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <div className="glass-strong rounded-3xl p-6 md:p-8 max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <img src="/icon.svg" alt="千问" className="w-10 h-10 rounded-full object-contain" />
                <div>
                  <p className="text-white font-medium">千问对话</p>
                  <p className="text-white/50 text-xs">在线</p>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
            </div>

            <div ref={containerRef} className="space-y-4 min-h-[300px] max-h-[400px] overflow-y-auto chat-scroll pr-2">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {msg.type === 'user' ? (
                    <div className="flex justify-end">
                      <div className="glass-strong rounded-2xl px-5 py-3 max-w-md">
                        <p className="text-white text-sm">{msg.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-start">
                      <div className="glass rounded-2xl px-5 py-4 max-w-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Sparkles className="w-4 h-4 text-cyan-400" />
                          <span className="text-cyan-400 text-xs font-medium">Qwen</span>
                        </div>

                        {/* 报告摘要 */}
                        {msg.format === 'text' && (
                          <div className="space-y-2">
                            <p className="text-white/90 text-sm mb-3">{msg.content}</p>
                            {reportSummary.map((item) => (
                              <div key={item.label} className="bg-white/5 rounded-lg px-3 py-2">
                                <span className="text-brand-cyan text-xs font-medium">{item.label}</span>
                                <p className="text-white/70 text-sm mt-0.5">{item.text}</p>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* 行程表缩略 - 点击放大 */}
                        {msg.format === 'table' && (
                          <div
                            className="bg-white/5 rounded-lg p-3 cursor-pointer group"
                            onClick={() => setTableExpanded(true)}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-white/80 text-sm font-medium">5日日本行程表</span>
                              <Expand className="w-4 h-4 text-white/40 group-hover:text-white/70 transition-colors" />
                            </div>
                            <div className="space-y-1">
                              {itineraryData.slice(0, 2).map((row) => (
                                <div key={row.day} className="flex gap-2 text-xs text-white/60">
                                  <span className="text-brand-cyan">{row.day}</span>
                                  <span>{row.city}</span>
                                  <span className="truncate">{row.spots.split(' · ')[0]}</span>
                                </div>
                              ))}
                              <span className="text-white/30 text-xs">· 点击查看完整行程 ·</span>
                            </div>
                          </div>
                        )}

                        {/* 商业计划书文档 - 点击下载 */}
                        {msg.format === 'document' && (
                          <div
                            className="bg-white/5 rounded-lg p-3 flex items-center gap-3 cursor-pointer group"
                            onClick={handleDownloadDoc}
                          >
                            <FileText className="w-8 h-8 text-purple-400 group-hover:text-purple-300 transition-colors" />
                            <div className="flex-1 min-w-0">
                              <p className="text-white text-sm">{businessPlan.filename}</p>
                              <p className="text-white/50 text-xs">{businessPlan.pages} 页 · 自动生成</p>
                              <div className="flex gap-1 mt-1">
                                {businessPlan.sections.slice(0, 4).map((s) => (
                                  <span key={s} className="text-white/30 text-[10px]">{s}</span>
                                ))}
                                <span className="text-white/30 text-[10px]">...</span>
                              </div>
                            </div>
                            <Download className="w-4 h-4 text-white/40 group-hover:text-white/80 transition-colors" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
              {phaseState === 'aiResponding' && (
                <div className="flex justify-start">
                  <div className="glass rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              <div className="glass rounded-full px-5 py-3 flex items-center gap-3">
                <input
                  type="text"
                  value={inputText}
                  placeholder={phaseState === 'done' ? '输入任何问题...' : ''}
                  className="flex-1 bg-transparent text-white/80 text-sm outline-none placeholder:text-white/40"
                  readOnly
                />
                <div className="flex items-center gap-3">
                  {phaseState === 'waiting' && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="text-white/60 text-xs"
                    >
                      点击发送
                    </motion.span>
                  )}
                  <button
                    onClick={handleSend}
                    className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      phaseState === 'waiting'
                        ? 'bg-gradient-to-r from-brand-blue to-brand-purple cursor-pointer scale-110 shadow-lg shadow-brand-purple/40'
                        : 'bg-gradient-to-r from-brand-blue to-brand-purple opacity-40 cursor-default'
                    }`}
                  >
                    <ArrowRight className="w-4 h-4 text-white" />
                    {phaseState === 'waiting' && (
                      <motion.span
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 行程表放大弹窗 */}
        <AnimatePresence>
          {tableExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setTableExpanded(false)}
            >
              <motion.div
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="glass-strong rounded-2xl p-6 md:p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">5日日本行程表</h3>
                  <button
                    className="text-white/50 hover:text-white transition-colors text-sm"
                    onClick={() => setTableExpanded(false)}
                  >
                    关闭
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="text-left py-2 px-2 text-white/50 font-medium">日期</th>
                        <th className="text-left py-2 px-2 text-white/50 font-medium">城市</th>
                        <th className="text-left py-2 px-2 text-white/50 font-medium">景点</th>
                        <th className="text-left py-2 px-2 text-white/50 font-medium">住宿</th>
                        <th className="text-left py-2 px-2 text-white/50 font-medium">预算</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itineraryData.map((row) => (
                        <tr key={row.day} className="border-b border-white/[0.04]">
                          <td className="py-2 px-2 text-brand-cyan font-medium">{row.day}</td>
                          <td className="py-2 px-2 text-white">{row.city}</td>
                          <td className="py-2 px-2 text-white/70">{row.spots}</td>
                          <td className="py-2 px-2 text-white/50">{row.hotel}</td>
                          <td className="py-2 px-2 text-white/60">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-white/10">
                        <td className="py-2 px-2 text-white/50" colSpan={4}>总预算</td>
                        <td className="py-2 px-2 text-brand-cyan font-medium">¥6,700</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}