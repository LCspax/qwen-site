import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isClicked, setIsClicked] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    setTimeout(() => {
      setIsExiting(true);
      setTimeout(onComplete, 1000);
    }, 1600);
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-ai-dark flex items-center justify-center overflow-hidden"
        >
          {/* Blur overlay — 单独一层控制模糊淡入，避免逐帧 filter 动画 */}
          <motion.div
            className="absolute inset-0 backdrop-blur-2xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? 1 : 0 }}
            transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Expanding glow circle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={isClicked ? { scale: 28, opacity: [0, 0.6, 0] } : { scale: 0, opacity: 0 }}
            transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1], opacity: { times: [0, 0.3, 1] } }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-brand-blue via-brand-purple to-brand-cyan blur-3xl will-change-transform"
            style={{ transform: 'translate(-50%, -50%) translateZ(0)' }}
          />

          {/* Icon Container */}
          <motion.div
            className="relative cursor-pointer will-change-transform"
            style={{ transform: 'translateZ(0)' }}
            onClick={handleClick}
            animate={
              isClicked
                ? { scale: 4, rotate: 540, opacity: 0 }
                : { scale: 1, rotate: 0, opacity: 1 }
            }
            transition={
              isClicked
                ? { duration: 2.2, ease: [0.16, 1, 0.3, 1] }
                : {}
            }
            whileHover={!isClicked ? { scale: 1.05 } : {}}
            whileTap={!isClicked ? { scale: 0.98 } : {}}
          >
            {/* 清晰版 — 逐渐透明 */}
            <div className="relative w-28 h-28 md:w-36 md:h-36">
              <img
                src="/qwen-color.svg"
                alt="千问"
                className="w-full h-full object-contain will-change-transform"
                style={{ transform: 'translateZ(0)' }}
              />
            </div>
          </motion.div>

          {/* Hint text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: isClicked ? 0 : 0.5 }}
            transition={{ duration: 0.5 }}
            className="absolute bottom-32 text-white/50 text-sm tracking-wider"
          >
            点击图标进入
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
