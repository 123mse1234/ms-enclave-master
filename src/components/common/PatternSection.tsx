"use client";

import { ReactNode } from "react";

interface PatternSectionProps {
  children?: ReactNode;
  className?: string;
  opacity?: number; // optional control
}

export default function PatternSection({
  children,
  className = "",
  opacity = 0.90,
}: PatternSectionProps) {
  return (
    <section className="h-30 w-full flex align-middle theme-bg">
        <div className={`relative w-full mt-5 ${className}`}>
      
      {/* Pattern Background */}
      <div
        className="absolute inset-0 pattern-theme"
        style={{ opacity }}
      ></div>
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
    </section>
  );
}