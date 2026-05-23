import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

// Inline Qwen logo for IoT scene
function QwenLogoMini({ size = 20, color = 'white', opacity = 0.8 }) {
  const s = size;
  return (
    <g transform={`scale(${s / 48})`}>
      <mask id="mask-iot-qwen" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x="11" y="11" width="26" height="26">
        <rect x="11" y="11" width="26" height="26" fill="white" />
      </mask>
      <g mask="url(#mask-iot-qwen)">
        <path
          d="M33.3549 21.7715L33.353 21.7725C33.4348 21.7725 33.5103 21.8173 33.5512 21.8877L36.8754 27.6426C36.9097 27.703 36.9096 27.7783 36.8754 27.8389L35.266 30.6279C35.23 30.6885 35.1655 30.7266 35.0951 30.7266H31.7631L28.3783 36.5879C28.3391 36.6534 28.2691 36.6943 28.1938 36.6943H24.9848C24.9145 36.6943 24.8483 36.6571 24.8139 36.5967L23.2094 33.8164C23.1718 33.751 23.1719 33.669 23.2094 33.6035L29.9789 21.8779C30.0182 21.8124 30.0882 21.7715 30.1635 21.7715H33.3549ZM16.1303 18.7861C16.2073 18.7861 16.2782 18.8271 16.3158 18.8926L23.0834 30.6162C23.121 30.6816 23.121 30.7636 23.0834 30.8291L21.4887 33.5938C21.4478 33.664 21.3722 33.708 21.2905 33.708H14.644C14.5736 33.708 14.5084 33.67 14.474 33.6094L12.8637 30.8213C12.8294 30.7609 12.8296 30.6855 12.8637 30.625L14.5356 27.7178L11.1469 21.876C11.1092 21.8105 11.1092 21.7286 11.1469 21.6631L12.7514 18.8838C12.7874 18.8235 12.8511 18.7862 12.9213 18.7861H16.1303ZM23.8959 11.3242C23.9661 11.3244 24.0315 11.3624 24.0658 11.4229L25.7328 14.3076H32.5014C32.5783 14.3076 32.6493 14.3486 32.6869 14.4141L34.2914 17.1943C34.3258 17.2549 34.3257 17.3301 34.2914 17.3906L32.6869 20.1709C32.6476 20.2364 32.5767 20.2773 32.5014 20.2773H18.9623C18.8854 20.2773 18.8144 20.2364 18.7768 20.1709L17.1821 17.4072C17.1411 17.3368 17.1411 17.2481 17.1821 17.1777L20.5063 11.4229C20.5423 11.3623 20.6058 11.3242 20.6762 11.3242H23.8959Z"
          fill={color} fillOpacity={opacity}
        />
      </g>
    </g>
  );
}

export default function IoTScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Responsive viewBox for mobile
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Mobile viewBox crops to the central scene (AC, TV, fan, phone)
  // and scales up so the room fills the mobile viewport.
  const viewBox = isMobile ? '200 100 440 480' : '0 0 800 600';
  const svgClass = isMobile
    ? 'absolute w-full h-full'
    : 'absolute w-full h-full max-w-5xl px-4 md:px-0';

  // Global fade — matches DrivingScene (10% fade-in, 15% fade-out)
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.10, 0.85, 1], [0, 1, 1, 0]);

  // 1. Room outline draws
  const roomDraw = useTransform(scrollYProgress, [0.10, 0.23], [0, 1]);

  // 2. Furniture inside room appears
  const furnitureOp = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);

  // 3. Phone rises from below
  const phoneY = useTransform(scrollYProgress, [0.25, 0.40], [120, 0]);
  const phoneOp = useTransform(scrollYProgress, [0.25, 0.33], [0, 1]);

  // 4. Qwen logo on phone screen
  const logoOp = useTransform(scrollYProgress, [0.37, 0.42], [0, 1]);

  // 5. Connection lines draw (staggered)
  const acLineLen = useTransform(scrollYProgress, [0.40, 0.52], [0, 1]);
  const tvLineLen = useTransform(scrollYProgress, [0.45, 0.57], [0, 1]);
  const fanLineLen = useTransform(scrollYProgress, [0.50, 0.62], [0, 1]);

  // 6. Pulse dots at appliances
  const acPulseOp = useTransform(scrollYProgress, [0.52, 0.57, 0.62], [0, 0.8, 0.3]);
  const tvPulseOp = useTransform(scrollYProgress, [0.57, 0.62, 0.67], [0, 0.8, 0.3]);
  const fanPulseOp = useTransform(scrollYProgress, [0.62, 0.67, 0.72], [0, 0.8, 0.3]);

  // 7. Activation effects
  const airflowOp = useTransform(scrollYProgress, [0.65, 0.70], [0, 0.7]);
  const windOffset = useTransform(scrollYProgress, [0.65, 0.85], [0, 200]);
  const fanRotate = useTransform(scrollYProgress, [0.68, 0.85], [0, 720]);
  const [fanAngle, setFanAngle] = useState(0);
  useMotionValueEvent(fanRotate, 'change', (v) => setFanAngle(v));
  const tvScreenOp = useTransform(scrollYProgress, [0.70, 0.77], [0, 0.25]);
  const tvGlowOp = useTransform(scrollYProgress, [0.70, 0.77], [0, 0.5]);

  // 8. Slogan
  const sloganOp = useTransform(scrollYProgress, [0.78, 0.85], [0, 1]);
  const sloganY = useTransform(scrollYProgress, [0.78, 0.84], [20, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <motion.div style={{ opacity: sectionOpacity }} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-black to-black"></div>

        <svg
          className={svgClass}
          viewBox={viewBox}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="roomLineGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0e1a" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.08" />
            </linearGradient>
            {/* Bottom fade — soft transition from scene into page background */}
            <linearGradient id="bottomFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#000000" stopOpacity="0" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#000000" stopOpacity="1" />
            </linearGradient>
            <radialGradient id="tvGlowGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="phonePulseGrad" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
            <filter id="glowSmall" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ===== Perspective room =====
              Back wall: x ∈ [250, 550], y ∈ [160, 370]
              Outer walls extend from back-wall corners to viewBox corners (0,0)(800,0)(0,600)(800,600)
              — no outermost frame, walls fill the screen seamlessly. */}
          {/* Back wall */}
          <motion.path
            d="M 250 160 L 550 160 L 550 370 L 250 370 Z"
            stroke="url(#roomLineGrad)" strokeWidth="1.5" fill="#060a14" fillOpacity="0.4"
            style={{ pathLength: roomDraw }}
          />
          {/* Left wall — extends to viewBox left edge */}
          <motion.path
            d="M 250 160 L 0 0 L 0 600 L 250 370 Z"
            fill="#080d18" fillOpacity="0.2" stroke="none"
            style={{ opacity: roomDraw }}
          />
          {/* Left wall — only the back-edge stroke (no outer frame) */}
          <motion.path
            d="M 0 0 L 250 160 M 250 370 L 0 600"
            stroke="url(#roomLineGrad)" strokeWidth="1.2" fill="none"
            style={{ pathLength: roomDraw }}
          />
          {/* Right wall — extends to viewBox right edge */}
          <motion.path
            d="M 550 160 L 800 0 L 800 600 L 550 370 Z"
            fill="#080d18" fillOpacity="0.2" stroke="none"
            style={{ opacity: roomDraw }}
          />
          {/* Right wall stroke (no outer frame) */}
          <motion.path
            d="M 800 0 L 550 160 M 550 370 L 800 600"
            stroke="url(#roomLineGrad)" strokeWidth="1.2" fill="none"
            style={{ pathLength: roomDraw }}
          />
          {/* Floor — extends to bottom edge */}
          <motion.path
            d="M 250 370 L 0 600 L 800 600 L 550 370 Z"
            fill="url(#floorGrad)" stroke="none"
            style={{ opacity: roomDraw }}
          />
          {/* Floor edges only (no bottom frame) */}
          <motion.path
            d="M 0 600 L 250 370 M 550 370 L 800 600"
            stroke="url(#roomLineGrad)" strokeWidth="1" fill="none"
            style={{ pathLength: roomDraw }}
          />
          {/* Ceiling lines only (no outer frame) */}
          <motion.path
            d="M 0 0 L 250 160 M 550 160 L 800 0"
            stroke="url(#roomLineGrad)" strokeWidth="0.8" fill="none"
            style={{ pathLength: roomDraw }}
          />

          {/* Floor depth lines */}
          <motion.g style={{ opacity: roomDraw }}>
            <line x1="155" y1="425" x2="645" y2="425" stroke="#1e3a8a" strokeWidth="0.5" opacity="0.15" />
            <line x1="205" y1="395" x2="595" y2="395" stroke="#1e3a8a" strokeWidth="0.5" opacity="0.1" />
          </motion.g>

          {/* Bottom fade — blends the floor seamlessly into the page background.
              Starts below the fan base (y=445) so all furniture remains crisp;
              fades smoothly into pure black at the viewBox bottom (y=600). */}
          <rect
            x="0" y="445" width="800" height="155"
            fill="url(#bottomFade)" pointerEvents="none"
          />

          {/* ===== Furniture ===== */}
          <motion.g style={{ opacity: furnitureOp }}>

            {/* ——— AC unit (wall-mounted on back wall, upper-left) ———
                Clean horizontal rectangle, no perspective skew — it's flat on the back wall
                which faces the viewer head-on. */}
            <g>
              {/* Main body */}
              <rect x="270" y="178" width="90" height="26" rx="3"
                fill="#0c1322" stroke="#3b82f6" strokeWidth="1.5" />
              {/* Top accent strip */}
              <rect x="270" y="178" width="90" height="4" rx="1"
                fill="none" stroke="#3b82f6" strokeWidth="0.6" opacity="0.5" />
              {/* Vent louvers (horizontal slats) */}
              <line x1="278" y1="194" x2="352" y2="194" stroke="#22d3ee" strokeWidth="0.6" opacity="0.4" />
              <line x1="278" y1="198" x2="352" y2="198" stroke="#22d3ee" strokeWidth="0.6" opacity="0.35" />
              <line x1="278" y1="202" x2="352" y2="202" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
              {/* LED indicator dot */}
              <circle cx="350" cy="184" r="1.5" fill="#22d3ee" opacity="0.6" />
            </g>

            {/* ——— TV on back wall (center) ——— */}
            <g>
              {/* TV panel */}
              <rect x="380" y="220" width="140" height="85" rx="2" fill="#080c14" stroke="#22d3ee" strokeWidth="1.5" />
              {/* Inner bezel */}
              <rect x="384" y="224" width="132" height="77" rx="1" fill="#0a0e1a" stroke="#1e3a8a" strokeWidth="0.5" />
              {/* Brand dot */}
              <circle cx="450" cy="309" r="1.5" fill="#22d3ee" opacity="0.4" />
            </g>

            {/* ——— Pedestal fan (right side of room, on floor) ———
                Front view of fan: round housing, 2 blades, pole, base. */}
            <g>
              {/* Base — flat ellipse on floor */}
              <ellipse cx="620" cy="438" rx="28" ry="7" fill="#0c1322" stroke="#8b5cf6" strokeWidth="1.2" />
              <ellipse cx="620" cy="436" rx="20" ry="4" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />

              {/* Pole */}
              <rect x="618" y="345" width="4" height="93" fill="#0c1322" stroke="#8b5cf6" strokeWidth="1" />

              {/* Tilt joint */}
              <circle cx="620" cy="345" r="4" fill="#0c1322" stroke="#8b5cf6" strokeWidth="0.8" />

              {/* Fan head — round housing/guard */}
              <circle cx="620" cy="320" r="32" fill="#080c14" stroke="#8b5cf6" strokeWidth="1.5" />
              {/* Guard concentric rings */}
              <circle cx="620" cy="320" r="26" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.4" />
              <circle cx="620" cy="320" r="18" fill="none" stroke="#8b5cf6" strokeWidth="0.5" opacity="0.3" />
              <circle cx="620" cy="320" r="10" fill="none" stroke="#8b5cf6" strokeWidth="0.4" opacity="0.2" />
              {/* Guard radial spokes */}
              <line x1="620" y1="288" x2="620" y2="352" stroke="#8b5cf6" strokeWidth="0.4" opacity="0.25" />
              <line x1="588" y1="320" x2="652" y2="320" stroke="#8b5cf6" strokeWidth="0.4" opacity="0.25" />

              {/* Center hub (in front of blades) */}
              <circle cx="620" cy="320" r="4" fill="#0c1322" stroke="#8b5cf6" strokeWidth="1" />
            </g>

          </motion.g>

          {/* ===== Activation effects ===== */}

          {/* AC airflow — cool air streams flowing down from AC */}
          <motion.g style={{ opacity: airflowOp }}>
            <motion.path d="M 285 205 Q 280 240 285 275" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="8 6" style={{ strokeDashoffset: windOffset }} fill="none" opacity="0.5" />
            <motion.path d="M 315 205 Q 310 245 315 280" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="8 6" style={{ strokeDashoffset: windOffset }} fill="none" opacity="0.45" />
            <motion.path d="M 345 205 Q 340 240 345 275" stroke="#22d3ee" strokeWidth="1.2" strokeDasharray="8 6" style={{ strokeDashoffset: windOffset }} fill="none" opacity="0.4" />
          </motion.g>

          {/* AC pulse */}
          <motion.circle cx="315" cy="191" r="5" fill="#3b82f6" style={{ opacity: acPulseOp }} filter="url(#glowSmall)" />

          {/* Fan blades — pure SVG transform for reliable rotation around fan center.
              translate(620 320) positions the group at the fan hub;
              rotate(fanAngle) spins around (0,0) in this translated system,
              which is exactly (620,320) in viewBox coords. No CSS transform-origin
              quirks involved. */}
          <g transform={`translate(620 320) rotate(${fanAngle})`}>
            {/* Blade 1 — pointing up, symmetric around x=0 */}
            <path
              d="M 0 -5
                 C -3 -10, -6 -17, -7 -23
                 C -5 -26, 5 -26, 7 -23
                 C 6 -17, 3 -10, 0 -5 Z"
              fill="#8b5cf6" fillOpacity="0.4"
              stroke="#8b5cf6" strokeWidth="1.2"
            />
            {/* Blade 2 — 120° */}
            <path
              d="M 0 -5
                 C -3 -10, -6 -17, -7 -23
                 C -5 -26, 5 -26, 7 -23
                 C 6 -17, 3 -10, 0 -5 Z"
              fill="#8b5cf6" fillOpacity="0.4"
              stroke="#8b5cf6" strokeWidth="1.2"
              transform="rotate(120)"
            />
            {/* Blade 3 — 240° */}
            <path
              d="M 0 -5
                 C -3 -10, -6 -17, -7 -23
                 C -5 -26, 5 -26, 7 -23
                 C 6 -17, 3 -10, 0 -5 Z"
              fill="#8b5cf6" fillOpacity="0.4"
              stroke="#8b5cf6" strokeWidth="1.2"
              transform="rotate(240)"
            />
            {/* Center hub on top of blades */}
            <circle cx="0" cy="0" r="3.5" fill="#0c1322" stroke="#8b5cf6" strokeWidth="0.8" />
          </g>

          {/* Fan pulse */}
          <motion.circle cx="620" cy="320" r="6" fill="#8b5cf6" style={{ opacity: fanPulseOp }} filter="url(#glowSmall)" />

          {/* TV screen fill — content appearing */}
          <motion.rect x="384" y="224" width="132" height="77" rx="1" fill="#22d3ee" style={{ fillOpacity: tvScreenOp }} />

          {/* TV glow behind */}
          <motion.ellipse cx="450" cy="262" rx="110" ry="75" fill="url(#tvGlowGrad)" style={{ opacity: tvGlowOp }} />

          {/* TV pulse */}
          <motion.circle cx="450" cy="262" r="6" fill="#22d3ee" style={{ opacity: tvPulseOp }} filter="url(#glowSmall)" />

          {/* ===== Phone (no hand, just floating clean) ===== */}
          <motion.g style={{ y: phoneY, opacity: phoneOp }}>
            {/* Ambient glow behind phone */}
            <ellipse cx="400" cy="530" rx="55" ry="35" fill="url(#phonePulseGrad)" />

            {/* Phone body */}
            <rect x="378" y="488" width="44" height="76" rx="7" fill="#0c1322" stroke="#3b82f6" strokeWidth="2" />
            {/* Inner frame highlight */}
            <rect x="378" y="488" width="44" height="76" rx="7" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.3" />
            {/* Screen */}
            <rect x="382" y="494" width="36" height="64" rx="4" fill="#0a0e1a" />
            {/* Screen edge */}
            <rect x="382" y="494" width="36" height="64" rx="4" fill="none" stroke="#1e3a8a" strokeWidth="0.5" opacity="0.5" />
            {/* Top notch / front camera */}
            <rect x="392" y="496" width="16" height="3" rx="1.5" fill="#0c1322" stroke="#1e3a8a" strokeWidth="0.4" />
            {/* Bottom home indicator */}
            <rect x="392" y="554" width="16" height="2" rx="1" fill="none" stroke="#1e3a8a" strokeWidth="0.5" opacity="0.4" />
            {/* Side buttons (subtle) */}
            <line x1="378" y1="510" x2="378" y2="520" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
            <line x1="378" y1="525" x2="378" y2="540" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />
            <line x1="422" y1="515" x2="422" y2="528" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />

            {/* Qwen logo centered on screen */}
            <g transform="translate(388, 514)">
              <motion.g style={{ opacity: logoOp }}>
                <QwenLogoMini size={24} color="#22d3ee" opacity={1} />
              </motion.g>
            </g>

            {/* Status bar icons */}
            <motion.g style={{ opacity: logoOp }}>
              {/* Signal bars */}
              <rect x="386" y="500" width="1.5" height="2" fill="#22d3ee" opacity="0.5" />
              <rect x="388.5" y="499" width="1.5" height="3" fill="#22d3ee" opacity="0.6" />
              <rect x="391" y="498" width="1.5" height="4" fill="#22d3ee" opacity="0.7" />
              {/* Battery */}
              <rect x="410" y="499" width="6" height="3" rx="0.5" fill="none" stroke="#22d3ee" strokeWidth="0.5" opacity="0.5" />
              <rect x="411" y="500" width="4" height="1" fill="#22d3ee" opacity="0.6" />
            </motion.g>
          </motion.g>

          {/* ===== Connection lines (phone → devices) ===== */}

          {/* Phone → AC (bottom center up to back wall upper-left) */}
          <motion.path
            d="M 395 490 C 360 430 330 320 315 205"
            stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 4"
            style={{ pathLength: acLineLen }}
            fill="none" opacity="0.8"
          />

          {/* Phone → TV (bottom center up to TV) */}
          <motion.path
            d="M 405 490 C 420 420 435 350 450 270"
            stroke="#22d3ee" strokeWidth="1.5" strokeDasharray="6 4"
            style={{ pathLength: tvLineLen }}
            fill="none" opacity="0.8"
          />

          {/* Phone → Fan (bottom center to right side floor area) */}
          <motion.path
            d="M 418 510 C 500 470 580 400 620 335"
            stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 4"
            style={{ pathLength: fanLineLen }}
            fill="none" opacity="0.8"
          />

        </svg>

        {/* Slogan */}
        <motion.div
          style={{ opacity: sloganOp, y: sloganY }}
          className="absolute top-[20%] w-full text-center z-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide">
            万物互联，<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">一键智控</span>
          </h2>
          <p className="mt-3 md:mt-4 text-blue-200/80 text-sm md:text-lg lg:text-xl font-light">
            让每个设备听懂你的指令，智慧生活触手可及
          </p>
        </motion.div>

      </motion.div>
    </section>
  );
}
