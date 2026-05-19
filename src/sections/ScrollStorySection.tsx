import DrivingScene from './DrivingScene';
import DesktopAgent from './DesktopAgent';
import IoTScene from './IoTScene';

export default function ScrollStorySection() {
  return (
    <div id="scroll-story" className="text-white scroll-story">
      {/* 渐变过渡：从 ai-dark 到纯黑 */}
      <div className="h-[120px] bg-gradient-to-b from-[#0a0e1a] to-black flex items-center justify-center">
        <p className="text-white/40 tracking-widest text-sm font-light">还有更多...</p>
      </div>

      {/* 场景 1：自动驾驶 */}
      <DrivingScene />

      {/* 场景 2：桌面 Agent */}
      <DesktopAgent />

      {/* 场景 3：智能家居 IoT */}
      <IoTScene />
    </div>
  );
}