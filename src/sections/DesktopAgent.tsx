import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function QwenLogoDesktop({ opacity = 0.8 }: { opacity?: number }) {
  return (
    <svg width="60" height="60" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity }}>
      <mask id="mask-desktop-qwen" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="11" y="11" width="26" height="26">
        <rect x="11" y="11" width="26" height="26" fill="white" />
      </mask>
      <g mask="url(#mask-desktop-qwen)">
        <path d="M33.3549 21.7715L33.353 21.7725C33.4348 21.7725 33.5103 21.8173 33.5512 21.8877L36.8754 27.6426C36.9097 27.703 36.9096 27.7783 36.8754 27.8389L35.266 30.6279C35.23 30.6885 35.1655 30.7266 35.0951 30.7266H31.7631L28.3783 36.5879C28.3391 36.6534 28.2691 36.6943 28.1938 36.6943H24.9848C24.9145 36.6943 24.8483 36.6571 24.8139 36.5967L23.2094 33.8164C23.1718 33.751 23.1719 33.669 23.2094 33.6035L29.9789 21.8779C30.0182 21.8124 30.0882 21.7715 30.1635 21.7715H33.3549ZM16.1303 18.7861C16.2073 18.7861 16.2782 18.8271 16.3158 18.8926L23.0834 30.6162C23.121 30.6816 23.121 30.7636 23.0834 30.8291L21.4887 33.5938C21.4478 33.664 21.3722 33.708 21.2905 33.708H14.644C14.5736 33.708 14.5084 33.67 14.474 33.6094L12.8637 30.8213C12.8294 30.7609 12.8296 30.6855 12.8637 30.625L14.5356 27.7178L11.1469 21.876C11.1092 21.8105 11.1092 21.7286 11.1469 21.6631L12.7514 18.8838C12.7874 18.8235 12.8511 18.7862 12.9213 18.7861H16.1303ZM23.8959 11.3242C23.9661 11.3244 24.0315 11.3624 24.0658 11.4229L25.7328 14.3076H32.5014C32.5783 14.3076 32.6493 14.3486 32.6869 14.4141L34.2914 17.1943C34.3258 17.2549 34.3257 17.3301 34.2914 17.3906L32.6869 20.1709C32.6476 20.2364 32.5767 20.2773 32.5014 20.2773H18.9623C18.8854 20.2773 18.8144 20.2364 18.7768 20.1709L17.1821 17.4072C17.1411 17.3368 17.1411 17.2481 17.1821 17.1777L20.5063 11.4229C20.5423 11.3623 20.6058 11.3242 20.6762 11.3242H23.8959Z" fill="white" />
      </g>
    </svg>
  );
}

// 模拟的 Mac 窗口控制按钮
const WindowControls = () => (
  <div className="flex space-x-1.5 md:space-x-2 px-3 md:px-4 py-2 md:py-3 border-b border-white/5">
    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-red-500/80"></div>
    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-yellow-500/80"></div>
    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500/80"></div>
  </div>
);

export default function DesktopAgent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // 全局淡入淡出
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 0]);
  
  // 核心内容动画时序：
  // 1. Logo & 思考中出现 (5% - 20%)
  const logoScale = useTransform(scrollYProgress, [0.05, 0.15], [0.8, 1]);
  const logoOpacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const textThinkingOp = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  
  // 2. 状态切换：Agent 执行中 (35% - 40%)
  const textExecutingOp = useTransform(scrollYProgress, [0.35, 0.4, 0.85, 0.9], [0, 1, 1, 0]);

  // 3. 窗口依次弹出（每个过渡10%滚动区间，更从容）
  const browserOp = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const browserY = useTransform(scrollYProgress, [0.35, 0.45], [50, 0]);
  const browserScale = useTransform(scrollYProgress, [0.35, 0.45], [0.95, 1]);

  const ideOp = useTransform(scrollYProgress, [0.50, 0.60], [0, 1]);
  const ideY = useTransform(scrollYProgress, [0.50, 0.60], [50, 0]);
  const ideScale = useTransform(scrollYProgress, [0.50, 0.60], [0.95, 1]);

  const terminalOp = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const terminalY = useTransform(scrollYProgress, [0.65, 0.75], [50, 0]);
  const terminalScale = useTransform(scrollYProgress, [0.65, 0.75], [0.95, 1]);

  // 4. Slogan 出现 (80% - 90%)
  const sloganOp = useTransform(scrollYProgress, [0.80, 0.88], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <motion.div style={{ opacity: sectionOpacity }} className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden perspective-[1000px] pt-[6vh]">
        
        {/* Slogan */}
        <motion.div style={{ opacity: sloganOp }} className="absolute top-[20%] text-center z-50">
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
            你的 AI 助理，<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">自动接管一切</span>
          </h2>
        </motion.div>

        {/* 桌面容器 */}
        <div className="relative w-[95vw] md:w-[90vw] max-w-5xl aspect-video bg-[#0a0a0a] rounded-xl border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.15)] overflow-visible md:overflow-hidden flex items-center justify-center">
          
          {/* 背景网格线 */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]"></div>

          {/* 中心 Logo 与状态文字 */}
          <motion.div className="absolute flex flex-col items-center justify-center z-10">
            <motion.div style={{ scale: logoScale, opacity: logoOpacity }}>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-2xl">
                <QwenLogoDesktop opacity={1} />
              </div>
            </motion.div>
            
            <div className="relative h-10 mt-6 flex items-center justify-center w-full">
              <motion.p style={{ opacity: textThinkingOp, fontFamily: 'SimHei, "Microsoft YaHei", sans-serif' }} className="absolute text-white/50 text-base md:text-lg tracking-widest animate-pulse whitespace-nowrap">
                思考中...
              </motion.p>
              <motion.p style={{ opacity: textExecutingOp, fontFamily: 'SimHei, "Microsoft YaHei", sans-serif' }} className="absolute text-cyan-400 text-base md:text-lg tracking-widest font-semibold whitespace-nowrap">
                Agent 执行中_
              </motion.p>
            </div>
          </motion.div>

          {/* 窗口 1：浏览器 */}
          <motion.div
            style={{ opacity: browserOp, y: browserY, scale: browserScale }}
            className="absolute left-[5%] top-[15%] w-[45%] h-[50%] bg-[#1c1c1e]/80 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-20"
          >
            <WindowControls />
            <div className="p-2 md:p-4 flex flex-col gap-2 md:gap-3">
              <div className="w-full h-5 md:h-6 bg-black/50 rounded-md border border-white/5 flex items-center px-2 md:px-3">
                <span className="text-white/30 text-[10px] md:text-xs font-mono">https://docs.api.example.com</span>
              </div>
              <div className="w-3/4 h-3 md:h-4 bg-white/5 rounded"></div>
              <div className="w-full h-3 md:h-4 bg-white/5 rounded"></div>
              <div className="w-5/6 h-3 md:h-4 bg-white/5 rounded"></div>
            </div>
          </motion.div>

          {/* 窗口 2：IDE 代码编辑器 (右中) */}
          <motion.div 
            style={{ opacity: ideOp, y: ideY, scale: ideScale }}
            className="absolute right-[5%] top-[25%] w-[50%] h-[60%] bg-[#1e1e1e]/90 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl overflow-hidden z-30"
          >
            <WindowControls />
            <div className="flex h-full">
              <div className="w-6 md:w-12 border-r border-white/5 pt-2 flex flex-col items-center gap-1 md:gap-2">
                <div className="w-4 h-4 md:w-6 md:h-6 bg-white/10 rounded-md"></div>
                <div className="w-4 h-4 md:w-6 md:h-6 bg-white/5 rounded-md"></div>
              </div>
              <div className="p-2 md:p-4 font-mono text-[11px] md:text-sm leading-relaxed text-blue-300">
                <p><span className="text-purple-400">import</span> {'{ autoPlan }'} <span className="text-purple-400">from</span> 'qwen-agent';</p>
                <p className="mt-2 text-white/50">// Auto-generating architecture...</p>
                <p className="mt-1"><span className="text-pink-400">const</span> task = <span className="text-yellow-200">autoPlan</span>(userIntent);</p>
                <p>task.<span className="text-yellow-200">execute</span>().then(res ={'>'} {'{'}</p>
                <p className="pl-4">console.<span className="text-yellow-200">log</span>(res.status);</p>
                <p>{'});'}</p>
              </div>
            </div>
          </motion.div>

          {/* 窗口 3：Terminal 终端 (左下) */}
          <motion.div 
            style={{ opacity: terminalOp, y: terminalY, scale: terminalScale }}
            className="absolute left-[10%] bottom-[10%] w-[40%] h-[35%] bg-black/95 border border-cyan-500/30 rounded-lg shadow-[0_0_30px_rgba(34,211,238,0.1)] overflow-hidden z-40"
          >
            <div className="px-3 md:px-4 py-1 md:py-2 bg-white/5 border-b border-white/5 text-[10px] md:text-xs text-white/50 font-mono flex items-center justify-between">
              <span>bash - agent-process</span>
            </div>
            <div className="p-2 md:p-4 font-mono text-[11px] md:text-sm text-green-400">
              <p className="opacity-80">{'['}INFO{']'} Loading modules...</p>
              <p className="opacity-80">{'['}INFO{']'} Analyzing repository structure...</p>
              <p className="text-cyan-300">{'['}SUCCESS{']'} Dependency resolved.</p>
              <p className="mt-2 flex items-center">
                <span className="text-purple-500 mr-2">➜</span> ~ <span className="w-2 h-4 bg-white/70 ml-2 animate-pulse"></span>
              </p>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}