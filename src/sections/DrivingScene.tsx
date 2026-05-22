import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

// ===== Perspective center dashes =====
// Each dash is a single rect whose y, width, height, opacity are all derived
// from a continuously-cycling t value. As t goes 0 → 1, the dash slides from
// the horizon toward the viewer, growing in size and brightness (true perspective).
// At t=1 it wraps to t=0 (a new dash appears at the horizon).
const HORIZON_Y = 230;
const VIEWER_Y = 600;
const TRACK_LEN = VIEWER_Y - HORIZON_Y; // 370

function PerspectiveDash({
  phase,
  baseOffset,
}: {
  phase: MotionValue<number>;
  baseOffset: number; // 0..1, staggers this dash within the cycle
}) {
  // Each dash's effective t = ((phase + baseOffset) mod 1), kept positive
  const t = useTransform(phase, (p) => {
    const v = (p + baseOffset) % 1;
    return v < 0 ? v + 1 : v;
  });

  // Derive all visual props from t
  const sizeT = useTransform(t, (tv) => Math.pow(tv, 1.7));
  const width = useTransform(sizeT, (s) => 1.5 + s * 9);   // 1.5 → 10.5
  const height = useTransform(sizeT, (s) => 8 + s * 70);   // 8 → 78
  const x = useTransform(width, (w) => 400 - w / 2);
  const y = useTransform(t, (tv) => {
    const centerY = HORIZON_Y + TRACK_LEN * tv;
    const h = 8 + Math.pow(tv, 1.7) * 70;
    return centerY - h / 2;
  });
  const rx = useTransform(width, (w) => w / 2);
  const opacity = useTransform(sizeT, (s) => 0.2 + s * 0.7);

  return (
    <motion.rect
      x={x}
      y={y}
      width={width}
      height={height}
      rx={rx}
      fill="#22d3ee"
      style={{ opacity }}
    />
  );
}

export default function DrivingScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Responsive viewBox: on narrow screens, zoom into the central scene
  // by using a tighter viewBox so the car/road fill the mobile viewport
  // instead of being shrunk by `meet`.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Mobile viewBox: tighter horizontal crop (centered on car/road),
  // scaled up via meet so it fills the mobile screen far better than the
  // original 4:3 viewBox would.
  const viewBox = isMobile ? '230 80 340 520' : '0 0 800 600';
  const svgClass = isMobile
    ? 'absolute w-full h-full'
    : 'absolute w-full h-full max-w-5xl px-4 md:px-0';

  // 1. Scene fade in/out
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.1, 0.85, 1], [0, 1, 1, 0]);
  const roadDraw = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  // 2. Dash phase — cycles multiple times across the scroll for speed feel
  const dashPhase = useTransform(scrollYProgress, [0.1, 0.85], [0, 4]);
  const dashesOpacity = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);

  // 3. Car: rear-view, enters from bottom, cruises, shrinks to horizon
  const carY = useTransform(scrollYProgress, [0.1, 0.25, 0.65, 0.85], [600, 400, 400, 240]);
  const carScale = useTransform(scrollYProgress, [0.1, 0.25, 0.65, 0.85], [2.2, 1, 1, 0.08]);
  const carOpacity = useTransform(scrollYProgress, [0.1, 0.15, 0.8, 0.85], [0, 1, 1, 0]);

  // 4. Slogan
  const sloganOpacity = useTransform(scrollYProgress, [0.2, 0.3, 0.7, 0.8], [0, 1, 1, 0]);
  const sloganY = useTransform(scrollYProgress, [0.2, 0.3], [20, 0]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-black">
      <motion.div style={{ opacity: sceneOpacity }} className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

        {/* Background — simple vignette only, no horizon glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/15 via-black to-black"></div>

        <svg
          className={svgClass}
          viewBox={viewBox}
          preserveAspectRatio={isMobile ? 'xMidYMax meet' : 'xMidYMid meet'}
        >
          <defs>
            <linearGradient id="roadGrad" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="60%" stopColor="#1e40af" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="roadSurface" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a0e1a" stopOpacity="0" />
              <stop offset="40%" stopColor="#0a0e1a" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="0.55" />
            </linearGradient>
            <clipPath id="roadClip">
              <path d="M 380 230 L 50 600 L 750 600 L 420 230 Z" />
            </clipPath>
          </defs>

          {/* Horizon line — single subtle line, no glow */}
          <line x1="0" y1="230" x2="800" y2="230" stroke="#1e3a8a" strokeWidth="1" opacity="0.4" />

          {/* Road surface (perspective trapezoid) */}
          <motion.path
            d="M 380 230 L 50 600 L 750 600 L 420 230 Z"
            fill="url(#roadSurface)"
            style={{ opacity: roadDraw }}
          />

          {/* Road edges */}
          <motion.path
            d="M 50 600 L 380 230"
            stroke="url(#roadGrad)" strokeWidth="3" strokeLinecap="round" fill="none"
            style={{ pathLength: roadDraw }}
          />
          <motion.path
            d="M 750 600 L 420 230"
            stroke="url(#roadGrad)" strokeWidth="3" strokeLinecap="round" fill="none"
            style={{ pathLength: roadDraw }}
          />

          {/* Perspective center dashes — clipped to road shape.
              Spacing follows true perspective: dashes near the horizon (low t)
              are packed densely together, dashes near the viewer (high t) are
              spread far apart. The offsets below are non-linear — clustered at
              small values, sparse at large values. */}
          <motion.g clipPath="url(#roadClip)" style={{ opacity: dashesOpacity }}>
            <PerspectiveDash phase={dashPhase} baseOffset={0.00} />
            <PerspectiveDash phase={dashPhase} baseOffset={0.03} />
            <PerspectiveDash phase={dashPhase} baseOffset={0.07} />
            <PerspectiveDash phase={dashPhase} baseOffset={0.13} />
            <PerspectiveDash phase={dashPhase} baseOffset={0.22} />
            <PerspectiveDash phase={dashPhase} baseOffset={0.36} />
            <PerspectiveDash phase={dashPhase} baseOffset={0.56} />
            <PerspectiveDash phase={dashPhase} baseOffset={0.82} />
          </motion.g>

          {/* ===== Car — External SVG asset =====
              Loaded from /car_rear_view.svg (in public/).
              motion.g handles the animation (translate, scale, opacity);
              the image is positioned so its horizontal center is at viewBox x=400
              and its bottom rests at local y=70 (the original car baseline).
              Tweak x / y / width / height below if the asset's intrinsic
              aspect ratio puts the car off-center. */}
          <motion.g style={{ y: carY, scale: carScale, opacity: carOpacity }} transformOrigin="400 400">

            {/* External car SVG.
                Box: 220 wide × 140 tall, centered at x=400, bottom-aligned at y=72.
                preserveAspectRatio keeps the file's natural ratio inside the box. */}
            <image
              href={`${ASSET_BASE}car_rear_view.svg`}
              x="290"
              y="-68"
              width="220"
              height="140"
              preserveAspectRatio="xMidYMax meet"
            />
          </motion.g>
        </svg>

        {/* Slogan */}
        <motion.div
          style={{ opacity: sloganOpacity, y: sloganY }}
          className="absolute top-[20%] w-full text-center z-10"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-2xl">
            驱动未来，<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">智驾无界</span>
          </h2>
          <p className="mt-3 md:mt-4 text-blue-200/80 text-sm md:text-lg lg:text-xl font-light">全天候智能感知，让每一次出行都如履平地</p>
        </motion.div>

      </motion.div>
    </section>
  );
}
