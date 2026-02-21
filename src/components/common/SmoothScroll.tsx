"use client";

import { useEffect, useRef } from "react";

export default function SmoothScroll() {
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    targetScroll.current = window.scrollY;
    currentScroll.current = window.scrollY;

    const smoothScroll = () => {
      const diff = targetScroll.current - currentScroll.current;

      currentScroll.current += diff * 0.08; // smoothness

      window.scrollTo(0, currentScroll.current);

      animationFrame.current = requestAnimationFrame(smoothScroll);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      targetScroll.current += e.deltaY * 0.8;

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      if (targetScroll.current < 0) targetScroll.current = 0;
      if (targetScroll.current > maxScroll)
        targetScroll.current = maxScroll;
    };

    animationFrame.current = requestAnimationFrame(smoothScroll);

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      if (animationFrame.current)
        cancelAnimationFrame(animationFrame.current);
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return null;
}