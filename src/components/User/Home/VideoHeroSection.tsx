"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";
import Link from "next/link";

export default function VideoHeroSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(true);

  // ▶️ Play / Pause based on visibility
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      {
        threshold: 0.5, // 50% visible
      }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // 🔊 Toggle Sound
  const toggleSound = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* 🖼️ Fallback Image (before video loads) */}
      {!videoLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/common/ms-enclave-54.webp')",
          }}
        />
      )}

      {/* 🎥 Background Video */}
      <video
        ref={videoRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          videoLoaded ? "opacity-100" : "opacity-0"
        }`}
        muted
        loop
        playsInline
        preload="metadata"
        onCanPlay={() => setVideoLoaded(true)}
      >
        <source src="/video/ms-enclave-heritage-resort-palakkad.mp4" type="video/mp4" />
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* ✨ Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4 mt-20">
        <h2 className="text-white text-4xl md:text-6xl font-bold tracking-wide text-shadow-sm">
          Step Into Kerala ’ s  Heritage Paradise
        </h2>

        <p className="mt-4 text-md text-white font-medium text-shadow-sm max-w-5xl font-dm ">
          Watch our short video to immerse yourself in the serene beauty of M.S. Enclave Heritage Resort.
From lush green landscapes and traditional Kerala architecture to modern comforts and leisure amenities, our resort offers the perfect escape for families, couples, and nature lovers.
        </p>

        <div className="flex flex-col mb-8 md:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4 mt-4">
        
        <Link
          href="/packages"
          className="inline-flex justify-center items-center py-3 px-6 text-base font-semibold text-black rounded-lg  bg-white/60 backdrop-blur-sm hover:bg-white  shadow-gray-400/40 transition"
        >
          Book Your Stay Now
          <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </Link>

        
        {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white">
        <ChevronDown size={30} />
      </div>

      </div>
        
      </div>

      {/* 🔊 Sound Toggle */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-6 z-20 bg-black/60 p-3 rounded-full text-white hover:bg-black/80 transition"
        aria-label="Toggle Sound"
      >
        {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
      </button>

      {/* ⬇ Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white">
        <ChevronDown size={30} />
      </div>
    </section>
  );
}
