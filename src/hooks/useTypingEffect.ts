"use client";
import { useEffect, useState } from "react";

export function useSmoothTyping(
  text: string,
  duration: number = 1200
) {
  const [output, setOutput] = useState("");

  useEffect(() => {
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      const easedProgress = progress * progress; // ease-in
      const chars = Math.floor(easedProgress * text.length);

      setOutput(text.slice(0, chars));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [text, duration]);

  return output;
}
