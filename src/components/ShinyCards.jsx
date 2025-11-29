import { Figma, FigmaIcon, LucideFigma } from "lucide-react";
import React, { useRef, useState } from "react";

// The new component signature includes separate props for the two color types
const GlowingCard = ({
  children,
  fromColor,
  spotlightToColor,
  rainbowColors, // Takes a comma-separated string of colors
  showRainbowBorder = false,
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  const handleFocus = handleMouseEnter; 
  const handleBlur = handleMouseLeave; 

  const gradientString = rainbowColors
    ? `linear-gradient(to right, ${rainbowColors})`
    : "linear-gradient(to right, #ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7)";

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex h-48 w-64 items-center justify-center overflow-hidden rounded-xl bg-neutral-900/50 backdrop-blur-md"
    >
      {showRainbowBorder && (
        <div
          className="absolute -inset-[1.5px] rounded-xl transition duration-300"
          style={{
            opacity: opacity * 0.7,
            filter: "blur(1.5px)",
          }}
        />
      )}

      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${fromColor}, transparent 40%)`,
        }}
      />

      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300"
        style={{
          opacity,
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, ${spotlightToColor}, transparent 40%)`,
        }}
      />

      {!showRainbowBorder && (
        <div className="absolute inset-0 rounded-xl border border-neutral-800 pointer-events-none" />
      )}

      <div
        style={{
          backgroundImage: `linear-gradient(#141212ff 1px, transparent 1px), linear-gradient(to right, #141212ff 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        className="relative flex flex-col items-center justify-center w-62 h-46 bg-neutral-950 rounded-xl gap-4 z-10"
      >
        {children}
      </div>
    </div>
  );
};

export default function ShinyCards() {
  return (
    <div className="flex min-h-screen items-center justify-center gap-8 bg-neutral-950 p-8 text-white selection:bg-neutral-800">
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#333 1px, transparent 1px), linear-gradient(to right, #333 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <GlowingCard spotlightToColor="#ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg">
          <img src="figma.svg" />
        </div>
        <span className="font-semibold tracking-wide text-neutral-200">
          Figma
        </span>
      </GlowingCard>

      <GlowingCard
        fromColor="rgba(255,255,255,0.2)"
        spotlightToColor="#ef4444, #f97316, #eab308, #22c55e, #3b82f6, #a855f7" // New prop for border colors
        showRainbowBorder={true}
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg">
          <img src="photos.svg" />
        </div>
        <span className="font-semibold tracking-wide text-neutral-200">
          Photos
        </span>
      </GlowingCard>
    </div>
  );
}
