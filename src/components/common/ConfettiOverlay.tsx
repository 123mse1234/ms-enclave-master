"use client";

import Confetti from "react-confetti";
import { useWindowSize } from "react-use";

type ConfettiOverlayProps = {
  show: boolean;
  duration?: number; // optional auto-hide duration
};

export default function ConfettiOverlay({
  show,
  duration = 4000,
}: ConfettiOverlayProps) {
  const { width, height } = useWindowSize();

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-9999 pointer-events-none">
      <Confetti
        width={width}
        height={height}
        numberOfPieces={350}
        recycle={false}
        gravity={0.25}
      />
    </div>
  );
}
