"use client";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type ConfettiType = "success" | "celebration" | "fireworks";

type ConfettiOverlayProps = {
  show: boolean;
  type?: ConfettiType;
};

export default function ConfettiOverlay({
  show,
  type = "success",
}: ConfettiOverlayProps) {
  const { width, height } = useWindowSize();

  if (!show) return null;

  /* 🎨 PRESETS */
  const presets = {
    success: {
      numberOfPieces: 250,
      gravity: 0.35,
      colors: ["#16a34a", "#22c55e", "#4ade80", "#bbf7d0"],
      confettiSource: { x: width / 2, y: 0, w: 10, h: 10 },
    },
    celebration: {
      numberOfPieces: 400,
      gravity: 0.25,
      colors: ["#eab308", "#f97316", "#ec4899", "#8b5cf6", "#38bdf8"],
      confettiSource: { x: width / 2, y: height / 3, w: 10, h: 10 },
    },
    fireworks: {
      numberOfPieces: 500,
      gravity: 0.15,
      colors: ["#ef4444", "#f59e0b", "#3b82f6", "#22c55e", "#a855f7"],
      confettiSource: { x: width / 2, y: height / 2, w: 10, h: 10 },
    },
  };

  const preset = presets[type];

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none">
      <Confetti
        width={width}
        height={height}
        recycle={false}
        numberOfPieces={preset.numberOfPieces}
        gravity={preset.gravity}
        colors={preset.colors}
        confettiSource={preset.confettiSource}
      />
    </div>
  );
}
