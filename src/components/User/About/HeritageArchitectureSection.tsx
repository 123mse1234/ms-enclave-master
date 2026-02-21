"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useInView,
  animate,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

type CounterProps = {
  value: number;
  label: string;
  suffix?: string;
};

const counters: CounterProps[] = [
  { value: 25, label: "Years of Heritage Design" },
  { value: 40, label: "Traditional Wooden Works" },
  { value: 12, label: "Open Courtyard Spaces" },
  { value: 100, label: "Modern Comfort Amenities", suffix: "+" },
];

function AnimatedCounter({ value, label, suffix }: CounterProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  // Sync MotionValue → React state
  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplayValue(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      animate(motionValue, value, {
        duration: 1.6,
        ease: "easeOut",
      });
    }
  }, [isInView, value, motionValue]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-4xl md:text-5xl font-dm  font-bold block drop-shadow-[1px_1px_1px_rgba(0,0,0)]">
        {displayValue}
        {suffix || ""}
      </span>

      <span className="text-sm md:text-base text-white text-shadow-sm font-dm capitalize mt-2 block drop-shadow-[1px_1px_1px_rgba(0,0,0)]">
        {label}
      </span>
    </div>
  );
}

export default function HeritageArchitectureSection() {
  return (
    <section className=" w-full h-[650px]">
      <div className="w-full h-full flex relative items-center">
        {/* BACKGROUND IMAGE */}
      <Image
        src="/images/common/ms-enclave-34.webp"
        alt="Kerala Heritage Architecture"
        fill
        priority
        className="object-cover "
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-20 text-white ">
        {/* TEXT */}
        <div className=" text-center">
          <h2 className="text-5xl font-bold   mb-4 font-dm drop-shadow-[3px_3px_3px_rgba(0,0,0)]">
            Experience Kerala’s Architectural Splendor
          </h2>

          <h3 className="text-2xl text-white font-bold mb-6 font-dm text-shadow-sm drop-shadow-[1px_1px_1px_rgba(0,0,0)]">
            Timeless Design with Modern Comforts
          </h3>

          <p className=" leading-relaxed text-lg font-dm text-white  text-shadow-md drop-shadow-[1px_1px_1px_rgba(0,0,0)]">
            Inspired by the timeless architecture of Kerala, our resort is designed in the traditional Naalukettu style — a four-winged structure embracing a serene central courtyard (Nadumuttam). This design invites natural light, gentle breezes, and the calming rhythm of nature into every space. Rooted in Kerala’s heritage and Vastu wisdom, the Naalukettu reflects a way of life that values balance, community, and tranquility, offering guests an authentic and soulful retreat.
          </p>
        </div>
      </div>
      </div>
    </section>
  );
}
